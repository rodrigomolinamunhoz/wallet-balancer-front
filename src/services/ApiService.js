import WebApi from './WebApi';
import axios from 'axios';

export default class ApiService {
  static async login(tipoAcesso, usuario, senha) {
    const response = await WebApi.post('/sessions', {
      tipoAcesso: tipoAcesso,
      email: usuario,
      senha: senha,
    });
    return response.data;
  }

  static async convidar(idAnalista, email) {
    const response = await WebApi.post('/convidar-cliente', {
      idAnalista: idAnalista,
      email: email,
    });
    return response.data;
  }

  static async cadastrarCliente(
    codigo,
    nome,
    emailPrimario,
    emailSecundario,
    senha
  ) {
    await WebApi.post('/cliente', {
      codigo,
      nome,
      emailPrimario,
      emailSecundario,
      senha,
    });
  }

  static async listarCarteira(idCliente) {
    const response = await WebApi.get(`/carteiras/${idCliente}`);
    return response.data;
  }

  static async deletarCarteira(idCarteira) {
    const response = await WebApi.delete(`/carteira/${idCarteira}`);
    return response.data;
  }

  static async adicionarCarteira(carteira) {
    const response = await WebApi.post('/carteira', {
      nome: carteira.nome,
      id_cliente: carteira.id_cliente,
    });
    return response.data;
  }

  static async listarAcao() {
    const response = await WebApi.get(`/acoes`);
    return response.data;
  }

  static async listarAtivos(idCliente, idCarteira) {
    const response = await WebApi.get(
      `/cliente/${idCliente}/carteira/${idCarteira}/ativos`
    );
    return response.data;
  }

  static async adicionarEditarAtivo(idCarteira, ativos) {
    const response = await WebApi.post(`/carteira/${idCarteira}/ativo`, {
      ativos: ativos,
    });
    return response.data;
  }

  static async deletarAtivo(idAtivo) {
    const response = await WebApi.delete(`/ativo/${idAtivo}`);
    return response.data;
  }

  static async listarSetores() {
    const response = await WebApi.get(`/setores`);
    return response.data;
  }

  static async listarBalanceador(idCliente, idCarteira) {
    const response = await WebApi.get(
      `/cliente/${idCliente}/carteira/${idCarteira}/listar-balanceador`
    );
    return response.data;
  }

  static async listarHistorico(idCliente, idCarteira) {
    const response = await WebApi.get(
      `/cliente/${idCliente}/carteira/${idCarteira}/historico-ativos`
    );
    return response.data;
  }

  static async compraVenda(movimentacoes) {
    const response = await WebApi.put('/compra-venda', {
      ativos: movimentacoes,
    });
    return response.data;
  }

  static async balancearAtivos(idCliente, idCarteira, valorAporte) {
    const response = await WebApi.get(
      `/cliente/${idCliente}/carteira/${idCarteira}/balancear`,
      { params: { valorAporte: valorAporte } }
    );
    return response.data;
  }

  static async valorAcao(parametro) {
    return await axios.get(`https://brapi.dev/api/quote/${parametro}?range=1d`);
  }
}
