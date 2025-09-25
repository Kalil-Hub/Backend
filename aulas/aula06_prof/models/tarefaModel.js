const tarefas = [];

const listar = () => {
    return tarefas;
}

const criar = (dados) => {
    const novaTarefa = {
    ...dados,
    id: tarefas.length + 1,
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

const pesquisarId = (id) => {
  const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(id));
  return tarefaEncontrada;
} 

const alterar = (tarefa) => {
  const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(id));
  if (tarefaEncontrada) {
    tarefaEncontrada.nome = req.body.nome;
    tarefaEncontrada.concluida = req.body.concluida;
    return res.json(tarefaEncontrada);
  }
}


module.exports = { criar, listar, pesquisarId };
