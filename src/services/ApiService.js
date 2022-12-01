import WebApi from './WebApi';

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
}
