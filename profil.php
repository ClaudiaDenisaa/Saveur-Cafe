<?php
session_start();
require 'conectare.php';
header('Content-Type: application/json');

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);
$id_sesiune = intval($data['id_sesiune']); // Convertim în întreg pentru a preveni SQL injection

$response = false;
$response_data = [];

$sql = "SELECT nume, telefon, email, comenzi FROM Utilizator WHERE id_utilizator = $id_sesiune";

$result = $conectare->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $response_data = [
            'nume' => $row['nume'],
            'telefon' => $row['telefon'],
            'email' => $row['email'],
            'comenzi' => $row['comenzi']
        ];
        $response = true;
    }
} else {
    $response_data['error'] = "EROARE! Utilizatorul nu a fost găsit.";
}

echo json_encode(['success' => $response, 'data' => $response_data]);

mysqli_close($conectare);
?>

