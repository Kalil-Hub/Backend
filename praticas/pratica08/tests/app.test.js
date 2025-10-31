
const supertest = require('supertest');

const app = require('../app'); 

const request = supertest(app);

let token;

describe('API Pratica 08 - Testes de Autenticação e Rotas', () => {

    
    test('GET /produtos deve retornar 401 (Não autorizado) sem token', async () => {
        const response = await request.get('/produtos');
        expect(response.status).toBe(401);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('msg', 'Não autorizado');
    });

    
    test('GET /produtos deve retornar 401 (Token inválido) com token mal formatado', async () => {
        const response = await request.get('/produtos').set('Authorization', 'Bearer 123456789');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('msg', 'Token inválido');
    });


    test('POST /usuarios/login deve retornar 200 e um token', async () => {
        const response = await request.post('/usuarios/login').send({
            usuario: "email@exemplo.com",
            senha: "abcd1234"
        });
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('token');
        
        token = response.body.token;
    });

    test('GET /produtos deve retornar 200 com token válido', async () => {
        const response = await request.get('/produtos')
                                  .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });

    test('POST /usuarios/renovar deve retornar 200 e um novo token', async () => {
        const response = await request.post('/usuarios/renovar')
                                  .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toHaveProperty('token');

        token = response.body.token;
    });


    test('GET /produtos deve retornar 200 com o novo token (renovado)', async () => {
        const response = await request.get('/produtos')
                                  .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
    });

});