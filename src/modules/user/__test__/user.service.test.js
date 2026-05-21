import { describe, it, expect, vi, beforeEach } from "vitest";
import { UserService } from "../user.service.js";
import { UserModel } from "../user.model.js";
import bcrypt from "bcrypt";

vi.mock("../user.model.js", () => {
	return {
		UserModel: {
			findOne: vi.fn(),
			create: vi.fn(),
		},
	};
});

describe("UserService - Testes Unitários", () => {
	let userService;

	beforeEach(() => {
		vi.clearAllMocks();
		userService = new UserService(UserModel);
	});

	// --- FLUXO DE CADASTRO ---
	it("1. Deve cadastrar um usuário com sucesso se os dados forem válidos", async () => {
		const dadosValidos = {
			nome: "Ana",
			email: "ana@email.com",
			senha: "senhaSegura123",
		};
		UserModel.findOne.mockResolvedValue(null);
		UserModel.create.mockResolvedValue({ id: 1, ...dadosValidos });

		const resultado = await userService.cadastrar(dadosValidos);
		expect(resultado).toHaveProperty("id");
		expect(resultado.email).toBe(dadosValidos.email);
	});

	it("2. Deve lançar erro se o e-mail já estiver em uso (RN-01)", async () => {
		UserModel.findOne.mockResolvedValue({
			id: 1,
			email: "existente@email.com",
		});
		await expect(
			userService.cadastrar({
				nome: "Ana",
				email: "existente@email.com",
				senha: "senhaSegura123",
			}),
		).rejects.toThrow("Este e-mail já está em uso.");
	});

	it("3. Deve lançar erro se a senha tiver menos de 6 caracteres (RN-03)", async () => {
		await expect(
			userService.cadastrar({
				nome: "Ana",
				email: "ana@email.com",
				senha: "123",
			}),
		).rejects.toThrow("A senha deve conter no mínimo 6 caracteres.");
	});

	it("4. Deve lançar erro se o campo nome for enviado vazio", async () => {
		await expect(
			userService.cadastrar({
				nome: "",
				email: "ana@email.com",
				senha: "senhaSegura123",
			}),
		).rejects.toThrow("O nome é obrigatório.");
	});

	it("5. Deve lançar erro se o e-mail for inválido", async () => {
		await expect(
			userService.cadastrar({
				nome: "Ana",
				email: "ana_email_com",
				senha: "senhaSegura123",
			}),
		).rejects.toThrow("Formato de e-mail inválido.");
	});

	it("6. Deve lançar erro se a senha for apenas espaços em branco", async () => {
		await expect(
			userService.cadastrar({
				nome: "Ana",
				email: "ana@email.com",
				senha: "      ",
			}),
		).rejects.toThrow("A senha deve conter no mínimo 6 caracteres.");
	});

	// --- FLUXO DE LOGIN ---
	it("7. Deve fazer login com sucesso se as credenciais forem válidas", async () => {
		const hash = await bcrypt.hash("senha123", 10);
		UserModel.findOne.mockResolvedValue({
			id: 1,
			nome: "Ana",
			email: "ana@email.com",
			senha: hash,
		});

		const resultado = await userService.login("ana@email.com", "senha123");
		expect(resultado).toHaveProperty("id");
	});

	it("8. Deve lançar erro no login se o e-mail não for encontrado", async () => {
		UserModel.findOne.mockResolvedValue(null);
		await expect(
			userService.login("naoexiste@email.com", "senha123"),
		).rejects.toThrow("E-mail ou senha incorretos.");
	});

	it("9. Deve lançar erro no login se a senha estiver incorreta", async () => {
		const hash = await bcrypt.hash("senha123", 10);
		UserModel.findOne.mockResolvedValue({
			id: 1,
			email: "ana@email.com",
			senha: hash,
		});

		await expect(
			userService.login("ana@email.com", "senha_errada"),
		).rejects.toThrow("E-mail ou senha incorretos.");
	});

	it("10. Deve lançar erro no login se os campos forem enviados vazios", async () => {
		await expect(userService.login("", "")).rejects.toThrow(
			"E-mail ou senha incorretos.",
		);
	});
});
