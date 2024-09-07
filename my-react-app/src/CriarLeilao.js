import React, { useState } from 'react';
import { deployLeilao } from './Leilaodeploy';
//usuario precisa do endereço do token, do tempo de lance e tempo de revelacao
function CriarLeilao() {
    const [tokenAddress, setTokenAddress] = useState('');
    const [tempoLance, setTempoLance] = useState('');
    const [tempoRevelacao, setTempoRevelacao] = useState('');
    const [leilaoStatus, setLeilaoStatus] = useState('');
    const [leilaoAddress, setLeilaoAddress] = useState('');
  
    const handleCriarLeilao = async () => {
      try {
        if (!tokenAddress) {
          console.error('Endereço do contrato não fornecido.');
          setLeilaoStatus('Erro: Endereço do contrato não fornecido.');
          return;
        }
        if (!tempoLance) {
          console.error('Tempo de lance não fornecido.');
          setLeilaoStatus('Erro: Tempo de lance não fornecido.');
          return;
        }
        if (!tempoRevelacao) {
            console.error('Tempo de revelação não fornecido.');
            setLeilaoStatus('Erro: Tempo de revelação não fornecido.');
            return;
          }
        const address = await deployLeilao(tempoLance, tempoRevelacao, tokenAddress);
        setLeilaoAddress(address);
        setLeilaoStatus('Leilão criado com sucesso.');
      } catch (error) {
        console.error('Erro ao criar leilão:', error);
        setLeilaoStatus('Erro ao criar leilão. Verifique o endereço e tente novamente.');
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
          </div>
        )}
      </div>
    );
}
export default CriarLeilao;