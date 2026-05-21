import { UserService } from './user.service.js';
import { UserModel } from './user.model.js';

const userService = new UserService(UserModel);

export class UserController {
  static renderLogin(req, res) {
    res.render('login', { error: null });
  }

  static renderCadastro(req, res) {
    res.render('cadastro', { error: null });
  }

  static async cadastrar(req, res) {
    try {
      await userService.cadastrar(req.body);
      res.redirect('/login');
    } catch (err) {
      res.render('cadastro', { error: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      await userService.login(email, senha);
      res.redirect('/home');
    } catch (err) {
      res.render('login', { error: err.message });
    }
  }
}