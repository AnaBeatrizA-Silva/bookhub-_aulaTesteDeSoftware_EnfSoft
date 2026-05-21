import { describe, it, expect, vi, beforeEach } from "vitest";
import { BookService } from "../book.service.js";
import { BookModel } from "../book.model.js";

// Mock do modelo de Livros do Sequelize
vi.mock("../book.model.js", () => {
	return {
		BookModel: {
			create: vi.fn(),
			findAll: vi.fn(),
		},
	};
});

describe("BookService - Testes Unitários", () => {
	let bookService;

	beforeEach(() => {
		vi.clearAllMocks();
		bookService = new BookService(BookModel);
	});

	it("11. Deve cadastrar um livro com sucesso se os dados forem válidos", async () => {
		const dadosLivro = {
			titulo: "O Hobbit",
			autor: "J.R.R. Tolkien",
			categoria: "Fantasia",
			descricao: "Um livro excelente",
		};
		BookModel.create.mockResolvedValue({ id: 1, ...dadosLivro });

		const resultado = await bookService.cadastrar(dadosLivro);

		expect(resultado).toHaveProperty("id");
		expect(resultado.titulo).toBe("O Hobbit");
	});

	it("12. Deve lançar erro se tentar cadastrar um livro sem título (RN-34)", async () => {
		const livroInvalido = { autor: "Tolkien", categoria: "Fantasia" };
		await expect(bookService.cadastrar(livroInvalido)).rejects.toThrow(
			"O título do livro é obrigatório.",
		);
	});

	it("13. Deve lançar erro se tentar cadastrar um livro sem autor (RN-34)", async () => {
		const livroInvalido = { titulo: "O Hobbit", categoria: "Fantasia" };
		await expect(bookService.cadastrar(livroInvalido)).rejects.toThrow(
			"O autor do livro é obrigatório.",
		);
	});

	it("14. Deve listar todos os livros cadastrados (RF-07)", async () => {
		BookModel.findAll.mockResolvedValue([
			{ id: 1, titulo: "Livro 1", autor: "Autor 1", categoria: "Ação" },
			{ id: 2, titulo: "Livro 2", autor: "Autor 2", categoria: "Drama" },
		]);

		const livros = await bookService.listarTodos();

		expect(livros).toHaveLength(2);
		expect(livros[0].titulo).toBe("Livro 1");
	});
});
