import { useContext, useEffect, useState } from "react"
import { PessoasListaStoreContext } from "./pessoas-lista.store"

export default function PessoasFormulario({ id, cancelar }) {

    const [id_, setId_] = useState("")
    const [nome_, setNome_] = useState("")
    const [telefone_, setTelefone_] = useState("")

    const pessoasListaStore = useContext(PessoasListaStoreContext)

    useEffect(() => {
        if (!id || !pessoasListaStore) {
            return
        }
        const pessoa = pessoasListaStore.obter(id)
        if (!pessoa) {
            alert("[id] - nao encontrado")
            return
        }
        setId_(`${pessoa.id}`)
        setNome_(pessoa.nome)
        setTelefone_(pessoa.telefone)
        // eslint-disable-next-line
    }, [id])

    const salvar = () => {
        const pessoa = {}
        pessoa.id = !id_ ? null : parseInt(id_)
        pessoa.nome = nome_
        pessoa.telefone = telefone_
        if (!id_) {
            pessoasListaStore.inserir(pessoa)
        } else {
            pessoasListaStore.editar(pessoa)
        }
        cancelar()
    }

    return (
        <div>
            <h4 className="text-primary ms-2">Pessoa</h4>
            <hr />
            <div className="row g-2">
                <div className="form-group col-12">
                    <label htmlFor="id">ID</label>
                    <input id="id" className="form-control" disabled value={id_} onChange={(e) => setId_(e.currentTarget.value)} />
                </div>
                <div className="form-group col-12">
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" className="form-control" value={nome_} onChange={(e) => setNome_(e.currentTarget.value)} />
                </div>
                <div className="form-group col-12">
                    <label htmlFor="telefone">Telefone</label>
                    <input id="telefone" className="form-control" value={telefone_} onChange={(e) => setTelefone_(e.currentTarget.value)} />
                </div>
            </div>
            <div className="row g-2 mt-2">
                <div className="col-6">
                    <button className="btn btn-secondary w-100" onClick={() => cancelar()}>Cancelar</button>
                </div>
                <div className="col-6">
                    <button className="btn btn-primary w-100" onClick={() => salvar()}>Salvar</button>
                </div>
            </div>
        </div>
    )
}