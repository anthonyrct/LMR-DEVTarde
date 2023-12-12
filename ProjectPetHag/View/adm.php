<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ADM</title>
    <link rel="stylesheet" href="./Style/adm-style.css">
</head>

<body>
    <div class="containerADM">
        <form class="containerDisplay" method="$_POST">
            <div class="btnEscolha">
                <input type="button" class="Dat" value="DATABASE" id="DATABASE" name="DATABASE" onclick="exibirBanco();">
                <input type="button" class="Usu" value="USUARIOS" id="USUARIOS" name="USUARIOS">
                <input type="button" class="AddProd" value="ADPRODUTOS" id="ADPRODUTOS" name="ADPRODUTOS">
                <input type="button" class="AddCol" value="ADCOLABORADORES" id="ADCOLABORADORES" name="ADCOLABORADORES">
                <input type="button" class="UPCol" value="UPCOLABORADORES" id="UPCOLABORADORES" name="UPCOLABORADORES">
                <input type="button" class="DelCol" value="DELCOLABORADORES" id="DELCOLABORADORES" name="DELCOLABORADORES">
                <input type="button" class="Rel" value="RELATÓRIO" id="RELATÓRIO" name="RELATÓRIO">
            </div>
            <div class="exibirMsg">
<?php 

function exibirBanco(){
    include "../Controller/consulta.php";
}
?>
                <div class="exibirDatabase"></div>
            </div>
        </form>
    </div>
</body>

</html>