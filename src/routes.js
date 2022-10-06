import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import CadastroCliente from './pages/CadastroCliente';
import Login from './pages/Login';
import PainelAnalista from './pages/Painel/Analista';
import ConvidarCliente from './pages/Painel/Analista/ConvidarCliente';
import PainelCliente from './pages/Painel/Cliente';

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1>página não encontrada</h1>} />
        <Route path="/" element={<Login />} />
        <Route path="painel-analista" element={<PainelAnalista />} />
        <Route path="convidar-cliente" element={<ConvidarCliente />} />
        <Route path="painel-cliente" element={<PainelCliente />} />
        <Route path="cadastro-cliente" element={<CadastroCliente />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
