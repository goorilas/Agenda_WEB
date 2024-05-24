function persistir(pessoas) {
    const chave = "pessoas"
    sessionStorage.setItem(chave, JSON.stringify(pessoas))
}

function recuperar() {
    const chave = "pessoas"
    const json = sessionStorage.getItem(chave)
    if (!json) {
        persistir({
            id: 1,
            items: [],
        })
        return recuperar()
    }
    return JSON.parse(json)
}

export function listar() {
    return recuperar().items
}

export function obter(id) {
    const items = listar()
    return items.find(x => x.id === id) || null
}

export function inserir(pessoa) {
    const pessoas = recuperar()
    pessoa.id = pessoas.id
    pessoas.id++
    pessoas.items.push(pessoa)
    persistir(pessoas)
    return pessoa.id
}

export function editar(pessoa) {
    const pessoas = recuperar()
    pessoas.items = pessoas.items.map(x => {
        if (x.id === pessoa.id) {
            return pessoa
        }
        return x
    })
    persistir(pessoas)
}

export function deletar(id) {
    const pessoas = recuperar()
    pessoas.items = pessoas.items.filter(x => x.id !== id)
    persistir(pessoas)
}

export function mockar() {
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