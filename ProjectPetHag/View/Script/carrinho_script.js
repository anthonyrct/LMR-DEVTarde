let carrinho = [];

function exibirCarrinho() {
    const itens_carrinho = document.getElementById('itens-carrinho');
    itens_carrinho.innerHTML = '';
    carrinho.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" width="50" height="50">
            <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
        `;
        carrinhoLista.appendChild(listItem);
    });
}

function calcularTotal() {
    return carrinho.reduce((total, item) => total + item.preco, 0);
}
//atualiza o total da compra
const carrinhoTotal = document.getElementById('carrinhoTotal');
carrinhoTotal.textContent = calcularTotal().toFixed(2);
document.addEventListener("DOMContentLoaded", function () {
    var quantidadeInput = document.getElementById("itens-carrinho");
    var btnMais = document.getElementById("btn-mais");
    var btnMenos = document.getElementById("btn-menos");
    var btnDeletar = document.getElementById("btn-deletar");

    btnMais.addEventListener("click", function () {
        quantidadeInput.value = parseInt(quantidadeInput.value) + 1;
        atualizarTotal();
    });

    btnMenos.addEventListener("click", function () {
        if (parseInt(quantidadeInput.value) > 1) {
            quantidadeInput.value = parseInt(quantidadeInput.value) - 1;
            atualizarTotal();
        }
    });
})