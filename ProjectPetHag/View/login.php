<?php
require_once "../Controller/functions.php";

if (isset($_POST['enviarLogin'])) {
    logar($conexao);
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>

<body>
    <h1>Faça seu login:</h1>

    <form method="POST">

        <label for="">Usuario ou Email</label>
        <input type="email" name="emailLogin" id="email">

        <label for="">Senha</label>
        <input type="password" name="senhaLogin" id="senha">

        <input type="submit" name="enviarLogin" id="enviar">
    </form>


</body>


</html>