import { describe, it, expect } from 'vitest';
import { getHealth } from '../health.service.js';

describe('Health Service', () => {

    it('deve retornar status OK quando o serviço está saudável', () => {
        const resultado = getHealth();

        expect(resultado.status).toBe('OK');
        expect(resultado.message).toContain('saudável');
        expect(resultado).toHaveProperty('timestamp');
    });

});