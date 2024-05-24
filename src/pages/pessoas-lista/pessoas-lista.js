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
            <header>
                <div className="navbar bg-primary text-white">
                    <div className="container d-flex align-items-center gap-1">
                        <h1>
                            <span>AGENDA</span>
                        </h1>
                        <button className="btn btn-primary ms-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>


            <div>
                <div className="container d-flex align-items-center gap-1">
                    <div className="row gap-1">
                        <div className="col-12">
                            <h4>
                                <strong><span className="text-primary">Pessoas</span></strong>
                            </h4>
                        </div>
                        <hr className="border-primary container" />
                        <button className="btn btn-success ms-2 containder-flex col-2 mb-3" onClick={() => inserir()}>Inserir</button>
                        <hr className="border-primary container" />
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
                        <hr className="border-primary container d-flex" />
                    </div>
                </div>
            </div>

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