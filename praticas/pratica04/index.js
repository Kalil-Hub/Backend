// importando o express
const express = require('express');

// array tarefas em memória
const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// criando instância do express
const app = express();
const port = 3000;

// middleware para processar o JSON
app.use(express.json());

// middleware de aplicação dos registros
app.use((req, res, next) => {
  const registro = new Date();
  console.log(`[${registro.toString()}] ${req.method} ${req.url}`);
  next();
});

// criando router
const router = express.Router();

// GET /tarefas → listar todas
router.get('/', (req, res) => {
  res.json(tarefas);
});

// POST /tarefas → criar nova
router.post('/', (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    nome: req.body.nome,
    concluida: req.body.concluida || false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// buscar por id 
router.get('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }
  res.json(tarefa);
});

// atualizar por id 
router.put('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }

  tarefa.nome = req.body.nome ?? tarefa.nome;
  tarefa.concluida = req.body.concluida ?? tarefa.concluida;

  res.json(tarefa);
});

// remover por id 
router.delete('/:tarefaId', (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) {
    return next(new Error("Tarefa não localizada"));
  }

  tarefas.splice(index, 1);
  res.status(204).send();
});

// usando router de tarefas
app.use('/tarefas', router);

// middleware de erro (sempre no final)
app.use((err, req, res, next) => {
  res.status(400).json({ erro: err.message });
});

// mostrando porta que está rodando
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// exportando express
module.exports = app;
