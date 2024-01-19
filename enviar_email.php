<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $mensagem = $_POST["mensagem"];

    $to = "caio.zanelato.medeiros@gmail.com";
    $subject = "Mensagem do Portfólio de $nome";
    $headers = "From: $email";

    mail($to, $subject, $mensagem, $headers);
}
?>