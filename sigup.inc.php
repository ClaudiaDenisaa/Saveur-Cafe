
<?php
require 'conectare.php';

$nume = mysqli_real_escape_string($conectare, $_POST['nume']);
$parola = mysqli_real_escape_string($conectare, $_POST['parola']);
$email = mysqli_real_escape_string($conectare, $_POST['email']);
$telefon = mysqli_real_escape_string($conectare, $_POST['telefon']);


$sql = "INSERT INTO Utilizator (nume, parola, telefon, email, comenzi) VALUES ('$nume', '$parola', '$telefon', '$email', '0')";

if (mysqli_query($conectare, $sql)) {
    header("Location: logare.html");
    exit();
} else {
   
    echo "Eroare: " . $sql . "<br>" . mysqli_error($conectare);
}

mysqli_close($conectare);
?>
