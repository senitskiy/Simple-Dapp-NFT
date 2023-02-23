// Installation: https://github.com/alchemyplatform/alchemy-web3
 createAlchemyWeb3 from "@alch/alchemy-web3"

const settings = {
    apiKey: "DBhSRBStyzEPAYEqwPKQLx82yIyLBvyV",
    network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

// Initialize alchemy-web3 object.
const web3 = createAlchemyWeb3(`wss://eth-mainnet.g.alchemy.com/v2/demo`);

// Subcribes to the event and prints results 
web3.eth.subscribe("newPendingTransactions").on("data", (data) => console.log(data));
