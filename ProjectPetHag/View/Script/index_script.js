function alternarDivMaior() {
    var divChatGrande = document.getElementById("divChatGrande");

    if (divChatGrande.style.display === "block") {
        fecharDivMaior();
    } else {
        abrirDivMaior();
    }
}

function abrirDivMaior() {
    document.getElementById("divChatGrande").style.display = "block";
}

function fecharDivMaior() {
    document.getElementById("divChatGrande").style.display = "none";
}
