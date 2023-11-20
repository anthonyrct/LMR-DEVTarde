// Dados de exemplo para produtos
const produtos = [
    { nome: 'Produto 1', preco: 19.99, imagem: './imagens/ração1.jpg', descricao: 'Ração 1' },
    { nome: 'Produto 2', preco: 29.99, imagem: 'caminho-para-imagem-2.jpg', descricao: 'Descrição do Produto 2' }
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
            ${produto.nome} - R$ ${produto.preco.toFixed(2)}
            <p>${produto.descricao}</p>
            <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">Adicionar ao Carrinho</button>
        `;
        produtosLista.appendChild(item);
    });
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
        listItem.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        carrinhoLista.appendChild(listItem);
    });

    // Atualizar o total
    const carrinhoTotal = document.getElementById('carrinhoTotal');
    carrinhoTotal.textContent = calcularTotal().toFixed(2);

    // Exibir a seção de carrinho
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
    alert('Compra finalizada! Redirecionando para a página de agradecimento...');
    // Adicione aqui a lógica para o pagamento
}

// Exibir produtos ao carregar a página
window.onload = () => {
    exibirProdutos();
    mostrarProdutos(); // Inicialmente, mostra a seção de produtos
};
