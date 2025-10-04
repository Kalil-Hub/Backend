const tarefas = [];

const listar = () => {
  return tarefas;
};

const criar = (dados) => {
  const novaTarefa = {
    ...dados,
    id: tarefas.length + 1,
  };
  tarefas.push(novaTarefa);
  return novaTarefa; // retorna a tarefa completa
};

const pesquisarId = (id) => {
  return tarefas.find((item) => item.id === parseInt(id));
};

const alterar = (tarefa) => {
  const tarefaEncontrada = tarefas.find((item) => item.id === parseInt(tarefa.id));
  if (tarefaEncontrada) {
    tarefaEncontrada.nome = tarefa.nome;
    tarefaEncontrada.concluida = tarefa.concluida;
    return tarefaEncontrada; // devolve a tarefa atualizada
  }
  return null;
};

const excluir = (id) => {
  const posicao = tarefas.findIndex((item) => item.id === parseInt(id));
  if (posicao >= 0) {
    const removida = tarefas[posicao];
    tarefas.splice(posicao, 1);
    return removida; // devolve a tarefa removida
  }
  return null;
};

module.exports = { criar, listar, pesquisarId, alterar, excluir };
