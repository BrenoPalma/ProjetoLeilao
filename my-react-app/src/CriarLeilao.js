import React, { useState } from 'react';
import { deployLeilao, finalizarLeilao, mostrarGanhador } from './Leilaodeploy'; // Certifique-se de que a função mostrarGanhador está exportada

function CriarLeilao() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tempoLance, setTempoLance] = useState('');
  const [tempoRevelacao, setTempoRevelacao] = useState('');
  const [leilaoAddress, setLeilaoAddress] = useState('');
  const [leilaoStatus, setLeilaoStatus] = useState('');
  const [finalizarStatus, setFinalizarStatus] = useState(''); // Novo estado para a mensagem de finalização
  const [ganhador, setGanhador] = useState(''); // Novo estado para o ganhador
  const [maiorLance, setMaiorLance] = useState(''); // Novo estado para o maior lance

  const handleCriarLeilao = async () => {
    try {
      const address = await deployLeilao(tempoLance, tempoRevelacao, tokenAddress);
      setLeilaoAddress(address);
      setLeilaoStatus('Leilão criado com sucesso!');
    } catch (error) {
      setLeilaoStatus('Erro ao criar leilão: ' + error.message);
    }
  };

  const handleFinalizarLeilao = async () => {
    try {
      await finalizarLeilao(leilaoAddress);
      setFinalizarStatus('Leilão finalizado com sucesso!');
    } catch (error) {
      setFinalizarStatus('Erro ao finalizar leilão: ' + error.message);
    }
  };

  const handleMostrarGanhador = async () => {
    try {
      const resultado = await mostrarGanhador(leilaoAddress);
      setGanhador(resultado.maiorLicitante); // Assume que maiorLicitante é uma string
      setMaiorLance(resultado.maiorLance); // Assume que maiorLance é uma string
    } catch (error) {
      setFinalizarStatus('Erro ao mostrar ganhador: ' + error.message);
    }
  };

  return (
    <div>
      <label>
        Endereço do Token:
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
      </label>
      <label>
        Tempo de Lance:
        <input
          type="text"
          value={tempoLance}
          onChange={(e) => setTempoLance(e.target.value)}
        />
      </label>
      <label>
        Tempo de Revelação:
        <input
          type="text"
          value={tempoRevelacao}
          onChange={(e) => setTempoRevelacao(e.target.value)}
        />
      </label>
      <button onClick={handleCriarLeilao}>Criar Leilão</button>
      <p>{leilaoStatus}</p>
      {leilaoAddress && (
        <div>
          <h2>Leilão Criado</h2>
          <p>Endereço do leilão: {leilaoAddress}</p>
          <button onClick={handleFinalizarLeilao}>Finalizar Leilão</button>
          <p>{finalizarStatus}</p> {/* Mensagem de status da finalização */}
          <button onClick={handleMostrarGanhador}>Mostrar Ganhador</button>
          {ganhador && (
            <div>
              <p>Ganhador: {ganhador}</p>
              <p>Maior Lance: {maiorLance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CriarLeilao;