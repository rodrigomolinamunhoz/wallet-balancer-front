import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { CacheService } from './services/CacheService';
import { StorageKeys } from './constants/StorageKeys';
import CadastroCliente from './pages/CadastroCliente';
import Login from './pages/Login';
import PainelAnalista from './pages/Painel/Analista';
import ConvidarCliente from './pages/Painel/Analista/ConvidarCliente';
import PainelCliente from './pages/Painel/Cliente';
import PaginaNaoEncontrada from './pages/PaginaNaoEncontrada';

const ProtectedRoute = ({ redirectPath = '/' }) => {
  const token = CacheService.get(StorageKeys.AuthToken);
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PaginaNaoEncontrada />} />
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="painel-analista" element={<PainelAnalista />} />
          <Route path="convidar-cliente" element={<ConvidarCliente />} />
          <Route path="painel-cliente" element={<PainelCliente />} />
        </Route>
        <Route path="cadastro-cliente/:codigo" element={<CadastroCliente />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
