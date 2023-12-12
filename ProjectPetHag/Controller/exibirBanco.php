<?php

//Inclui a pagina de conexãoBD.php, no caso a pagina de conexão com o banco de dados
include ("../Connection/conexaoBD.php");

//Codigo SQL para consultar toda a tabela pessoafisica
$sql =  "SELECT * FROM usuario;";

//Variavel para conter o cod SQL ja preparado para realizar a consulta
$stmt = $conexao->prepare($sql);

//Variavel para conter o resultado da execução do codigo SQL ou um possivel erro 
$result = $stmt->execute() or die("Erro na consulta"); //die serve para parar o codigo

//Para cada consulta ele ira criar uma matriz (fetchAll() = Matriz; fetch= Array simples;) com base na variavel $row
echo '
<form action="./deletarUsuario.php" method="POST">
<table border=1>
<thead>

    <th>nome</th>
    <th>sobrenome</th>
    <th>datanascimento</th>
    <th>sexo</th>
    <th>email</th>
    <th>CPF</th>
    <th>celular</th>
    <th>telefone</th>
    <th>cep</th>
    <th>senha</th>
    <th>excluir</th>

    <style>
    thead {
        text-transform: uppercase;
        font-size:20px;
    }
</style>
</thead>';

foreach ($stmt->fetchAll() as $row) {
    //Printa somente os campos desejados do banco de dados
    echo
    '<tbody>' . '<td>' . $row['nome'].'</td>'. '<td>'. $row['sobrenome']. '</td>'. '<td>' . $row['data_nasc'].  '</td>'. '<td>' . $row['sexo']. '</td>'. '<td>' . $row['email'].'</td>'. '<td>'. $row['cpf'] .'</td>'. '<td>' . $row['celular'].'</td>'. '<td>' . $row['telefone']. '</td>'. '<td>' . $row['cep']. '</td>'. '<td>' . $row['senha'] . '<td>'.  '<input type="submit" value="Excluir" name="excluir">' .'</td>';
    '</tbody>';
}

'</table>
</form>';


//Fechar a conexão
$stmt -> closeCursor();
//Limpa a variavel 
$conexao =null;