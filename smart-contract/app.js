document.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connectButton');
  if (connectButton) {
      connectButton.addEventListener('click', async () => {
          if (typeof window.ethereum !== 'undefined') {
              try {
                  await window.ethereum.request({ method: 'eth_requestAccounts' });
                  alert('MetaMask is connected');
              } catch (error) {
                  console.error('User denied account access:', error);
              }
          } else {
              alert('MetaMask is not installed');
          }
      });
  } else {
      console.error('Connect button not found');
  }
});
