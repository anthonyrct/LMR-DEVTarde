<?php
/* //Iniciando a sessao
session_start(); */

if (isset($_POST['submit'])) {
    //Incluindo a conexão com o banco de dados

    include("../Connection/conexaoBD.php");

    $sql = "INSERT INTO usuario (idusu, nome, sobrenome, data_nasc, sexo, email, cpf, cnpj, celular, telefone, cep, senha) VALUES (null, :nome, :sobrenome, :data_nasc, :sexo, :email, :cpf, :cnpj, :celular, :telefone, :cep, :senha)";

    //Inserir dados no banco

    if (isset($_POST['nome']) && isset($_POST['nome'])) {

        $nome = $_POST['nome'];
        $sobreNome = $_POST['sobreNome'];
        $datnasc = $_POST['datnasc'];
        $sexo = $_POST['sexo'];
        $email = $_POST['email'];
        $cpf = $_POST['cpf'];
        $cnpj = null;
        $celular = $_POST['celular'];
        $telefone = $_POST['telefone'];
        $cep = $_POST['cep'];
        //Usando hash para armazenar e criotgrafar a senha
        $hash_armazena = password_hash($_POST['senha'], PASSWORD_BCRYPT);
        
        //Null porque o valor já é auto incremento
        $stmt = $conexao->prepare($sql);
        $stmt->bindValue(':nome', $nome);
        $stmt->bindValue(':sobrenome', $sobreNome);
        $stmt->bindValue(':data_nasc', $datnasc);
        $stmt->bindValue(':sexo', $sexo);
        $stmt->bindValue(':email', $email);
        $stmt->bindValue(':cpf', $cpf);
        $stmt->bindValue(':cnpj', $cnpj);
        $stmt->bindValue(':celular', $celular);
        $stmt->bindValue(':telefone', $telefone);
        $stmt->bindValue(':cep', $cep);
        $stmt->bindValue(':senha', $hash_armazena);
        
        $stmt->execute(); //Executar o codigo
        echo "inserido com sucesso";

        header("Location: ../View/login.php");
    } else {
        echo "<br> Implementar novos dados falhou";
    }


    //Fechar a conexão 
    $conexao = null;
}
