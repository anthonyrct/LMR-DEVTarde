
function NParImpar() {
    let numero = parseInt(document.getElementById("nDigitado").value);
    let verificar;
    verificar = parseInt(numero % 2);
    if (verificar == 0) {
        alert("o numero " + numero + " é par");
    } else {
        alert("o numero " + numero + " é impar");
    }
}


function calculador() {
    let Valor1 = parseInt(document.getElementById("nValor1").value);
    let valor2 = parseInt(document.getElementById("nValor2").value);
    let operacao = document.getElementById("pOperacao").value;
    let resultado;
    switch (operacao) {
        case "+": //soma
            resultado = Valor1 + valor2;
            
            break;
           
        case "-": //subtração
            resultado = Valor1 - valor2;
            break;

        case "*": //multiplicação
            resultado = Valor1 + valor2;
            break;

        case "/":
            if (valor2 != 0) {
                resultado = Valor1 / valor2;
            } else {
                alert("Não pode dividir por ZERO")
            }
            break;
        default:
            alert("Selecione Números Validos")
            break;
    }
    alert("O resultado é: " + resultado);
}