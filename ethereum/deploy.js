const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  'chapter mind switch display boring certain slice athlete tube door debate swap',
  // remember to change this to your own phrase!
  'https://goerli.infura.io/v3/60fa3584d0114b41acba17daa4a37b68'
  // remember to change this to your own endpoint!
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy(); 

// Contract deployed to 
// 0x881814644faC6511296f002Ed6637cfc2Ec92641  

 