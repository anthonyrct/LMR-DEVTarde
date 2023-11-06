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

const preencheDadosDasPizzas = (pizzaItem, item, index) => {
    // aula 05
    // setar um atributo para identificar qual elemento foi clicado
    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.item-imagem img').src = item.img
    pizzaItem.querySelector('.items-preco').innerHTML = formatoReal(item.price[2])
    pizzaItem.querySelector('.item nome ').innerHTML = item.name
    pizzaItem.querySelector('.item-descricao').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.item-grande').src = item.img
    seleciona('.item-imformacao h1').innerHTML = item.name
    seleciona('.descricao-da-informacao-do-item').innerHTML = item.description
    seleciona('.item-informacao-preco-atual').innerHTML = formatoReal(item.price[2])
}

// aula 05
const pegarKey = (e) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .pizza-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    console.log('item clicado ' + key)
    console.log(pizzaJson[key])

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
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    selecionaTodos('.item-informacao-tamanho').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.pizzaInfo--size.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            seleciona('.item-informacao-preco-atual').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
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
        // qual pizza? pegue o modalKey para usar pizzaJson[modalKey]
        console.log("item " + modalKey)
        // tamanho
        let size = seleciona('.item-informacao-tamanho-dois').getAttribute('data-key')
        console.log("Tamanho " + size)
        // quantidade
        console.log("Quant. " + quantItems)
        // preco
        let price = seleciona('.item-informacao-preco-atual').innerHTML.replace('R$&nbsp;', '')

        // crie um identificador que junte id e tamanho
        // concatene as duas informacoes separadas por um símbolo, vc escolhe
        let identificador = pizzaJson[modalKey].id + 't' + size

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let key = cart.findIndex((item) => item.identificador == identificador)
        console.log(key)

        if (key > -1) {
            // se encontrar aumente a quantidade
            cart[key].qt += quantItems
        } else {
            // adicionar objeto pizza no carrinho
            let pizza = {
                identificador,
                id: pizzaJson[modalKey].id,
                size, // size: size
                qt: quantPizzas,
                price: parseFloat(price) // price: price
            }
            cart.push(pizza)
            console.log(pizza)
            console.log('Sub total R$ ' + (pizza.qt * pizza.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if (cart.length > 0) {
        // mostrar o carrinho
        seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.icone-carrinho').addEventListener('click', () => {
        if (cart.length > 0) {
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
    seleciona('.icone-carrinho span').innerHTML = cart.length

    // mostrar ou nao o carrinho
    if (cart.length > 0) {

        // mostrar o carrinho
        seleciona('aside').classList.add('show')

        // zerar meu .cart para nao fazer insercoes duplicadas
        seleciona('.carrinho').innerHTML = ''

        // crie as variaveis antes do for
        let subtotal = 0
        let desconto = 0
        let total = 0

        // para preencher os itens do carrinho, calcular subtotal
        for (let i in cart) {
            // use o find para pegar o item por id
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            console.log(pizzaItem)

            // em cada item pegar o subtotal
            subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

            // fazer o clone, exibir na telas e depois preencher as informacoes
            let cartItem = seleciona('.modelos-items .items-carrinho').cloneNode(true)
            seleciona('.carrinho').append(cartItem)

            let pizzaSizeName = cart[i].size

            let pizzaName = `${itemNome.name} (${pizzaSizeName})`

            // preencher as informacoes
            cartItem.querySelector('img').src = itemNome.img
            cartItem.querySelector('.item-carrinho-nome').innerHTML = itemNome
            cartItem.querySelector('.carrinho-item-quantidade-area').innerHTML = cart[i].qt

            // selecionar botoes + e -
            cartItem.querySelector('.carrinho-botao-mais').addEventListener('click', () => {
                console.log('Clicou no botão mais')
                // adicionar apenas a quantidade que esta neste contexto
                cart[i].qt++
                // atualizar a quantidade
                atualizarCarrinho()
            })

            cartItem.querySelector('.carrinho-botao-menos').addEventListener('click', () => {
                console.log('Clicou no botão menos')
                if (cart[i].qt > 1) {
                    // subtrair apenas a quantidade que esta neste contexto
                    cart[i].qt--
                } else {
                    // remover se for zero
                    cart.splice(i, 1)
                }

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

                // atualizar a quantidade
                atualizarCarrinho()
            })

            seleciona('.carrinho').append(cartItem)

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

// MAPEAR pizzaJson para gerar lista de pizzas
pizzaJson.map((item, index) => {
    //console.log(item)
    let pizzaItem = document.querySelector('.modelos-items .items').cloneNode(true)
    //console.log(pizzaItem)
    //document.querySelector('.pizza-area').append(pizzaItem)
    seleciona('.area-produtos').append(pizzaItem)

    // preencher os dados de cada pizza
    preencheDadosDasPizzas(pizzaItem, item, index)

    // pizza clicada
    pizzaItem.querySelector('.items a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na pizza')

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

}) // fim do MAPEAR pizzaJson para gerar lista de pizzas

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
