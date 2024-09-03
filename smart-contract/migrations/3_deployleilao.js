const LeilaoAsCegas = artifacts.require("LeilaoAsCegas");
const DigitalToken = artifacts.require("DigitalToken");

module.exports = async function (deployer, network, accounts) {
  // Endereço do contrato do token que será usado no leilão
  const tokenAddress = DigitalToken.address;

  // Parâmetros para o contrato LeilaoAsCegas
  const duracaoLances = 3600; // 1 hora em segundos
  const duracaoRevelacao = 1800; // 30 minutos em segundos

  // Deploy do contrato LeilaoAsCegas
  await deployer.deploy(LeilaoAsCegas, duracaoLances, duracaoRevelacao, tokenAddress);

  const leilaoInstance = await LeilaoAsCegas.deployed();
  console.log("Leilão às Cegas implantado em:", leilaoInstance.address);
  console.log("Leilão de token:", DigitalToken.address);
};
