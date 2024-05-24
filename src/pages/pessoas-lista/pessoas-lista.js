import { useEffect, useState } from "react"
import "./pessoas-lista.css"
import * as pessoasListaStore from "./pessoas-lista.store"

export default function PessoasLista() {

    // cria a variavel pessoas que atualiza a tela sempre que é alterada
    // a lista vazia dentro do useState serve pra dizer que ela abre a tela com esse valor
    const [pessoas, setPessoas] = useState([])

    // useEffect é chamado automaticamente assim que a tela abre
    useEffect(() => {
        // salva 9 pessoas no sessionStorage (memoria temporária do seu navegador, reinicia sempre que vc aperta F5)
        pessoasListaStore.mockar()
        // atualiza a lista de pessoas
        atualizar()
    }, [])

    const atualizar = () => {
        // pega a lista de pessoas do sessionStorage
        const lista = pessoasListaStore.listar()
        // deve-se usar setPessoas(lista) ao invés de "pessoas = lista", porque senão a tela não muda
        setPessoas(lista)
    }

    const excluir = (id) => {
        // deleta a pessoa com esse id do sessionStorage
        pessoasListaStore.deletar(id)
        // atualiza a lista de pessoas
        atualizar()
    }

    const editar = (id) => {
        // pega a pessoa com esse id do sessionStorage
        const pessoa = pessoasListaStore.obter(id)
        // exibe um alerta e captura o que o usuario digita
        pessoa.nome = prompt("Digite o nome:", pessoa.nome)
        // exibe um alerta e captura o que o usuario digita
        pessoa.telefone = prompt("Digite o telefone:", pessoa.telefone)
        // salva as alteraçoes da pessoa no sessionStorage
        pessoasListaStore.editar(pessoa)
        // atualiza a lista de pessoas
        atualizar()
    }

    const inserir = () => {
        // cria uma pessoa sem id, pois ele será criado automaticamente pelo store
        const pessoa = {
            id: null,
        }
        // exibe um alerta e captura o que o usuario digita
        pessoa.nome = prompt("Digite o nome:")
        // exibe um alerta e captura o que o usuario digita
        pessoa.telefone = prompt("Digite o telefone:")
        // adiciona a nova pessoa no sessionStorage
        pessoasListaStore.inserir(pessoa)
        // atualiza a lista de pessoas
        atualizar()
    }

    // retorna o html da página
    // codigo javascript é aceito no html dentro de {}
    return (
        <div>
            <h1 className="text-primary ms-2">Lista de pessoas</h1>
            <hr />
            <button className="btn btn-primary ms-2" onClick={() => inserir()}>Inserir</button>
            <hr />
            {TabelaPessoas({ pessoas, excluir, editar })}
        </div>
    )
}

function TabelaPessoas({ pessoas, excluir, editar }) {
    return (
        <ul>
            {pessoas.map(pessoa => ItemPessoas({ pessoa, excluir, editar }))}
        </ul>
    )
}

function ItemPessoas({ pessoa, excluir, editar }) {
    return (
        <li className="my-1">
            <button className="btn btn-danger" onClick={() => excluir(pessoa.id)}>excluir</button>
            <button className="btn btn-warning mx-2" onClick={() => editar(pessoa.id)}>editar</button>
            {pessoa.nome} | {pessoa.telefone}
        </li>
    )
}