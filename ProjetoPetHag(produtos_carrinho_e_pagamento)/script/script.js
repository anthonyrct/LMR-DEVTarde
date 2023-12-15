// Dados de exemplo para produtos
const produtos = [
    { nome: 'Produto 1', preco: 19.99, imagem: './imagens/ração1.jpg', descricao: 'descricao do prduto 1' },
    { nome: 'Produto 2', preco: 29.99, imagem: './imagens/ração2.jpg', descricao: 'Descrição do Produto 2' },
    { nome: 'Produto 3', preco: 19.99, imagem: './imagens/petisco1.jpg', descricao: 'descricao do prduto 3' },
    { nome: 'Produto 4', preco: 19.99, imagem: './imagens/sache1.jpg', descricao: 'descricao do produto 4' },
    { nome: 'Produto 5', preco: 29.99, imagem: './imagens/coleira1.jpg', descricao: 'Descrição do Produto 5' },
    { nome: 'produto 6', preco: 19.99, imagem: './imagens/coleira2.jpg', descricao: 'descricao do prduto 6' },
    { nome: 'Produto 7', preco: 19.99, imagem: './imagens/coleira3.jpg', descricao: 'descricao do prduto 7' },
    { nome: 'Produto 8', preco: 29.99, imagem: './imagens/shampoo2.jpg', descricao: 'descricao do prduto 8' },
    { nome: 'produto 9', preco: 19.99, imagem: './imagens/brinquedo1.jpg', descricao: 'descricao do prduto 9' },
    { nome: 'Produto 10', preco: 19.99, imagem: './imagens/brinquedo2.jpg', descricao: 'descricao do prduto 10' },
    { nome: 'Produto 11', preco: 29.99, imagem: './imagens/brinquedo3.jpg', descricao: 'descricao do prduto 11' },
    { nome: 'produto 12', preco: 19.99, imagem: './imagens/brinquedo4.jpg', descricao: 'descricao do prduto 12' },
    { nome: 'Produto 13', preco: 19.99, imagem: './imagens/pente1.jpg', descricao: 'descricao do prduto 13 ' },
    { nome: 'Produto 14', preco: 29.99, imagem: './imagens/pente2.jpg', descricao: 'Descrição do Produto 14' },
    { nome: 'produto 15', preco: 19.99, imagem: './imagens/escova1.jpg', descricao: 'descricao do prduto 15' },
    { nome: 'Produto 16', preco: 19.99, imagem: './imagens/escova2.jpg', descricao: 'descricao do prduto 16' },
    { nome: 'Produto 17', preco: 29.99, imagem: './imagens/pote1.jpg', descricao: 'Descrição do Produto 17' },
    { nome: 'produto 18', preco: 19.99, imagem: './imagens/pote2.jpg', descricao: 'descricao do prduto 18' },
    { nome: 'Produto 19', preco: 19.99, imagem: './imagens/pote3.jpg', descricao: 'descricao do prduto 19' },
    { nome: 'Produto 20', preco: 29.99, imagem: './imagens/pote4.jpg', descricao: 'Descrição do Produto 20' },
    { nome: 'produto 21', preco: 19.99, imagem: './imagens/ração1.jpg', descricao: 'descricao do prduto 21' },
    { nome: 'Produto 22', preco: 19.99, imagem: './imagens/ração1.jpg', descricao: 'descricao do prduto 22' },
    { nome: 'Produto 23', preco: 29.99, imagem: './imagens/ração1.jpg', descricao: 'Descrição do Produto 23' },
    { nome: 'produto 24', preco: 19.99, imagem: './imagens/ração1.jpg', descricao: 'descricao do prduto 24' },
    // Adicione mais produtos conforme necessário
];

let carrinho = [];

