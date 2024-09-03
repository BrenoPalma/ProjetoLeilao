const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');

// Configuração da conexão com o nó (Ganache ou outro nó local)
const web3 = new Web3('http://localhost:8545'); // Endereço do nó Ethereum

// Endereço da conta que fará o deploy
const account = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'; // Substitua pelo endereço da conta

// Carregar os artefatos do contrato
const tokenArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'build/contracts/DigitalToken.json')));
const leilaoArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'build/contracts/LeilaoAsCegas.json')));

async function deploy() {
    try {
        console.log('Iniciando deploy dos contratos...');

        // Quantidade inicial de tokens (em wei, ou unidades base)
        const initialSupply = web3.utils.toWei('1000', 'ether'); // 1000 tokens, ajustado para a unidade base do contrato

        // Implantar o contrato ERC20 com quantidade inicial
        const tokenContract = new web3.eth.Contract(tokenArtifact.abi);
        const tokenInstance = await tokenContract.deploy({ 
            data: tokenArtifact.bytecode, 
            arguments: [initialSupply]
        })
        .send({ from: account, gas: '2000000', gasPrice: web3.utils.toWei('20', 'gwei') });
        console.log('Contrato ERC20 implantado em:', tokenInstance.options.address);

        // Implantar o contrato do leilão
        const leilaoContract = new web3.eth.Contract(leilaoArtifact.abi);
        const leilaoInstance = await leilaoContract.deploy({
            data: leilaoArtifact.bytecode,
            arguments: [60000, 60000, tokenInstance.options.address]
        })
        .send({ from: account, gas: '2000000', gasPrice: web3.utils.toWei('20', 'gwei') });
        console.log('Contrato LeilaoAsCegas implantado em:', leilaoInstance.options.address);

    } catch (error) {
        console.error('Erro durante o deploy:', error);
    }
}

deploy();
