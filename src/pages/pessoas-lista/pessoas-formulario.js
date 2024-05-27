import { useContext, useEffect, useState } from "react"
import { PessoasListaStoreContext } from "./pessoas-lista.store"
import React from 'react';
import { IMaskInput } from 'react-imask';


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
        if (!nome_ || nome_.trim() === '') {
            alert("Por favor, preencha o campo de (Nome).");
            return;
        }
        if (!telefone_ || telefone_.trim() === '') {
            alert("Por favor, preencha o campo de (Telefone).");
            return;
        }
    
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
                    <label htmlFor="telefone2">Telefone2</label>
                    <IMaskInput
                        id="telefone2"
                        className="form-control"
                        mask="(00) 00000-0000"
                        placeholder="(00) 00000-0000"
                        value={telefone_}
                        onInput={(e) => setTelefone_(e.currentTarget.value)}
                    />
                </div>
                <div className="form-group col-12">
                    <label htmlFor="telefone">Telefone</label>
                    <input id="telefone" className="form-control" value={formatarTelefone(telefone_)} onChange={(e) => setTelefone_(e.currentTarget.value)} />
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


function formatarTelefone(texto) {
    // retira tudo que nao é numero
    let numeros = texto.replace(/[^0-9]/g, "")
    // se tiver mais de 11 digitos apaga o excesso
    if(numeros.length > 11) {
        numeros = numeros.substring(0, 11)
    }
    // se tiver menos de 10 digitos preenche com underline 
    if(numeros.length < 10) {
        numeros = numeros + "_".repeat(10 - numeros.length) 
    }
    // começando da posicao 0, pega 2 digitos, ex: 1234567890_ ---> 12..34567890_ ---> 12
    const ddd = numeros.substring(0, 2)
    // começando da posicao 2, pega ate faltar 4 digitos, ex: 1234567890_ ---> 12..34567..890_ ---> 34567
    const parte1 = numeros.substring(2, numeros.length - 4)
    // começando da posicao ate faltar 4 digitos, pega tudo, ex: 1234567890_ ---> 1234567..890_ ---> 890_
    const parte2 = numeros.substring(numeros.length - 4)
    // formata o resultado (12) 34567-890_
    const resultado = `(${ddd}) ${parte1}-${parte2}`
    return resultado
}