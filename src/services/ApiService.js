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
}
