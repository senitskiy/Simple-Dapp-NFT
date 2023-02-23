// Setup
import { Network, Alchemy, AlchemySubscription } from 'alchemy-sdk';

const settings = {
    apiKey: "DBhSRBStyzEPAYEqwPKQLx82yIyLBvyV",
    network: Network.MATIC_MUMBAI,
};

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



const mintTopic = "0xd71929591be5b95a2dcea8fe346eeb05412ea92edaced0b37130c7840604892a";
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
    fromAddress: currentContract, ///"0xshah.eth" 
    toAddress: '0x265f176620fcd0acbe38f4cc75b30007ab0a10c9'
}



const walletEvent = {
    address: currentContract,
    topics: ["0x58963b5c43e2f709b85224ec70dc1c4f25a194ebcbacbc4affe358b19ee0b259"],
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



    alchemy.ws.on(alchemy_pendingTransactions,
        // {
        //     method: AlchemySubscription.MINED_TRANSACTIONS,
        // },
        (tx) => {
            nftsContract.nfts
            // let add0 = String(tx["transaction"]["from"])
            let nfts_ = nftsContract.nfts
            // if( add0 == "WALLET"){
                // console.log(tx)
                console.log(nfts_[nfts_.length-1])
                console.log({nfts_}) 
            // }
        }
    )//.then((tx) => console.log(tx))
    
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