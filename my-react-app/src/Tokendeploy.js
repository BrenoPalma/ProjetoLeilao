import Web3 from 'web3';
import contractAbi from './contracts/DigitalToken.json'; // ABI e bytecode do contrato
const deployContract = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  const web3 = new Web3(window.ethereum);
  // Solicita acesso às contas do MetaMask
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0]; // Usa a primeira conta

  // Inicializa o contrato com a ABI
  const contract = new web3.eth.Contract(contractAbi.abi);

  try {
    const gasEstimate = await contract.deploy({
      data: contractAbi.bytecode, // O bytecode do contrato
      arguments: ['1000000'], // Argumento de exemplo: supply inicial
  }).estimateGas({ from: account });
    // Implanta o contrato
    const deployedContract = await contract
      .deploy({
        data: contractAbi.bytecode, // O bytecode do contrato
        arguments: ['1000000'], // Argumento de exemplo: supply inicial
      })
      .send({
        from: account,
        gas: gasEstimate, // Ajuste conforme necessário
        gasPrice: '2000000000', // Ajuste conforme necessário
      });

    console.log('Contrato implantado com sucesso no endereço:', deployedContract.options.address);
    return deployedContract.options.address; // Retorna o endereço do contrato implantado
  } catch (error) {
    console.error('Erro ao implantar o contrato:', error);
    throw error;
  }
};

// Função para transferir tokens
const transferToken = async (tokenAddress, recipientAddress) => {
      const web3 = new Web3(window.ethereum);
      // Solicita acesso às contas do MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      try{

        // Inicializa o contrato com a ABI e o endereço do token
        const contract = new web3.eth.Contract(contractAbi.abi, tokenAddress);
        const gasEstimate = await contract.methods.transfer(recipientAddress, 100).estimateGas({
        from: account
    });

        // Chama o método de transferência do contrato
        await contract.methods.transfer(recipientAddress, 100).send({
          from: account,
          gas: gasEstimate, // Ajuste conforme necessário
          gasPrice: 2000000000
      });

        console.log(`Transferência de token realizada com sucesso para ${recipientAddress}`);
    } catch (error) {
        console.error('Erro ao transferir token:', error);
        throw error;
    }
};

const balance = async (tokenAddress, address) => {
  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractAbi.abi, tokenAddress);
    const balance = await contract.methods.balanceOf(address).call();
    console.log(`Saldo do endereço ${address}: ${balance}`);
    return balance;
  } catch (error) {
    console.error('Erro ao verificar saldo:', error);
    throw error;
  }
}

export { deployContract, transferToken, balance };
