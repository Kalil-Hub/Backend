const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

let id; // variável global para armazenar o id da tarefa criada

test("GET /tarefas deve retornar 200", async () => {
    const response = await request.get("/tarefas");
    expect(response.status).toBe(200);
});

test("POST /tarefas deve retornar 201", async () => {
    const dados = { nome: "Estudar Node", concluida: false };
    const response = await request.post("/tarefas").send(dados);
    expect(response.status).toBe(201);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.id).toBeDefined();
    id = response.body.id; // guardando id para os próximos testes
    expect(response.body.nome).toBe(dados.nome);
    expect(response.body.concluida).toBe(false);
});

// Letra (G)
test("GET /tarefas/id deve retornar 200", async () => {
    const response = await request.get(`/tarefas/${id}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
});

// Letra (H)
test("GET /tarefas/1 retorna 404", async () => {
    const response = await request.get(`/tarefas/1`);
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
});

// Letra (I)
test("PUT /tarefas/id deve retornar 200", async () => {
    const dados = { id, nome: "Estudar Node", concluida: true };
    const response = await request.put(`/tarefas/${id}`).send(dados);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.nome).toBe(dados.nome);
    expect(response.body.concluida).toBe(true);
});

// Letra (J)
test("PUT /tarefas/1 retorna 404", async () => {
    const dados = { id: 1, nome: "Teste", concluida: false };
    const response = await request.put(`/tarefas/1`).send(dados);
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
});

// Letra (K)
test("DELETE /tarefas/id deve retornar 204", async () => {
    const response = await request.delete(`/tarefas/${id}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
});

// Letra (L)
test("DELETE /tarefas/1 retorna 404", async () => {
    const response = await request.delete(`/tarefas/1`);
    expect(response.status).toBe(404);
    expect(response.headers['content-type']).toMatch(/json/);
});
