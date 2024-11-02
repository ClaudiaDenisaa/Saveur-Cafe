<?php
require 'conectare.php';

header('Content-Type: application/json');

$response = array('success' => false, 'message' => '','id_utilizator'=>'');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nume = mysqli_real_escape_string($conectare, $_POST['nume']);
    $parola = mysqli_real_escape_string($conectare, $_POST['parola']);

    $sql = "SELECT * FROM Utilizator WHERE nume='$nume' AND parola='$parola'";
    $result = mysqli_query($conectare, $sql);


    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['id_utilizator'] = $row['id_utilizator'];
        $_SESSION['utilizator'] = $row['nume'];
        $_SESSION['parola'] = $row['parola'];
        $response['id_utilizator'] = $_SESSION['id_utilizator'];
        $response['success'] = true;
    } else {
        $response['message'] = 'Utilizator sau parolă incorecte!';
    }
}

echo json_encode($response);
mysqli_close($conectare);
