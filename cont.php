<?php
session_start();
require 'conectare.php';

header('Content-Type: application/json');

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

$id_utilizator = $data['id_utilizator'];
$ora = $data['ora'];
$ziua = $data['ziua'];
$data_comanda = $data['data'];
$pret_total = $data['pret_total'];
$ora_ridicare_comanda = $data['ora_ridicare_comanda'];

$sql_comanda = "INSERT INTO Comanda (id_utilizator, ora, ziua, data, pret_total, ora_ridicare_comanda) VALUES (?, ?, ?, ?, ?, ?)";
$stmt_comanda = $conectare->prepare($sql_comanda);
$stmt_comanda->bind_param("isssds", $id_utilizator, $ora, $ziua, $data_comanda, $pret_total, $ora_ridicare_comanda);

if ($stmt_comanda->execute()) {
    $id_comenzi = $conectare->insert_id;

    foreach ($data['orderDetails'] as $detaliu) {
        $sql_detali = "INSERT INTO Detali (id_comenzi, id_produs, cantitate) VALUES (?, ?, ?)";
        $stmt_detali = $conectare->prepare($sql_detali);
        $id_produs = $detaliu['id'];
        $nume = $detaliu['nume'];
        $cantitate = $detaliu['cantitate'];
        $pret = $detaliu['pret'];
        $stmt_detali->bind_param("iii", $id_comenzi, $id_produs, $cantitate);
        $stmt_detali->execute();
        $stmt_detali->close(); 
    }
   
    $stmt_comanda->close();
    $sql_update_utilizator = "UPDATE Utilizator SET comenzi = comenzi + 1 WHERE id_utilizator = ?";
    $stmt_update_utilizator = $conectare->prepare($sql_update_utilizator);
    $stmt_update_utilizator->bind_param("i", $id_utilizator);
    $stmt_update_utilizator->execute();
    $stmt_update_utilizator->close();
  
    mysqli_close($conectare);
    
    $response = array(
        'success' => true,
        'message' => 'SUCCES'
    );
    echo json_encode($response);
} else {
    $response = array(
        'success' => false,
        'message' => 'Eroare la inserarea comenzii în baza de date: ' . $stmt_comanda->error
    );
    echo json_encode($response);
    mysqli_close($conectare);
}
?>
