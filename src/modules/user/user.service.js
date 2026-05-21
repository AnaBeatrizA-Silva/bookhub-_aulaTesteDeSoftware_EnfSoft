import bcrypt from 'bcrypt';

export class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async cadastrar(dados) {
    const { nome, email, senha } = dados;

    if (!nome || nome.trim() === '') {
      throw new Error('O nome é obrigatório.');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Formato de e-mail inválido.');
    }
    if (!senha || senha.trim().length < 6) {
      throw new Error('A senha deve conter no mínimo 6 caracteres.');
    }

    const usuarioExistente = await this.userModel.findOne({ where: { email } });
    if (usuarioExistente) {
      throw new Error('Este e-mail já está em uso.');
    }

    return await this.userModel.create({ nome, email, senha });
  }

  async login(email, senha) {
    if (!email || !senha || email.trim() === '' || senha.trim() === '') {
      throw new Error('E-mail ou senha incorretos.');
    }

    const usuario = await this.userModel.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('E-mail ou senha incorretos.');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('E-mail ou senha incorretos.');
    }

    return usuario;
  }
}