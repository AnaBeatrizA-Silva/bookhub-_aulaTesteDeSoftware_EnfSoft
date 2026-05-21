import { BookService } from './book.service.js';
import { BookModel } from './book.model.js';

const bookService = new BookService(BookModel);

export class BookController {
  static async renderHome(req, res) {
    try {
      const livros = await bookService.listarTodos();
      res.render('home', { livros });
    } catch (err) {
      res.render('home', { livros: [], error: 'Erro ao carregar o acervo.' });
    }
  }

  static renderNovoLivro(req, res) {
    res.render('cadastrar-livro', { error: null });
  }

  static async cadastrar(req, res) {
    try {
      await bookService.cadastrar(req.body);
      res.redirect('/home');
    } catch (err) {
      res.render('cadastrar-livro', { error: err.message });
    }
  }
}