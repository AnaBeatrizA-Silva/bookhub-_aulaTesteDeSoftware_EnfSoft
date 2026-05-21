import { Router } from 'express';
import { BookController } from './book.controller.js';

const bookRoutes = Router();

bookRoutes.get('/home', BookController.renderHome);
bookRoutes.get('/livros/novo', BookController.renderNovoLivro);

bookRoutes.post('/livros', BookController.cadastrar);

export { bookRoutes };