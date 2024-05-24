import { createContext, useContext } from "react"
import { LoadingContext } from "../../components/loading/loading"

export const PessoasListaStoreContext = createContext()

export default function PessoasListaStore({ children }) {

    const loading = useContext(LoadingContext)

    const persistir = (pessoas) => {
        loading.plus()
        const chave = "pessoas"
        sessionStorage.setItem(chave, JSON.stringify(pessoas))
        loading.minus()
    }

    const recuperar = () => {
        loading.plus()
        const chave = "pessoas"
        const json = sessionStorage.getItem(chave)
        if (!json) {
            persistir({
                id: 1,
                items: [],
            })
            return recuperar()
        }
        const retorno = JSON.parse(json)
        loading.minus()
        return retorno
    }

    const listar = () => {
        return recuperar().items
    }

    const obter = (id) => {
        const items = listar()
        return items.find(x => x.id === id) || null
    }

    const inserir = (pessoa) => {
        const pessoas = recuperar()
        pessoa.id = pessoas.id
        pessoas.id++
        pessoas.items.push(pessoa)
        persistir(pessoas)
        return pessoa.id
    }

    const editar = (pessoa) => {
        const pessoas = recuperar()
        pessoas.items = pessoas.items.map(x => {
            if (x.id === pessoa.id) {
                return pessoa
            }
            return x
        })
        persistir(pessoas)
    }

    const deletar = (id) => {
        const pessoas = recuperar()
        pessoas.items = pessoas.items.filter(x => x.id !== id)
        persistir(pessoas)
    }

    const mockar = () => {
        sessionStorage.clear()
        for (let index = 1; index <= 9; index++) {
            const pessoa = {
                id: null,
                nome: `Pessoa ${index}`,
                telefone: `(${index}${index}) ${index}${index}${index}${index}${index}-${index}${index}${index}${index}`
            }
            inserir(pessoa)
        }
    }

    return (
        <PessoasListaStoreContext.Provider value={{ listar, obter, inserir, editar, deletar, mockar }}>
            {children}
        </PessoasListaStoreContext.Provider>
    )
}