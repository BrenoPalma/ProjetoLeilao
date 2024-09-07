import React, { useState } from 'react';
import { enviarLance,revelarLance } from './Leilaodeploy';

function ParticiparLeilao(){
    //usuario precisa do endereço do leilao e do valor do lance e de um segredo que ele ira criar
    const [leilaoAddress, setLeilaoAddress] = useState('');
    const [lance, setLance] = useState('');
    const [segredo, setSegredo] = useState('');
    const [participarStatus, setParticiparStatus] = useState('');
    const [participarAddress, setParticiparAddress] = useState('');
    const [revelarStatus, setRevelarStatus] = useState(''); 
    //criar handle para participar do leilao
    const handleParticiparLeilao = async () => {
        try {
          if (!leilaoAddress) {
            console.error('Endereço do contrato não fornecido.');
            setParticiparStatus('Erro: Endereço do contrato não fornecido.');
            return;
          }
          if (!lance) {
            console.error('Lance não fornecido.');
            setParticiparStatus('Erro: Lance não fornecido.');
            return;
          }
          if (!segredo) {
              console.error('Segredo não fornecido.');
              setParticiparStatus('Erro: Segredo não fornecido.');
              return;
            }
          const address = await enviarLance(leilaoAddress, lance, segredo);
          setParticiparAddress(address);
          //await criarLeilao(tokenAddress, tempoLance, tempoRevelacao);
          setParticiparStatus('Lance realizado com sucesso.');
        } catch (error) {
          console.error('Erro ao participar do leilão:', error);
          setParticiparStatus('Erro ao participar do leilão. Verifique o endereço e tente novamente.');
        }
      };
      const handleRevelarLance = async () => {
        try {
          await revelarLance(leilaoAddress, lance, segredo);
          setRevelarStatus('Lance revelado com sucesso.');
        } catch (error) {
          console.error('Erro ao revelar lance:', error);
          setRevelarStatus('Erro ao revelar lance. Verifique os dados e tente novamente.');
        }
      };
    return (
        <div>
          <h1>Participar do Leilão</h1>
          <label>
            Endereço do Leilão:
            <input
              type="text"
              value={leilaoAddress}
              onChange={(e) => setLeilaoAddress(e.target.value)}
            />
          </label>
          <label>
            Lance:
            <input
              type="text"
              value={lance}
              onChange={(e) => setLance(e.target.value)}
            />
          </label>
          <label>
            Segredo:
            <input
              type="text"
              value={segredo}
              onChange={(e) => setSegredo(e.target.value)}
            />
          </label>
          <button onClick={handleParticiparLeilao}>Fazer Lance</button>
          <p>{participarStatus}</p>
          <p>{participarAddress}</p>
          <div>
            <h2>Revelar Lance</h2>
            <label>
            Endereço do Leilão:
            <input
              type="text"
              value={leilaoAddress}
              onChange={(e) => setLeilaoAddress(e.target.value)}
            />
            </label>
            <label>
            Lance:
            <input
              type="text"
              value={lance}
              onChange={(e) => setLance(e.target.value)}
            />
            </label>
            <label>
            Segredo:
            <input
              type="text"
              value={segredo}
              onChange={(e) => setSegredo(e.target.value)}
            />
            </label>
            <button onClick={handleRevelarLance}>Revelar Lance</button>
            <p>{revelarStatus}</p>
          </div>
        </div>
      );


}
export default ParticiparLeilao;