function exibirProdutos() {
    const produtosLista = document.getElementById('produtosLista');
    produtosLista.innerHTML = '';

    produtos.forEach(produto => {
        const item = document.createElement('li');
        item.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" width="50" height="50">
            <p>${produto.nome}</p>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <p>${produto.descricao}</p>
            <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">Adicionar ao Carrinho</button>
        `;
        produtosLista.appendChild(item);
    });
}


function mostrarInfoPix() {
    const infoPix = document.getElementById('infoPix');
    const pixRadio = document.querySelector('input[name="formaPagamento"][value="pix"]');

    if (pixRadio.checked) {
        infoPix.style.display = 'block';
    } else {
        infoPix.style.display = 'none';
    }
} function mostrarOpcoesCartao() {
    const opcoesCartao = document.getElementById('opcoesCartao');
    const pagamentoLista = document.getElementById('pagamentoLista');
    const cartaoRadio = document.querySelector('input[name="formaPagamento"][value="cartao"]');

    if (cartaoRadio.checked) {
        opcoesCartao.style.display = 'block';
        mostrarSenhaCartao();
    } else {
        opcoesCartao.style.display = 'none';
    }
}

function mostrarSenhaCartao() {
    const senhaCartaoInput = document.querySelector('input[name="senhaCartao"]');
    senhaCartaoInput.style.display = 'block';
}

function exibirItensPagamento() {
    const pagamentoLista = document.getElementById('pagamentoLista');
    pagamentoLista.innerHTML = '';

    // Adapte o código conforme necessário para exibir os itens de pagamento
    // por exemplo, exibindo informações sobre o método de pagamento selecionado.
}


function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });

    // Atualizar o carrinho na interface
    exibirCarrinho();
}

function exibirCarrinho() {
    const carrinhoLista = document.getElementById('carrinhoLista');
    carrinhoLista.innerHTML = '';
    carrinho.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" width="50" height="50">
            <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
        `;
        carrinhoLista.appendChild(listItem);
    });
    // Atualiza o total
    const carrinhoTotal = document.getElementById('carrinhoTotal');
    carrinhoTotal.textContent = calcularTotal().toFixed(2);

    // Exibi a seção de carrinho
    mostrarCarrinho();
}

function mostrarProdutos() {
    document.getElementById('produtos').style.display = 'block';
    document.getElementById('carrinho').style.display = 'none';
    document.getElementById('pagamento').style.display = 'none';

    // Adicione a transição de cor de fundo
    document.body.style.backgroundColor = '#f9f9f9';
    // Adicione a transição de margem no contêiner
    document.querySelector('.container').style.margin = '20px';
}

function mostrarCarrinho() {
    document.getElementById('produtos').style.display = 'none';
    document.getElementById('carrinho').style.display = 'block';
    document.getElementById('pagamento').style.display = 'none';

    // Adicione a transição de cor de fundo
    document.body.style.backgroundColor = '#fff';
    // Adicione a transição de margem no contêiner
    document.querySelector('.container').style.margin = '40px';
}

function mostrarPagamento() {
    document.getElementById('produtos').style.display = 'none';
    document.getElementById('carrinho').style.display = 'none';
    document.getElementById('pagamento').style.display = 'block';

    // Adicione a transição de cor de fundo
    document.body.style.backgroundColor = '#ecf0f1';
    // Adicione a transição de margem no contêiner
    document.querySelector('.container').style.margin = '20px';

    // Exibir tela de carregamento
    mostrarCarregamento();

    // Simular um atraso para o processo de pagamento
    setTimeout(function () {
        // Ocultar tela de carregamento após o processo de finalização
        ocultarCarregamento();
    }, 2000); // Tempo de simulação: 2 segundos (substitua pelo tempo real necessário)
}

function mostrarCarregamento() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';
}

function ocultarCarregamento() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function calcularTotal() {
    return carrinho.reduce((total, item) => total + item.preco, 0);
}

function finalizarCompra() {
    // Ocultar ícone de carrinho
    const iconeCarrinho = document.getElementById('iconeCarrinho');
    iconeCarrinho.style.display = 'none';

    alert('Compra finalizada! Redirecionando para a página de agradecimento...');

}
function voltarPagina() {
    window.history.length > 1 ? window.history.go(-1) : window.location.href = 'index.html';
}

function adicionarAoCarrinho(nome, preco) {
    const quantidade = parseInt(prompt(`Quantidade desejada de ${nome}:`, 1)) || 1;

    for (let i = 0; i < quantidade; i++) {
        carrinho.push({ nome, preco });
    }
    // Exibir ícone de carrinho
    const iconeCarrinho = document.getElementById('iconeCarrinho');
    iconeCarrinho.style.display = 'inline';
    // Atualiza o carrinho na interface
    exibirCarrinho();
}
function irParaCarrinho() {
    mostrarCarrinho();
}
function cancelarCompra() {
    const confirmacao = confirm('Tem certeza que deseja cancelar a compra? Todos os itens no carrinho serão removidos.');

    if (confirmacao) {
        // Limpa o carrinho
        carrinho = [];

        // Atualiza o carrinho na interface
        exibirCarrinho();

        // Mostra novamente a seção de produtos
        mostrarProdutos();
    }
}
// Exibi os produtos ao carregar a página
window.onload = () => {
    exibirProdutos();
    mostrarProdutos(); // Inicialmente, mostra a seção de produtos
};