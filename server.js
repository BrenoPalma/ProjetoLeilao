const express = require('express');

const deploy = require('./deploy');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Deploy!');
  deploy();
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
