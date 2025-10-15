const readline = require("readline-sync")

const controlador = require("./controlador")

function menu() {
    console.log("\n===== MENU =====")
    console.log("1 - Adicionar tarefa")
    console.log("2 - Buscar tarefa")
    console.log("3 - Atualizar tarefa")
    console.log("4 - Remover tarefa")
    console.log("5 - Sair")
}

async function escolherOpcao(opcao) {
    switch (opcao) {
        case "1":
            const nomeAdd = readline.question("Digite o nome da tarefa: ")
            await controlador.adicionarTarefa(nomeAdd)
            console.log("Tarefa adicionada com sucesso!")
            break

        case "2":
            const nomeBuscar = readline.question("Digite o nome da tarefa: ")
            const tarefa = await controlador.buscarTarefa(nomeBuscar)
            if (tarefa && tarefa.id) {
                console.log(`ID: ${tarefa.id}`)
                console.log(`Nome: ${tarefa.nome}`)
                console.log(`Concluída: ${tarefa.concluida}`)
            } else {
                console.log("Tarefa não encontrada.")
            }
            break

        case "3":
            const nomeAtt = readline.question("Digite o nome da tarefa: ")
            const concluidaStr = readline.question("Tarefa concluída? (true/false): ")
            const concluida = concluidaStr.toLowerCase() === "true"
            await controlador.atualizarTarefa(nomeAtt, concluida)
            console.log("Tarefa atualizada com sucesso!")
            break

        case "4":
            const nomeDel = readline.question("Digite o nome da tarefa: ")
            await controlador.removerTarefa(nomeDel)
            console.log("Tarefa removida com sucesso!")
            break

        case "5":
            console.log("Saindo...")
            process.exit(0)
            break

        default:
            console.log("Opção inválida. Tente novamente.")
    }
}

async function main() {
    while (true) {
        menu()
        const opcao = readline.question("Escolha uma opcao: ")
        await escolherOpcao(opcao)
    }
}

main()
