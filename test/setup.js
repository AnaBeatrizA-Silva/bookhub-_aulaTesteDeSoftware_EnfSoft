// test/setup.js
import { vi } from "vitest";
// Simula o objeto de requisição (req) do Express
global.mockReq = (body = {}, session = {}) => ({
	body,
	session,
	flash: vi.fn(),
	get: vi.fn(),
});
// Simula o objeto de resposta (res) do Express
global.mockRes = () => {
	const res = {};
	res.status = vi.fn().mockReturnValue(res);
	res.json = vi.fn().mockReturnValue(res);
	res.redirect = vi.fn().mockReturnValue(res);
	res.render = vi.fn().mockReturnValue(res);
	return res;
};
