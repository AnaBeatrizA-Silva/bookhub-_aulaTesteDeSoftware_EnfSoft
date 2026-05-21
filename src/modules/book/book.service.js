export class BookService {
  constructor(bookModel) {
    this.bookModel = bookModel;
  }

  async cadastrar(dados) {
    const { titulo, autor, categoria, descricao } = dados;

    if (!titulo || titulo.trim() === '') {
      throw new Error('O título do livro é obrigatório.');
    }
    if (!autor || autor.trim() === '') {
      throw new Error('O autor do livro é obrigatório.');
    }

    return await this.bookModel.create({ titulo, autor, categoria, descricao });
  }

  async listarTodos() {
    return await this.bookModel.findAll();
  }
}