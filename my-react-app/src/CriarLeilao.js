import React, { useState } from 'react';
import { deployLeilao, finalizarLeilao, mostrarGanhador, conferirTempo } from './Leilaodeploy'; // Certifique-se de que a função mostrarGanhador está exportada
import './index.css';
function CriarLeilao() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tempoLance, setTempoLance] = useState('');
  const [tempoRevelacao, setTempoRevelacao] = useState('');
  const [leilaoAddress, setLeilaoAddress] = useState('');
  const [leilaoStatus, setLeilaoStatus] = useState('');
  const [finalizarStatus, setFinalizarStatus] = useState(''); // Novo estado para a mensagem de finalização
  const [ganhador, setGanhador] = useState(''); // Novo estado para o ganhador
  const [maiorLance, setMaiorLance] = useState(''); // Novo estado para o maior lance
  const [leilaoadress2, setLeilaoAdress2] = useState(''); // Novo estado para o endereço do leilão
  const [leilaotempolance, setLeilaoTempoLance] = useState(''); // Novo estado para o tempo de lance
  const [leilaotemporevelacao, setLeilaoTempoRevelacao] = useState(''); // Novo estado para o tempo de revelação

  const handleCriarLeilao = async () => {
    try {
      const address = await deployLeilao(tempoLance, tempoRevelacao, tokenAddress);
      setLeilaoAddress(address);
      
      const { dateLance, dateRevelacao } = await conferirTempo(address);
      setLeilaoTempoLance(dateLance);
      setLeilaoTempoRevelacao(dateRevelacao);
      setLeilaoStatus('Leilão criado com sucesso!');
    } catch (error) {
      setLeilaoStatus('Erro ao criar leilão: ' + error.message);
    }
  };

  const handleFinalizarLeilao = async () => {
    try {
      await finalizarLeilao(leilaoadress2);
      setFinalizarStatus('Leilão finalizado com sucesso!');
    } catch (error) {
      setFinalizarStatus('Erro ao finalizar leilão: ' + error.message);
    }
  };

  const handleMostrarGanhador = async () => {
    try {
      const resultado = await mostrarGanhador(leilaoadress2);
      setGanhador(resultado.maiorLicitante); // Assume que maiorLicitante é uma string
      setMaiorLance(resultado.maiorLance); // Assume que maiorLance é uma string
    } catch (error) {
      setFinalizarStatus('Erro ao mostrar ganhador: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Criar Leilão</h1>
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
          <p>Tempo de Lance: {leilaotempolance}</p>
          <p>Tempo de Revelação: {leilaotemporevelacao}</p>
        </div>
      )}
      <div>
      <h2>Finalizar Leilão</h2>
      <label>
        Endereço Leilão:
        <input
          type="text"
          value={leilaoadress2}
          onChange={(e) => setLeilaoAdress2(e.target.value)}
        />
      </label>
      <button onClick={handleFinalizarLeilao}>Finalizar Leilão</button>
      <p>{finalizarStatus}</p> {/* Mensagem de status da finalização */}
      </div>
      <div>
      <h2>Mostrar Ganhador</h2>
      <label>
        Endereço Leilão:
        <input
          type="text"
          value={leilaoadress2}
          onChange={(e) => setLeilaoAdress2(e.target.value)}
        />
      </label>
          <button onClick={handleMostrarGanhador}>Mostrar Ganhador</button>
          </div>
          {ganhador && (
            <div>
              <p>Ganhador: {ganhador}</p>
              <p>Maior Lance: {maiorLance}</p>
            </div>
          )}
    </div>
  );
}

export default CriarLeilao;