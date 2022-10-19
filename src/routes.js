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
import GerenciarAtivos from './pages/Painel/Cliente/GerenciarAtivos';
import GerenciarCarteiras from './pages/Painel/Cliente/GerenciarCarteiras';

const ProtectedRoute = ({ redirectPath = '/' }) => {
  const token = CacheService.get(StorageKeys.AuthToken);
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

const PRAnalista = ({ redirectPath = '/painel-analista' }) => {
  const idCliente = CacheService.get(StorageKeys.IdCliente);
  const idAnalista = CacheService.get(StorageKeys.IdAnalista);
  if (idAnalista != null && idCliente == null) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

const PRCliente = ({ redirectPath = '/painel-cliente' }) => {
  const idCliente = CacheService.get(StorageKeys.IdCliente);
  const idAnalista = CacheService.get(StorageKeys.IdAnalista);
  if (idAnalista == null && idCliente != null) {
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
        <Route path="cadastro-cliente/:codigo" element={<CadastroCliente />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<PRCliente />}>
            <Route path="painel-analista" element={<PainelAnalista />} />
            <Route path="convidar-cliente" element={<ConvidarCliente />} />
          </Route>
          <Route element={<PRAnalista />}>
            <Route path="painel-cliente" element={<PainelCliente />} />
            <Route path="gerenciar-carteiras" element={<GerenciarCarteiras />} />
            <Route path="gerenciar-ativos" element={<GerenciarAtivos />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
