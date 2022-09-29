import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';

import Login from './pages/Login';
import PainelAnalista from './pages/Painel/Analista';

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1>página não encontrada</h1>} />
        <Route path="/" element={<Login />} />
        <Route path="painel-analista" element={<PainelAnalista />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
