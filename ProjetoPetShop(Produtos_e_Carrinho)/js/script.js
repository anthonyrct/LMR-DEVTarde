// aula 05
// criar a variável modalKey sera global
let modalKey = 0
// variavel para controlar a quantidade inicial de items na modal
let quantItems = 1

let carrinho = [] // carrinho
// /aula 05

// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.item-area-janela').style.opacity = 0 // transparente
    seleciona('.item-area-janela').style.display = 'flex'
    setTimeout(() => seleciona('.item-area-janela').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.item-area-janela').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.item-area-janela').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.item-informacao-cancelarButton, .item-Informacao-botao-cancelar-mobile').forEach((item) => item.addEventListener('click', fecharModal))
}

const preencheDadosDositems = (items, item, index) => {
    // aula 05
    // setar um atributo para identificar qual elemento foi clicado
    items.setAttribute('data-key', index)
    items.querySelector('.item-imagem img').src = item.img
    items.querySelector('.items-preco').innerHTML = formatoReal(item.preco[2])
    items.querySelector('.item nome ').innerHTML = item.name
    items.querySelector('.item-descricao').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.item-grande').src = item.img
    seleciona('.item-imformacao h1').innerHTML = item.name
    seleciona('.descricao-da-informacao-do-item').innerHTML = item.description
    seleciona('.item-informacao-preco-atual').innerHTML = formatoReal(item.preco[2])
}

// aula 05
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .pizza-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.items').getAttribute('data-key')
    console.log('item clicado ' + key)
    console.log(itemJson[key])

    // garantir que a quantidade inicial de pizzas é 1
    quantItems = 1

    // Para manter a informação de qual pizza foi clicada
    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    // tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.item-informacao-tamanho-dois').classList.remove('selected')

    // selecionar todos os tamanhos
    selecionaTodos('.item-informacao-tamanho').forEach((size, sizeIndex) => {
        // selecionar o tamanho grande
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = itemJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.item-informacao-tamanho').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.item-informacao-tamanho-dois').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            seleciona('.item-informacao-preco-atual').innerHTML = formatoReal(itemJson[key].preco[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.item-informacao-quantidade-mais').addEventListener('click', () => {
        quantItems++
        seleciona('.item-infomacao-quantidade-area').innerHTML = quantItems
    })

    seleciona('.item-informacao-quantidade-menos').addEventListener('click', () => {
        if (quantItems > 1) {
            quantItems--
            seleciona('.item-informacao-quantidade-inicial').innerHTML = quantItems
        }
    })
}
// /aula 05

