import { useEffect, useState } from 'react';
import React  from 'react';
import './App.css';
import ERC721 from './NFToken.json';
import { ethers, ContractFactory } from 'ethers'; //
import InputName from './input/inputName'
import InputSymbol from './input/inputSymbol'
import InputAddressTo from './input/inputAddressTo'
import InputTokenId from './input/inputTokenId'
import InputTokenURI from './input/inputTokenURI'
// import Home from "./components/Home/Home";
// import contractAbi from './abi/abi'
// import contractByteCode from './abi/bytecode'
// address to, uint256 tokenId, string memory tokenURI
// import { utils } from "ethers/lib/utils";

// import fs from 'fs'

let contractAddress
// let currentAccount
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
      // currentAccount = accounts[0]
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
    // console.log(bytecode)
    // console.log(bytecode1)
    // console.log(contractAbi)
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    // const fd = {contractByteCode}
    // console.log(fd)
    // console.log(JSON.parse(contractByteCode))
    const factory = new ContractFactory(abi, bytecode, signer);
     
    const inputName = document.getElementById("inputName").value
    const inputSymbol = document.getElementById("inputSymbol").value
    // console.log(inputName)
    // console.log(inputSymbol)
    // console.log(currentAccount)
    //  // If your contract requires constructor args, you can specify them here
    const contract = await factory.deploy(inputName, inputSymbol);
     
    //  console.log("InputTokenURI:"+InputTokenURI.prototype.props.value);
    //  console.log(contract.address);
    //  console.log(contract.deployTransaction);
     console.log("NFT collection address:" + contract.deployTransaction.creates)

     contractAddress = contract.deployTransaction.creates

     checkEventCollectionCreated()
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

        const inputAddressTo = document.getElementById("inputAddressTo").value
        const inputTokenId = parseInt(document.getElementById("inputTokenId").value);
        const inputTokenURI = document.getElementById("inputTokenURI").value
        // let nftTxn1 = await nftContract.signer.call.mint("0x265F176620fCD0AcBE38f4cC75B30007AB0A10c9","1","https://www.shutterstock.com/image-vector/cute-dog-space-vector-illustration-600w-547688842.jpg", { value: ethers.utils.parseEther("0.01") } );
        // let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });
        let nftTxn = await nftContract.mint(inputAddressTo,inputTokenId,inputTokenURI);
        // address to, uint256 tokenId, string memory tokenURI)
        console.log("Minting... please wait");
        // await nftTxn.wait();
        // console.log({nftTxn})
        // console.log(`Minted, see transaction: https://testnet.bscscan.com/tx/${nftTxn.hash}`);
        console.log(`Minted, see transaction: ${nftTxn.hash}`);

        // const resEventMint = 
        await checkEventMint()
        // console.log(resEventMint)

        let currentTokenId = parseInt(document.getElementById("inputTokenId").value)
        document.getElementById("inputTokenId").value = ++currentTokenId

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const checkEventCollectionCreated = () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);    

        nftContract.on("CollectionCreated", (collection, name, symbol) => {
          console.log("Collection created!")
          console.log("collection: " + collection)
          console.log("name: " + name)
          console.log("symbol: " + symbol)
          console.log({collection: collection, name: name, symbol: symbol})
        });        
      }
    } catch (err) {
      console.log(err);
    }      
  }

  const checkEventMint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);   
        // let id =1 
        // console.log(id++)
        // let collection, recipient, tokenId, tokenURI

        const handler = (_collection, _recipient, _tokenId, _tokenURI, event) => {
          console.log("collection: " + _collection)
          console.log("recipient: " + _recipient)
          console.log("tokenId: " + parseInt(_tokenId))
          console.log("tokenURI: " + _tokenURI)
          // console.log({event})

          nftContract.removeListener("TokenMinted", handler)
          // collection = _collection
          // recipient = _recipient
          // tokenId = parseInt(_tokenId)
          // tokenURI = _tokenURI
        }

        nftContract.on("TokenMinted", handler)
        //   (_collection, _recipient, _tokenId, _tokenURI) => {
        //     // console.log("collection: " + _collection)
        //     // console.log("recipient: " + _recipient)
        //     // console.log("tokenId: " + parseInt(_tokenId))
        //     // console.log("tokenURI: " + _tokenURI)
        //     nftContract.removeListener("TokenMinted")
        //   }
        // );    

        return () => {
          // nftContract.removeListener("TokenMinted", handler)
          // console.log("collection1: " + collection)
          // console.log("recipient1: " + recipient)
          // console.log("tokenId1: " + parseInt(tokenId))
          // console.log("tokenURI1: " + tokenURI)
          // nftContract.removeListener("TokenMinted", handler)
        }                   
        // if (resEvent) {
        //   console.log("collection: " + collection)
        //   console.log("recipient: " + recipient)
        //   console.log("tokenId: " + parseInt(tokenId))
        //   console.log("tokenURI: " + tokenURI)
        // }
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

  // const imageDeploy = () => {
  //   return (
  //     <div>
  //       <img src="https://www.shutterstock.com/image-vector/cute-dog-space-vector-illustration-600w-547688842.jpg">
  //       </img>     
  //     </div>
  //   )
  // }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div>
      <header className="main-header">
        <h1>React &amp; Web3</h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">{currentAccount}</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>    
        <div className='main-app'>
          <h1>Simple Dapp NFT</h1>      
          <div >
            <div>Name:</div> 
            <div> 
              <InputName
              />
            </div>
          </div>
          <div >
            <div>Symbol:</div> 
            <div> 
              <InputSymbol
              />
            </div>
          </div>        
          <div>
            {currentAccount ? deployButton() : connectWalletButton()}
          </div>     
          <br></br>
          <br></br>
          <div >
            <div>AddressTo:</div> 
            <div> 
              <InputAddressTo
              />
            </div>
          </div>
          <div>
            <div>TokenId:</div> 
            <div> 
              <InputTokenId
              />
            </div>
          </div>      
          <div >
            <div>TokenURI:</div> 
            <div> 
              <InputTokenURI
              />
            </div>
          </div>  
          {/* <div><imageDeploy/></div> */}

          <div>
            {currentAccount ? mintNftButton() : connectWalletButton()}
          </div>    
        </div>
      </main> 
    </div>  
  )
}

export default App;

// cnrprod-team-27488


// https://git.codenrock.com/vk-nft-definition/nft-content.git