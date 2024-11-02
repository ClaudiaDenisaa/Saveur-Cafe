<?php
session_start();
$conectare = mysqli_connect('localhost', 'root', '', 'ewd_savoir_cafe');
if (!$conectare) {
    die("Conexiunea a eșuat: " . mysqli_connect_error());
}
?>

