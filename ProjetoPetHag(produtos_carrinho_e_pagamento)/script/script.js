function mostrarProdutos() {
    document.getElementById('produtos').style.display = 'block';
    document.getElementById('carrinho').style.display = 'none';
    document.getElementById('pagamento').style.display = 'none';
}

function mostrarCarrinho() {
    document.getElementById('produtos').style.display = 'none';
    document.getElementById('carrinho').style.display = 'block';
    document.getElementById('pagamento').style.display = 'none';
}

function mostrarPagamento() {
    document.getElementById('produtos').style.display = 'none';
    document.getElementById('carrinho').style.display = 'none';
    document.getElementById('pagamento').style.display = 'block';
}

function adicionarAoCarrinho(nome, preco) {
    const carrinhoLista = document.getElementById('carrinhoLista');
    const carrinhoTotal = document.getElementById('carrinhoTotal');

    const novoItem = document.createElement('li');
    novoItem.textContent = `${nome} - R$ ${preco.toFixed(2)}`;
    carrinhoLista.appendChild(novoItem);

    // Atualizar o total
    const totalAtual = parseFloat(carrinhoTotal.textContent);
    carrinhoTotal.textContent = (totalAtual + preco).toFixed(2);
}