// aula 06
const adicionarNoCarrinho = () => {
    seleciona('.item-informacao-addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

        // pegar dados da janela modal atual
        // qual pizza? pegue o modalKey para usar itemJson[modalKey]
        console.log("item " + modalKey)
        // tamanho
        let tamanho = seleciona('.item-informacao-tamanho-dois').getAttribute('data-key')
        console.log("Tamanho " + tamanho)
        // quantidade
        console.log("Quant. " + quantItems)
        // preco
        let preco = seleciona('.item-informacao-preco-atual').innerHTML.replace('R$&nbsp;', '')

        // crie um identificador que junte id e tamanho
        // concatene as duas informacoes separadas por um símbolo, vc escolhe
        let identificador = itemJson[modalKey].id + 't' + size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = carrinho.findIndex((item) => item.identificador == identificador)
        console.log(key)

        if (key > -1) {
            // se encontrar aumente a quantidade
            carrinho[key].quantidade += quantItems
        } else {
            // adicionar objeto pizza no carrinho
            let item = {
                identificador,
                id: itemJson[modalKey].id,
                tamanho, // size: size
                quantidade: quantItems,
                preco: parseFloat(preco) // preco: preco
            }
            carrinho.push(item)
            console.log(item)
            console.log('Sub total R$ ' + (item.quantidade * item.preco).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + carrinho.length)
    if (carrinho.length > 0) {
        // mostrar o carrinho
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.icone-carrinho').addEventListener('click', () => {
        if (carrinho.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.icone-fechar').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
    seleciona('.icone-carrinho span').innerHTML = carrinho.length

    // mostrar ou nao o carrinho
    if (carrinho.length > 0) {

        // mostrar o carrinho
        seleciona('aside').classList.add('show')

        // zerar meu .cart para nao fazer insercoes duplicadas
        seleciona('.carrinho').innerHTML = ''

        // crie as variaveis antes do for
        let subtotal = 0
        let desconto = 0
        let total = 0

        // para preencher os itens do carrinho, calcular subtotal
        for (let i in carrinho) {
            // use o find para pegar o item por id
            let item = itemJson.find((item) => item.id == carrinho[i].id)
            console.log(item)

            // em cada item pegar o subtotal
            subtotal += carrinho[i].preco * carrinho[i].quantidade
            //console.log(cart[i].preco)

            // fazer o clone, exibir na telas e depois preencher as informacoes
            let carrinhoItems = seleciona('.modelos-items .items-carrinho').cloneNode(true)
            seleciona('.carrinho').append(carrinhoItems)

            let itemTamanhoNome = carrinho[i].size

            let itemNome = `${itemNome.name} (${itemTamanhoNome})`

            // preencher as informacoes
            carrinhoItems.querySelector('img').src = itemNome.img
            carrinhoItems.querySelector('.item-carrinho-nome').innerHTML = itemNome
            carrinhoItems.querySelector('.carrinho-item-quantidade-area').innerHTML = carrinho[i].quantidade

            // selecionar botoes + e -
            carrinhoItems.querySelector('.carrinho-botao-mais').addEventListener('click', () => {
                console.log('Clicou no botão mais')
                // adicionar apenas a quantidade que esta neste contexto
                carrinho[i].quantidade++
                // atualizar a quantidade
                atualizarCarrinho()
            })

            carrinhoItems.querySelector('.carrinho-botao-menos').addEventListener('click', () => {
                console.log('Clicou no botão menos')
                if (carrinho[i].quantidade > 1) {
                    // subtrair apenas a quantidade que esta neste contexto
                    carrinho[i].quantidade--
                } else {
                    // remover se for zero
                    carrinho.splice(i, 1)
                }

                (carrinho.length < 1) ? seleciona('header').style.display = 'flex' : ''

                // atualizar a quantidade
                atualizarCarrinho()
            })

            seleciona('.carrinho').append(carrinhoItems)

        } // fim do for

        // fora do for
        // calcule desconto 10% e total
        //desconto = subtotal * 0.1
        desconto = subtotal * 0
        total = subtotal - desconto

        // exibir na tela os resultados
        // selecionar o ultimo span do elemento
        seleciona('.carrinho-subtotal-de-items span:last-child').innerHTML = formatoReal(subtotal)
        seleciona('.carrinho--total-item-desconto span:last-child').innerHTML = formatoReal(desconto)
        seleciona('.carrinho-total-item-big span:last-child').innerHTML = formatoReal(total)

    } else {
        // ocultar o carrinho
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
    }
}

const finalizarCompra = () => {
    seleciona('.carrinho-finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}

// /aula 06

// MAPEAR itemJson para gerar lista de pizzas
itemJson.map((item, index) => {
    //console.log(item)
    let Items = document.querySelector('.modelos-items .items').cloneNode(true)
    //console.log(pizzaItem)
    //document.querySelector('.pizza-area').append(pizzaItem)
    seleciona('.area-produtos').append(Items)

    // preencher os dados de cada pizza
    preencheDadosDasPizzas(Items, item, index)

    // pizza clicada
    Items.querySelector('.items a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou no item')

        // aula 05
        let chave = pegarKey(e)
        // /aula 05

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        // aula 05
        // pegar tamanho selecionado
        preencherTamanhos(chave)

        // definir quantidade inicial como 1
        seleciona('.item-informacao-quantidade-inicial').innerHTML = quantItems

        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave)
        // /aula 05

    })

    botoesFechar()

}) // fim do MAPEAR itemJson para gerar lista de pizzas

// aula 05
// mudar quantidade com os botoes + e -
mudarQuantidade()
// /aula 05

// aula 06
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
// /aula 06
