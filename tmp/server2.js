import http from "http"
// import cron from 'node-cron'
// import { randomBytes } from "crypto"

import Web3 from 'web3'
// import contractAbi  from './NFToken.json' //{assert { type: "json" }}

import { readFile } from 'node:fs';
let contractAbi
readFile('./NFToken.json', (err, source) => {
  if (err) {
    console.error(err);
  } else {
     contractAbi = source
    console.log(source);


const web3 = new Web3("https://mumbai.polygonscan.com/");
//console.log("Hello This",web3);
//console.log("hello");

// const { default: contractAbi } =
//   await import('./contracts/artifacts/NFToken.json', { assert: { type: 'json' } });

const dexABI = contractAbi.abi;
const contract_address = "0x24327095Dd831d9E1cB18f2bD72557F213565815";
const contract = new web3.eth.Contract(dexABI, contract_address);

async function generateEventQuery(result) {
  console.log(result);
  return ;
}


http
  .createServer((req, res) => {
     web3.eth
      .getBlockNumber()
      .then((d) => {
        let current_block = d;
        console.log(current_block);
       contract
      .getPastEvents({
        fromBlock: Number(23390147),
        toBlock: Number(23390147)+100,
      })
      .then( async(events) => {
      let resu = await generateEventQuery(events);
     
      })
      .catch((e) => {
          console.log("Err",e)
        res.write("Err:" + JSON.stringify(e));
        res.end();
      });
      })
      .catch((e) => e);
    })
  
  
  .listen(8080);

}
});