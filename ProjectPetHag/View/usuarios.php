<?php require_once "../Controller/functions.php";

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exibir Usuarios</title>
</head>

<body>


    <h1>Usuarios na tabela </h1>

    <form action="./deletarUsuario.php" method="POST">
        <table border=1>
            <thead>

                <th>nome</th>
                <th>sobrenome</th>
                <th>datanascimento</th>
                <th>sexo</th>
                <th>email</th>
                <th>CPF</th>
                <th>CNPJ</th>
                <th>celular</th>
                <th>telefone</th>
                <th>cep</th>
                <th>senha</th>
                <th>excluir</th>

                <?php
                $tabela = "usuario";
                $users = buscarAll($conexao, $tabela);

                if (isset($_GET['idusu'])) {
                    echo '<div class="conferir"> <h2>Deseja realmente deletar o usuario"</h2>'
                ?>
                    <form action="" method="post">
                        <input type="hidden" name="idusu" value="<?php echo $_GET['idusu'] ?>">
                        <input type="submit" value="Deletar" name="deletarusu">
                    </form>
                <?php } ?>
                <?php
                if (isset($_POST['deletarusu'])) {
                    deletarUsu($conexao, "usuario", "idusu", $_POST['idusu']);
                }
                ?>
                <style>
                    thead {
                        text-transform: uppercase;
                        font-size: 20px;
                    }
                </style>
            </thead>
            <a type="button" id="login" name="login" href="../View/login.php">Login</a>
            <br>
            <tbody>
                <?php
                foreach ($users as $row) : ?>
                    <tr>
                        <td> <?php echo $row['nome']; ?></td>
                        <td> <?php echo $row['sobrenome']; ?></td>
                        <td> <?php echo $row['data_nasc']; ?> </td>
                        <td> <?php echo $row['sexo']; ?></td>
                        <td> <?php echo $row['email']; ?></td>
                        <td> <?php echo $row['cpf']; ?></td>
                        <td> <?php echo $row['cnpj']; ?></td>
                        <td> <?php echo $row['celular']; ?></td>
                        <td> <?php echo $row['telefone']; ?></td>
                        <td> <?php echo $row['cep']; ?></td>
                        <td> <?php echo $row['senha']; ?></td>
                        <td> <a href="./usuarios.php?idusu=<?php echo $row['idusu']; ?>">Excluir</a></td>;
                    </tr>
                <?php endforeach; ?>
            </tbody>
</body>

</html>