const DigitalToken = artifacts.require("DigitalToken");

module.exports = async function(deployer, network, accounts) {
  // Implante o contrato do token
  await deployer.deploy(DigitalToken, web3.utils.toWei('1000000', 'ether'));
  const tokenInstance = await DigitalToken.deployed();

  // Distribua tokens para todas as contas disponíveis
  const distributionAmount = web3.utils.toWei('1000', 'ether'); // Quantidade de tokens a distribuir para cada conta

  for (let i = 0; i < accounts.length; i++) {
    await tokenInstance.transfer(accounts[i], distributionAmount);
    console.log(`Distributed ${web3.utils.fromWei(distributionAmount, 'ether')} tokens to ${accounts[i]}`);
  }
};