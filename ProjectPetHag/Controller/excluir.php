<?php   
session_start();

include('../Connection/conexaoBD.php');

$sql = "DELETE FROM usuario WHERE idusu=':id'";

echo $_GET['exclu'];

if(isset($_GET['exclu'])){
echo $_SESSION['id'];
    if(isset($_POST['submmit'])){

    $stmt = $conexao->prepare($sql);
    $stmt->bindValue(':id',$_SESSION['id']);

    $stmt->execute($_GET['deletar']) or die("Erro na consulta"); //die serve para parar o codigo;

    echo "Exluído com sucesso";
    } 
    else {

    }
} else {
    echo "erro";
}
