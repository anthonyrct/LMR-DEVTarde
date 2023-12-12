<?php

require("../Connection/conexaoBD.php");

function logar($conexao)
{
    if (isset($_POST['enviarLogin']) and !empty($_POST['emailLogin']) and !empty($_POST['senhaLogin'])) {


        $email = filter_input(INPUT_POST, "emailLogin", FILTER_VALIDATE_EMAIL);
        $senha = $_POST['senhaLogin'];

        $sql = "SELECT * FROM usuario WHERE email=:email";

        $stmt = $conexao->prepare($sql);
        $stmt->bindValue(':email', $email);
        $stmt->execute();

        $linha = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "teste";
        if ($linha) {
            echo "teste";
            if (password_verify($senha, $linha['senha'])) {
                //Encaminha o usuario para a pagina de login

                session_start();

                $_SESSION['nome'] = $linha['nome'];
                $_SESSION['email'] = $linha['email'];
                $_SESSION['idusu'] = $linha['idusu'];
                $_SESSION['ativa'] = TRUE;

                header("Location: ../index.php");
                exit(); // Importante para evitar execução adicional do código

            } else {
                echo "Usuário ou Senha incorreta";
            }
        } else {
            echo "Usuario não existe!";
        }
    }
}

function logout()
{
    session_start();
    session_unset();
    session_destroy();
    header("location: ../index.php");
}


function buscarUnic($conexao, $tabela, $idtable, $idproc)
{

    $sql = "SELECT * FROM $tabela WHERE $idtable =" . (int) $idproc; //Com a validação (int), força o valor a ser inteiro

    $stmt = $conexao->prepare($sql);

    $stmt->execute();

    $linha = $stmt->fetch(PDO::FETCH_ASSOC);

    return $linha;
}

function buscarAll($conexao, $tabela, $order = "", $where = 1)
{ //Como os valores de order e where ja estão definidos, caso não queira ordenar ou filtrar com where deixe em branco
    //Caso a variavel order seja definida
    if (!empty($order)) {
        $order = "ORDER BY $order";
    }

    $sql = "SELECT * FROM $tabela WHERE $where $order";

    $stmt = $conexao->prepare($sql);

    $stmt->execute();

    $linha = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $linha;
}

function cadastrarUsuar($conexao)
{
    if (isset($_POST['botao'])) {
        if (isset($_POST['nome']) && isset($_POST["cpf"])) {
            $erros = array();
            $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);

            if ($_POST['senha'] != $_POST['confirSenha']) {
                $erros[] = "As senhas devem ser iguais!";
            }

            //Pode conter apenas um usuario por email
            $sqlemail = "SELECT * FROM usuario WHERE email= :email";
            $buscaEmail = $conexao->prepare($sqlemail);
            $buscaEmail->bindValue(':email', $email);

            $buscaEmail->execute();

            $linha = $buscaEmail->fetchAll(PDO::FETCH_ASSOC);

            if (!empty($linha)) {
                $erros[] = "Email ja cadastrado!" . "<br>" . "<h3>Só é permitido um unico email por usuario!</h3>";
            }

            if (empty($erros)) {
                //Inserir
                $sql = "INSERT INTO usuario (idusu, nome, sobrenome, data_nasc, sexo, email, cpf, cnpj, celular, telefone, cep, senha) VALUES (null, :nome, :sobrenome, :data_nasc, :sexo, :email, :cpf, :cnpj, :celular, :telefone, :cep, :senha)";

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
                    echo "ERRO ao inserir com sucesso";
                }
            } else {
                foreach ($erros as $erro) {
                    echo "'<div class='diverro'>' . $erro . '</div>'";
                }
            }
        }
    } else {
        echo "Por favor preencha os campos";
    }
}
function cadastrarEmpre($conexao)
{

    if (isset($_POST['nome']) && isset($_POST["cnpj"])) {
        $erros = array();
        $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);

        if ($_POST['senha'] != $_POST['confirSenha']) {
            $erros[] = "As senhas devem ser iguais!";
        }

        //Pode conter apenas um usuario por email
        $sqlemail = "SELECT email FROM usuario WHERE email='$email'";

        $buscaEmail = $conexao->prepare($sqlemail);

        $buscaEmail->execute();

        $linha = $buscaEmail->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($linha)) {
            $erros[] = "Email ja cadastrado!<br><h3>Só é permitido um unico email por usuario!</h3>";
        }

        if (empty($erros)) {
            //Inserir
            $sql = "INSERT INTO usuario (idusu, nome, sobrenome, data_nasc, sexo, email, cpf, cnpj, celular, telefone, cep, senha) VALUES (null, :nome, :sobrenome, :data_nasc, :sexo, :email, :cpf, :cnpj, :celular, :telefone, :cep, :senha)";

            if (isset($_POST['nome']) && isset($_POST['nome'])) {

                $nome = $_POST['nome'];
                $sobreNome = "";
                $datnasc = "";
                $sexo = "";
                $email = $_POST['email'];
                $cpf = "";
                $cnpj = $_POST['cnpj'];
                $celular = $_POST['celular'];
                $telefone = $_POST['telefone'];
                $cep = "";
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
                echo "ERRO ao inserir com sucesso";
            }
        } else {
            foreach ($erros as $erro) {
                echo "'<div> <h2>' . $erro . '</h2></div>'";
            }
        }
    }
}

function deletarUsu($conexao, $tabela, $nomeID, $idbusc)
{

    if (!empty($idbusc)) {
        $sqlDel = "DELETE FROM $tabela WHERE $nomeID= " . (int) $idbusc;
        $buscaEmail = $conexao->prepare($sqlDel);
        $result = $buscaEmail->execute();

        if ($result) {
            echo "Dado deletado com sucesso!";
        } else {
            echo "Erro ao deletar!";
        }
    }
}



function cadastrarProd($conexao){
    
}
