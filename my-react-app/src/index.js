import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // Importa o componente principal
import TokenApp from './TokenApp';
import CriarLeilao from './CriarLeilao';
import ParticiparLeilao from './ParticiparLeilao';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tokenapp" element={<TokenApp />} />
      <Route path="/criarleilao" element={<CriarLeilao />} />
      <Route path="/participarleilao" element={<ParticiparLeilao />} />
    </Routes>
  </Router>
);
