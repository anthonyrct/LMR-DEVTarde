<?php

session_start();

include ("../Connection/conexaoBD.php");

$sql = "DELETE FROM usuario WHERE idusu=':id";

$id = (int)$_POST['excluir'];

if(isset($_POST['excluir'])){
    
    $stmt = $conexao->prepare($sql);

    $stmt->bindValue(':id', $id);
    echo $id;
    $stmt->execute();
    echo "DELETADO COM SUCESSO";
} else {
    echo  "ERRO";   
}