const fs = require('fs')


const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
}

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));

}

type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
}

type Usuario = {
    nome: string,
    email: string,
    cpf: string,
    profissao?: string,
    endereco: Endereco | null
}

const cadastrarUsuario = (dados: Usuario): Usuario => {
    const bd = lerArquivo() as Usuario[];
    bd.push(dados)
    escreverArquivo(bd)
    return dados
}

const listarusuarios = (): Usuario[] => {
    return lerArquivo() as Usuario[]
}

const detalharUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];

    const usuario = bd.find((usuario) => {
        return usuario.cpf === cpf
    })

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    return usuario;
}

const atualizarUsuario = (cpf: string, dados: Usuario) => {
    const bd = lerArquivo() as Usuario[];

    const usuario = bd.find((usuario) => {
        return usuario.cpf === cpf
    })

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }


    Object.assign(usuario, dados)// esse método nativo do JS substitui um objeto origem por um objeto destino, o primeiro parâmetro é o o destino e o segundo é a origem.

    console.log(bd);

    escreverArquivo(bd)

    return dados

}


const excluirUsuario = (cpf: string): Usuario => {
    const bd = lerArquivo() as Usuario[];

    const usuario = bd.find((usuario) => {
        return usuario.cpf === cpf
    })

    if (!usuario) {
        throw new Error('Usuário não encontrado');
    }

    const exclusao = bd.filter((usuario) => {
        return usuario.cpf != cpf;
    })

    escreverArquivo(exclusao)

    return usuario;
}


const listarUsuarios = (filtro?: string): Usuario[] => {
    const bd = lerArquivo() as Usuario[];

    const usuario = bd.filter((usuario) => {
        if (filtro) {
            return usuario.profissao === filtro
        }

        return usuario;

    })

    return usuario
}

const rodrigo = {
    nome: 'Rodrigo',
    email: 'rod@rod.com',
    cpf: '123456789',
    endereco: {
        cep: "123456",
        rua: 'A',
        complemento: 'casa3',
        bairro: 'Novo',
        cidade: 'Serra'
    }
};

// const bd = lerArquivo();

//const rodrigo = detalharUsuario('12345679')

// atualizarUsuario('123456789', rodrigo)

// console.log(excluirUsuario('123456789'));
// cadastrarUsuario(rodrigo)

console.log(listarUsuarios());
