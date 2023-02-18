import { useEffect, useState } from 'react';
import React  from 'react';
import './App.css';
import ERC721 from './ERC721.json';
import { ethers, ContractFactory } from 'ethers'; //
import InputName from './input/inputName'
import InputSymbol from './input/inputSymbol'
import InputAddressTo from './input/inputAddressTo'
import InputTokenId from './input/inputTokenId'
import InputTokenURI from './input/inputTokenURI'
// import contractAbi from './abi/abi'
// import contractByteCode from './abi/bytecode'
// address to, uint256 tokenId, string memory tokenURI
// import { utils } from "ethers/lib/utils";

// import fs from 'fs'

let contractAddress
const bytecode = ERC721.data.bytecode.object
const abi = ERC721.abi



function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }


  const deployContractHandler = async () => {           
     // //@ts-ignore
    //  const MNFT = new account.web3.eth.Contract(abi.output.abi, account.address, {
        //  from: account.address,
    //      gas: 3000000,
    //  });
    // ContractFactory
    //  const Contract = new ethers.Contract()

    //  import { ContractFactory } from 'ethers';
    // const bytecode1 = await fs.readFile('./abi/bytecode').toString();
    const { ethereum } = window;
    console.log(bytecode)
    // console.log(bytecode1)
    // console.log(contractAbi)
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    // const fd = {contractByteCode}
    // console.log(fd)
    // console.log(JSON.parse(contractByteCode))
     const factory = new ContractFactory(abi, bytecode, signer);
     
    //  // If your contract requires constructor args, you can specify them here
     const contract = await factory.deploy("Naame", "Symmbol");
     
    //  console.log("InputTokenURI:"+InputTokenURI.prototype.props.value);
     console.log(contract.address);
     console.log(contract.deployTransaction);
     console.log(contract.deployTransaction.creates)

     contractAddress = contract.deployTransaction.creates
     // MNFT.deploy({
     //     data: bs.data.bytecode.object
     // }).send({
     //     // from: account.address!,
     //     // gas: 3000000,
     // }, (err: any, hash) => {
     //     // console.log(hash);
     // }).on("receipt", async (receiptMint) => {
     //     resolve({
     //         MNFT, 
     //         address: receiptMint.contractAddress
     //     });
     // }).on("error", (err: any) => {
     //     onClose()
     // });
}






// async function deployMNFT(cid: string): {
//     return new Promise((resolve, reject) => {
//         if (!account) reject();
//         if (!account.web3) reject();
        


        
//         //@ts-ignore
//         const MNFT = new account.web3.eth.Contract(abi.output.abi, account.address, {
//             from: account.address,
//             gas: 3000000,
//         });

//         MNFT.deploy({
//             data: bs.data.bytecode.object
//         }).send({
//             from: account.address!,
//             gas: 3000000,
//         }, (err: any, hash) => {
//             // console.log(hash);
//         }).on("receipt", async (receiptMint) => {
//             resolve({
//                 MNFT, 
//                 address: receiptMint.contractAddress
//             });
//         }).on("error", (err: any) => {
//             onClose()
//         });
//     });
// }
  


  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
        const fd = nftContract.functions
        console.log(fd);
        console.log("Initialize payment");
        console.log({nftContract})
        let nftTxn1 = await nftContract.name()
        console.log({nftTxn1})
        // let nftTxn1 = await nftContract.signer.call.mint("0x265F176620fCD0AcBE38f4cC75B30007AB0A10c9","1","https://www.shutterstock.com/image-vector/cute-dog-space-vector-illustration-600w-547688842.jpg", { value: ethers.utils.parseEther("0.01") } );
        // let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });
        let nftTxn = await nftContract.mint("0x265F176620fCD0AcBE38f4cC75B30007AB0A10c9","1","https://www.shutterstock.com/image-vector/cute-dog-space-vector-illustration-600w-547688842.jpg", { value: ethers.utils.parseEther("0.01") } );
        // address to, uint256 tokenId, string memory tokenURI)
        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const deployButton = () => {
    return (
      <button onClick={deployContractHandler} className='cta-button deploy-button'>
        Deploy
      </button>
    )
  }  

  const mintNftButton = () => {
    return (
      <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Mint NFT
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>Simple Dapp NFT</h1>
      
      {/* <p><b>Ваше имя:</b><br>
   <input type="text" size="40">
  </p> */}
    <dd >
      <dt>Name:</dt> 
      <div> 
        <InputName
        />
      </div>
    </dd>
    <dd >
      <dt>Symbol:</dt> 
      <div> 
        <InputSymbol
        />
      </div>
    </dd>
    
    
      <div>
        {currentAccount ? deployButton() : connectWalletButton()}
      </div>     

    <br></br>
    <br></br>
    <br></br>
    <dd >
      <dt>AddressTo:</dt> 
      <div> 
        <InputAddressTo
        />
      </div>
    </dd>
    <dd >
      <dt>TokenId:</dt> 
      <div> 
        <InputTokenId
        />
      </div>
    </dd>      
    <dd >
      <dt>TokenURI:</dt> 
      <div> 
        <InputTokenURI
        />
      </div>
    </dd>  

    

      <div>
        {currentAccount ? mintNftButton() : connectWalletButton()}
      </div>
    
    </div>
  )
}

export default App;

// cnrprod-team-27488


// https://git.codenrock.com/vk-nft-definition/nft-content.git