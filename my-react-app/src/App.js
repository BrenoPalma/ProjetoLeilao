import React from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const handleTokenAppClick = () => {
    navigate('/tokenapp');
  };

  const handleLeilaoDeployClick = () => {
    navigate('/criarleilao');
  };

  const handleReceiveClick = () => {
    navigate('/participarleilao');
  };

  return (
    <div>
      <h1>Leilão</h1>
      <button onClick={handleTokenAppClick}>Ir para Token App</button>
      <button onClick={handleLeilaoDeployClick}>Criar Leilão</button>
      <button onClick={handleReceiveClick}>Participar de Leilão</button>
    </div>
  );
};

export default App;
