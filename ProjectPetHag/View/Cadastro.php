<?php
require_once "../Controller/functions.php";
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../View/Style/Cadastro.css">
    <title>Seu Título</title>
</head>

<body>

    <div class="errosCad">
        <?php
        if (isset($_POST['botao'])) {
            cadastrarUsuar($conexao);
        }
        ?>
    </div>
    <div class="container">

        <div class="Cadastro">

            <h1> Seja Bem-Vindo!</h1>
            <form method="post" action="">

                <label for="nome">Nome:</label>
                <input type="text" name="nome" id="nome" placeholder="Digite seu nome">

                <label for="sobrenome">Sobrenome:</label>
                <input type="text" name="sobreNome" id="sobreNome" placeholder="Digite seu sobrenome">

                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" placeholder="Digite seu e-mail">

                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" placeholder="Digite seu CPF">

                <label for="cpf">Sexo (M ou F):</label>
                <input type="text" id="sexo" name="sexo" placeholder="Digite apenas M ou F">

                <label for="datnasc">Data de Nascimento:</label>
                <input type="date" id="datnasc" name="datnasc">

                <label for="cep">Cep:</label>
                <input type="text" id="cep" name="cep" placeholder="Digite sua cidade">

                <label for="celular">Celular:</label>
                <input type="tel" id="celular" name="celular" placeholder="Digite seu número de telefone">

                <label for="telefone">Telefone (opcional):</label>
                <input type="tel" id="telefone" name="telefone" placeholder="Digite seu número de telefone">

                <label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha" placeholder="Digite sua senha">

                <label for="confirmarsenha">Confirmar senha:</label>
                <input type="password" id="confirSenha" name="confirSenha" placeholder="Digite sua senha">


                <div class="button-wrapper">
                    <a href="Login.html"><button type="button" onclick="window.location.href='Cadastro.html'">Voltar</button></a>
                    <input type="submit" value="Avançar" name="botao" id="botao">
                </div>
            </form>

            


        </div>
        <img class="imgLogo" src="./img/DogCatLogo.png" alt="">
    </div>
</body>

</html>