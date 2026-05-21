import { Router } from 'express';
import { UserController } from './user.controller.js';

const userRoutes = Router();

userRoutes.get('/login', UserController.renderLogin);
userRoutes.get('/cadastro', UserController.renderCadastro);

userRoutes.post('/cadastro', UserController.cadastrar);
userRoutes.post('/login', UserController.login);

export { userRoutes };