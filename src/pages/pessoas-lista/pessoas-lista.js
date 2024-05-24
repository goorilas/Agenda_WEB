import { useCallback, useContext, useEffect, useState } from "react"
import Modal from "../../components/modal/modal"
import PessoasFormulario from "./pessoas-formulario"
import "./pessoas-lista.css"
import { PessoasListaStoreContext } from "./pessoas-lista.store"

export default function PessoasLista() {

    const pessoasListaStore = useContext(PessoasListaStoreContext)
    
    const [pessoas, setPessoas] = useState([])
    const [pessoaId, setPessoaId] = useState(null)
    const [openForm, setOpenForm] = useState(false)

    const atualizar = useCallback(() => {
        const lista = pessoasListaStore.listar()
        setPessoas(lista)
    }, [pessoasListaStore])
    
    useEffect(() => {
        if (!pessoasListaStore) {
            return
        }
        pessoasListaStore.mockar()
        atualizar()
    }, [pessoasListaStore, atualizar])

    const excluir = (id) => {
        pessoasListaStore.deletar(id)
        atualizar()
    }

    const editar = (id) => {
        setPessoaId(id)
        setOpenForm(true)
    }

    const inserir = () => {
        setPessoaId(null)
        setOpenForm(true)
    }

    const cancelar = () => {
        setPessoaId(null)
        setOpenForm(false)
        atualizar()
    }

    return (
        <div>
            <h1 className="text-primary ms-2">Agenda</h1>
            <hr />
            <button className="btn btn-primary ms-2" onClick={() => inserir()}>Inserir</button>
            <hr />
            <ul>
                {pessoas.map(pessoa => ItemPessoas({ pessoa, excluir, editar }))}
            </ul>
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

function ItemPessoas({ pessoa, excluir, editar }) {
    return (
        <li className="my-1" key={pessoa.id}>
            <button className="btn btn-danger" onClick={() => excluir(pessoa.id)}>excluir</button>
            <button className="btn btn-warning mx-2" onClick={() => editar(pessoa.id)}>editar</button>
            {pessoa.nome} | {pessoa.telefone}
        </li>
    )
}