// Setup
import { Network, Alchemy, AlchemySubscription } from 'alchemy-sdk';
import { createAlchemyWeb3 } from "@alch/alchemy-web3" 
const settings = {
    apiKey: "DBhSRBStyzEPAYEqwPKQLx82yIyLBvyV",
    network: Network.MATIC_MUMBAI,
};
// Nft
const alchemy = new Alchemy(settings);

// Get the latest block
// const latestBlock = alchemy.core.getBlockNumber();

// Get all outbound transfers for a provided address
// alchemy.core
//     .getTokenBalances('0x265f176620fcd0acbe38f4cc75b30007ab0a10c9')
//     .then(console.log);

// Get all the NFTs owned by an address
// const nfts = await alchemy.nft.getNftsForOwner("0x265f176620fcd0acbe38f4cc75b30007ab0a10c9");

const currentContract = "0x2ae3312CbB254a4f41fD721c22B8F3A6B55E7cC0" 

const nftsContract = await alchemy.nft.getNftsForContract(currentContract)
let nfts = nftsContract.nfts[0]
if (nftsContract.nfts.length > 1) {
    nfts = nftsContract.nfts[nftsContract.nfts.length -1]
}
// console.log({nfts})
// const filter = {
//     address: pool,
//     topics: [utils.id("Sell(address,uint256[],uint256)")],
//   };



const mintTopic = "0x38c1926032652dabd98737c2f41cae1efac3993d6119ffde7000a3fe1e17ee50";
// This is the "from address" we want to watch.
const zeroTopic =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
// This is the NFT contract we want to watch.
// const nftContractAddress = "0x029Dfd5B016ed918416CD1fAF53d79A013b3065c";

// Create the log options object.
const mintEvents = {
  address: currentContract,
  topics: [mintTopic, zeroTopic],
};

const filterEvents = {
    method: AlchemySubscription.MINED_TRANSACTIONS, 
    fromAddress: '0x265f176620fcd0acbe38f4cc75b30007ab0a10c9', ///"0xshah.eth" 
    toAddress: currentContract
}



const walletEvent = {
    address: currentContract,
   // topics: ["0x38c1926032652dabd98737c2f41cae1efac3993d6119ffde7000a3fe1e17ee50"],
};


const _alchemy_newPendingTransactions =
    { method: AlchemySubscription.PENDING_TRANSACTIONS}


const alchemy_pendingTransactions =
    { method: "alchemy_pendingTransactions",
    fromAddress: '0x265f176620fcd0acbe38f4cc75b30007ab0a10c9' }//'0x265f176620fcd0acbe38f4cc75b30007ab0a10c9' }

const alchemy_newPendingTransactions =
    { method: "newPendingTransactions",
    fromAddress: '0x265f176620fcd0acbe38f4cc75b30007ab0a10c9' }    
    // "newPendingTransactions"    

// Installation: https://github.com/alchemyplatform/alchemy-web3


alchemy.ws.on(
    // {
    //   method: AlchemySubscription.PENDING_TRANSACTIONS,
    //   fromAddress: "0x265f176620fcd0acbe38f4cc75b30007ab0a10c9" , // Replace with address to recieve pending transactions from this address
    //   toAddress: currentContract, // Replace with address to send  pending transactions to this address
    // }
    walletEvent,
    (tx) => {
        console.log(tx)
        const df = nftsContract.nfts
        console.log({df})
    }    
  );

// // Initialize alchemy-web3 object.
// const web3 = createAlchemyWeb3(`wss://polygon-mumbai.g.alchemy.com/v2/DBhSRBStyzEPAYEqwPKQLx82yIyLBvyV`);

// // Subcribes to the event and prints results 
// web3.eth.subscribe("newPendingTransactions").on("data", (data) => console.log(data));


        // alchemy.ws.on(alchemy_pendingTransactions,
        //     // {
        //     //     method: AlchemySubscription.MINED_TRANSACTIONS,
        //     // },
        //     (tx) => {
        //         // let add0 = String(tx["transaction"]["from"])
        //         let nfts_ = nftsContract.nfts
        //         // if( add0 == "WALLET"){
        //             // console.log(tx)
        //             console.log(nfts_[nfts_.length-1])
        //             // console.log({nfts}) 
        //         // }
        //     }
        // )//.then((tx) => console.log(tx))
      
   
      






    
// Listen to all new pending transactions
// alchemy.ws.on( alchemy_pendingTransactions,
//     // { method:  "alchemy_pendingTransactions"},
//     // {method: AlchemySubscription.MINED_TRANSACTIONS, 
//     // fromAddress: "0xshah.eth" }, // currentContract },
//     // toAddress: "0x265f176620fcd0acbe38f4cc75b30007ab0a10c9" }, //fromAddress
//     (txn) => {
//     //   if (res.transaction.blockHash = "0xd71929591be5b95a2dcea8fe346eeb05412ea92edaced0b37130c7840604892a") {
//         console.log(txn)
//         // console.log({nfts}) //nfts.totalCount
//         // console.log({nftsContract})
//         if (nfts) {
//             console.log("addressNFTContract: " + nfts.contract.address)
//             console.log("contractDeployer: " + nfts.contract.contractDeployer)
//             console.log("name: " + nfts.contract.name)
//             console.log("symbol: " + nfts.contract.symbol)
//             console.log("tokenId: " + nfts.tokenId)
//             console.log("tokenType: " + nfts.tokenType)
//             if (nfts.tokenUri.raw)
//                 console.log("tokenUri: " + nfts.tokenUri.raw)  

//             const df = nftsContract.nfts    
//             console.log({df}) 
//         }  
//     //   } 
//         // nftsContract.nfts[nftsContract.nfts.length -1]
//     }
// );