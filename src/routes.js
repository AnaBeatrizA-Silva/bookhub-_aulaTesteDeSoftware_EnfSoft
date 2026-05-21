import { Router } from 'express';
import { userRoutes } from './modules/user/user.routes.js';
import { bookRoutes } from './modules/book/book.routes.js';

const routes = Router();

// Rota raiz apenas redireciona para o login
routes.get('/', (req, res) => {
  res.redirect('/login');
});

// Acopla as rotas específicas dos módulos
routes.use(userRoutes);
routes.use(bookRoutes);

export { routes };