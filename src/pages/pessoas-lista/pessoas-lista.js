import { useEffect, useState } from "react"
import "./pessoas-lista.css"
import * as pessoasListaStore from "./pessoas-lista.store"
import Modal from "../../components/modal/modal"
import PessoasFormulario from "./pessoas-formulario"

export default function PessoasLista() {

    // cria a variavel pessoas que atualiza a tela sempre que é alterada
    // a lista vazia dentro do useState serve pra dizer que ela abre a tela com esse valor
    const [pessoas, setPessoas] = useState([])
    // se nulo cria nova pessoa, caso contrario edita a pessoa ao abrir o formulario
    const [pessoaId, setPessoaId] = useState(null)
    // controla se o formulario esta aberto ou fechado
    const [openForm, setOpenForm] = useState(false)

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
        // indica que deve editar a pessoa
        setPessoaId(id)
        // abre o formulario
        setOpenForm(true)
    }

    const inserir = () => {
        // indica que deve inserir uma pessoa
        setPessoaId(null)
        // abre o formulario
        setOpenForm(true)
    }

    const cancelar = () => {
        // limpa a pessoa
        setPessoaId(null)
        // fecha o formulario
        setOpenForm(false)
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
            <Modal>
                {
                    openForm &&
                    (
                        <PessoasFormulario id={pessoaId} cancelar={cancelar} />
                    )
                }
            </Modal>
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
        <li className="my-1" key={pessoa.id}>
            <button className="btn btn-danger" onClick={() => excluir(pessoa.id)}>excluir</button>
            <button className="btn btn-warning mx-2" onClick={() => editar(pessoa.id)}>editar</button>
            {pessoa.nome} | {pessoa.telefone}
        </li>
    )
}