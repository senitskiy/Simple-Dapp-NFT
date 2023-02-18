// import Web3 from 'web3';

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

// async function mintMNFT(contract: ContactMNFT) {
//     const res = await account.web3!.eth.sendTransaction({
//         to: contract.address,
//         from: account.address!,
//         data: contract.MNFT.methods.mint().encodeABI(),
//         gas: 3000000,
//     });
// }