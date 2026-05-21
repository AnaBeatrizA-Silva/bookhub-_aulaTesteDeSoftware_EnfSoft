import { Router } from 'express';
import { userRoutes } from './modules/user/user.routes.js';
import { bookRoutes } from './modules/book/book.routes.js';

const routes = Router();

routes.get('/', (req, res) => {
  res.redirect('/login');
});

routes.use(userRoutes);
routes.use(bookRoutes);

export { routes };