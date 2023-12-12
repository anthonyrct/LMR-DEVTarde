<?php

//Definindo as variaveis para conexão com o banco de dados

$servername = "127.0.0.1;port=3306"; //O nome do servidor
/* 
$servername = "127.0.0.1;port=3307"; //O nome do servidor
 */
$user = "root"; //O nome do usuario do banco de dados
$dbName = 'pethagdboficial'; //O nome do meu banco de dados
$password = ""; //Senha do db


//Criando uma conexão do MySQL com o PHP
try {
    $conexao = new PDO("mysql:host=$servername;dbname=$dbName", $user, $password);
    //Definindo o mode de eroo
    $conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Descreve o erro da conexão, não recomendado para a produção.
    
    echo '<script>console.log("Conexão realizada com sucesso!")</script>';


} catch (PDOException $e) {
    //Mostrar caso aja falha 
    echo "Erro: " . $e->getMessage();   
}