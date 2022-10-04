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
}
