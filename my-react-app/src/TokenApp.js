import React, { useState } from 'react';
import { deployContract, transferToken, balance } from './Tokendeploy';
import './index.css';
function TokenApp() {
  const [contractAddress, setContractAddress] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [balanceAddress, setBalanceAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [transferStatus, setTransferStatus] = useState('');
  const [balanceStatus, setBalanceStatus] = useState(''); // Novo estado para armazenar a mensagem de erro de saldo

  const handleDeploy = async () => {
    try {
      const address = await deployContract();
      setContractAddress(address);
    } catch (error) {
      console.error('Erro ao implantar o contrato:', error);
    }
  };

  const handleTransfer = async () => {
    try {
      if (!tokenAddress) {
        console.error('Endereço do contrato não fornecido.');
        setTransferStatus('Erro: Endereço do contrato não fornecido.');
        return;
      }
      if (!recipientAddress) {
        console.error('Endereço do destinatário não fornecido.');
        setTransferStatus('Erro: Endereço do destinatário não fornecido.');
        return;
      }

      await transferToken(tokenAddress, recipientAddress);
      setTransferStatus('Token transferido com sucesso.');
    } catch (error) {
      console.error('Erro ao transferir tokens:', error);
      setTransferStatus('Erro ao transferir tokens. Verifique o endereço e tente novamente.');
    }
  };

  const handleBalanceCheck = async () => {
    try {
      if (!tokenAddress) {
        console.error('Endereço do contrato não fornecido.');
        setBalanceStatus('Erro: Endereço do contrato não fornecido.');
        return;
      }
      if (!balanceAddress) {
        console.error('Endereço para verificar o saldo não fornecido.');
        setBalanceStatus('Erro: Endereço para verificar o saldo não fornecido.');
        return;
      }

      const balanceAmount = await balance(tokenAddress, balanceAddress);
      setAccountBalance(balanceAmount.toString());
      setBalanceStatus(''); // Limpa a mensagem de erro em caso de sucesso
    } catch (error) {
      console.error('Erro ao verificar saldo:', error);
      setBalanceStatus('Erro ao verificar saldo. Verifique o endereço e tente novamente.');
    }
  };

  return (
    <div>
      <h1>Deploy do Token</h1>
      <button onClick={handleDeploy}>Implantar Token</button>
      {contractAddress && (
        <div>
          <h2>Contrato Implantado</h2>
          <p>Endereço do contrato: {contractAddress}</p>
        </div>
      )}
      <div>
        <h2>Transferir Tokens</h2>
        <input
          type="text"
          placeholder="Endereço do contrato"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço do destinatário"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
        <button onClick={handleTransfer}>Transferir Token</button>
        {transferStatus && <p>{transferStatus}</p>}
      </div>
      <div>
        <h2>Verificar Saldo</h2>
        <input
          type="text"
          placeholder="Endereço do contrato"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Endereço para verificar saldo"
          value={balanceAddress}
          onChange={(e) => setBalanceAddress(e.target.value)}
        />
        <button onClick={handleBalanceCheck}>Verificar Saldo</button>
        {accountBalance && <p>Saldo: {accountBalance}</p>}
        {balanceStatus && <p>{balanceStatus}</p>} {/* Exibe a mensagem de erro de saldo */}
      </div>
    </div>
  );
}

export default TokenApp;