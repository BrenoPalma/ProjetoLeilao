import Web3 from 'web3';
import contractAbi from './contracts/LeilaoAsCegas.json'; // ABI e bytecode do contrato
import contractAbiToken from './contracts/DigitalToken.json';
const deployLeilao = async (duracaoLance, duracaoRevelacao, tokenAddress) => {
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
        // Implanta o contrato
        const deployedContract = await contract
        .deploy({
            data: contractAbi.bytecode, // O bytecode do contrato
            //argumentos serão endereço do token, tempo de lance e tempo de revelação
            arguments: [duracaoLance, duracaoRevelacao, tokenAddress]
        })
        .send({
            from: account,
            gas: '1500000', // Ajuste conforme necessário
            gasPrice: '300717935', // Ajuste conforme necessário
        });
    
        console.log('Contrato implantado com sucesso no endereço:', deployedContract.options.address);


        const dContract = new web3.eth.Contract(contractAbi.abi, deployedContract.options.address);
        const fimPeriodoLance = await dContract.methods.fimPeriodoLances().call();
        const fimPeriodoLanceNumber = Number(fimPeriodoLance);
        console.log('Fim do período de lances:', fimPeriodoLance);
        const dateLance = new Date(fimPeriodoLanceNumber * 1000);
        console.log(dateLance.toUTCString());
        const fimPeriodoRevelacao = await dContract.methods.fimPeriodoRevelacao().call();
        const fimPeriodoRevelacaoNumber = Number(fimPeriodoRevelacao);
        console.log('Fim do período de revelação:', fimPeriodoRevelacao);
        const dateRevelacao = new Date(fimPeriodoRevelacaoNumber * 1000);
        console.log(dateRevelacao.toUTCString()); // Converte para um formato de data UTC legível
        
        return deployedContract.options.address; // Retorna o endereço do contrato implantado
    } catch (error) {
        console.error('Erro ao implantar o contrato:', error);
        throw error;
    }
    }

    const enviarLance = async (leilaoAddress, lance, segredo) => {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        
        const web3 = new Web3(window.ethereum);
        
        // Solicita acesso às contas do MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0]; // Usa a primeira conta
        const valorCego = web3.utils.soliditySha3(
            { type: 'uint256', value: lance },
            { type: 'string', value: segredo }
        );
        // Inicializa o contrato com a ABI
        const contract = new web3.eth.Contract(contractAbi.abi, leilaoAddress);
        
        try {
            // Chama o método de enviar lance do contrato
            await contract.methods.enviarLance(valorCego).send({
                from: account,
                gas: 100000, // Ajuste conforme necessário
                gasPrice: 300717935
            });
        
            console.log(`Lance de ${lance} enviado com sucesso para ${leilaoAddress}`);
        } catch (error) {
            console.error('Erro ao enviar lance:', error);
            throw error;
        }
    }

    //revelar lance (segredo e valor do lance) + approve do token
    const revelarLance = async (leilaoAddress, lance, segredo) => {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        
        const web3 = new Web3(window.ethereum);
        
        // Solicita acesso às contas do MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0]; // Usa a primeira conta
        // Inicializa o contrato com a ABI
        const contract = new web3.eth.Contract(contractAbi.abi, leilaoAddress);
        
        try {
            const tokenAddress = await contract.methods.token().call();
            const tokenContract = new web3.eth.Contract(contractAbiToken.abi, tokenAddress);
            await tokenContract.methods.approve(leilaoAddress, lance).send({
                from: account,
                gas: 100000, // Ajuste conforme necessário
                gasPrice: 300717935
            })
            // Chama o método de revelar lance do contrato
            await contract.methods.revelarLance(lance, segredo).send({
                from: account,
                gas: 900000, // Ajuste conforme necessário
                gasPrice: 300717935
            });
        
            console.log(`Lance de ${lance} revelado com sucesso para ${leilaoAddress}`);
        } catch (error) {
            console.error('Erro ao revelar lance:', error);
            throw error;
        }
    }

    const finalizarLeilao = async (leilaoAddress) => {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        
        const web3 = new Web3(window.ethereum);
        
        // Solicita acesso às contas do MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0]; // Usa a primeira conta
        
        // Inicializa o contrato com a ABI
        const contract = new web3.eth.Contract(contractAbi.abi, leilaoAddress);
        
        try {
            // Chama o método de finalizar leilão do contrato
            await contract.methods.finalizarLeilao().send({
                from: account,
                gas: 100000, // Ajuste conforme necessário
                gasPrice: 300717935
            });
        
            console.log(`Leilão finalizado com sucesso em ${leilaoAddress}`);
        } catch (error) {
            console.error('Erro ao finalizar leilão:', error);
            throw error;
        }
    }
    const mostrarGanhador = async (leilaoAddress) => {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask is not installed');
        }
        
        const web3 = new Web3(window.ethereum);
        
        // Solicita acesso às contas do MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Inicializa o contrato com a ABI
        const contract = new web3.eth.Contract(contractAbi.abi, leilaoAddress);
        
        try {
            // Chama o método de finalizar leilão do contrato
            const ganhador = await contract.methods.mostrarGanhador().call();
            //retorna o endereço do ganhador e o maior lance
            //printa o tipo de dado da variavel ganhador
            const maiorLicitante = ganhador[0];
            const maiorLance = ganhador[1];
            console.log('Endereço do ganhador:', maiorLicitante);
            console.log('Maior lance:', maiorLance.toString());
            
            // Retorna o endereço do ganhador e o maior lance
            return { maiorLicitante, maiorLance: maiorLance.toString() };
        } catch (error) {
            console.error('Erro ao mostrar ganhador,Leilão não finalizado', error);
            throw error;
        }
    }

    export { deployLeilao };
    export { enviarLance };
    export { revelarLance };
    export { finalizarLeilao };
    export { mostrarGanhador };

   