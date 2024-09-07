document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connectButton');
  async function connect() {
      console.log('Conectando ao MetaMask...');
      if (typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);
          try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
          } catch (error) {
              console.error('Erro ao conectar ao MetaMask:', error.message);
          }
      } else {
          alert('MetaMask não está instalado');
      }
  }
  connectButton.addEventListener('click', connect());
});
