import bcrypt from 'bcrypt';

export class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async cadastrar(dados) {
    const { nome, email, senha } = dados;

    // Validações básicas de campos
    if (!nome || nome.trim() === '') {
      throw new Error('O nome é obrigatório.');
    }
    if (!email || !email.includes('@')) {
      throw new Error('Formato de e-mail inválido.');
    }
    // Trata se a senha for enviada vazia ou cheia de espaços (trim)
    if (!senha || senha.trim().length < 6) {
      throw new Error('A senha deve conter no mínimo 6 caracteres.');
    }

    // RN-01: O e-mail deve ser único
    const usuarioExistente = await this.userModel.findOne({ where: { email } });
    if (usuarioExistente) {
      throw new Error('Este e-mail já está em uso.');
    }

    // Nota: A criptografia da senha (RN-02) já é feita de forma blindada 
    // pelo Hook beforeSave que criamos lá no UserModel!
    return await this.userModel.create({ nome, email, senha });
  }

  async login(email, senha) {
    if (!email || !senha || email.trim() === '' || senha.trim() === '') {
      throw new Error('E-mail ou senha incorretos.');
    }

    // Busca o usuário pelo e-mail
    const usuario = await this.userModel.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // Compara a senha digitada com o hash criptografado do banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('E-mail ou senha incorretos.');
    }

    return usuario;
  }
}