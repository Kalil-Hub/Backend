const tarefaModel = require("../models/tarefaModel");

const listar = (req, res) => {
  const resultado = tarefaModel.listar();
  res.json(resultado);
};

const buscarPeloId = (req, res) => {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.pesquisarId(tarefaId);
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: "Tarefa não encontrada" });
  }
};

const criar = (req, res) => {
  const dados = req.body;
  const resultado = tarefaModel.criar(dados);
  res.status(201).json(resultado); // retorna a tarefa completa
};

const atualizar = (req, res) => {
  const { tarefaId } = req.params;
  const dados = { ...req.body, id: tarefaId };
  const resultado = tarefaModel.alterar(dados);
  if (resultado) {
    res.json(resultado); // retorna a tarefa atualizada
  } else {
    res.status(404).json({ msg: "Tarefa não encontrada" });
  }
};

const remover = (req, res) => {
  const { tarefaId } = req.params;
  const resultado = tarefaModel.excluir(tarefaId);
  if (resultado) {
    res.status(204).json({});
  } else {
    res.status(404).json({ msg: "Tarefa não encontrada" });
  }
};

module.exports = { listar, buscarPeloId, criar, atualizar, remover };
