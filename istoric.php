
<?php
session_start();
require 'conectare.php';
header('Content-Type: application/json');

$response = false;
$response_data = [];

$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);
$id_utilizator = intval($data['id_utilizator']);

$sql = "SELECT c.id_comenzi, c.ora, c.ziua, c.data, c.pret_total, c.ora_ridicare_comanda, p.nume AS nume_produs, p.pret AS pret_produs, d.cantitate
        FROM Comanda c
        JOIN Detali d ON c.id_comenzi = d.id_comenzi
        JOIN produs p ON d.id_produs = p.id_produs
        WHERE c.id_utilizator = $id_utilizator
        ORDER BY c.data DESC, c.ora DESC";

$result = $conectare->query($sql);

$comenzi = [];
if ($result && $result->num_rows > 0){
while($row = $result->fetch_assoc()) {
   $id_comenzi = $row['id_comenzi'];
    if (!isset($comenzi[$id_comenzi])) {
        $comenzi[$id_comenzi] = [
            'id_comenzi' => $row['id_comenzi'],
            'ora' => $row['ora'],
            'ziua' => $row['ziua'],
            'data' => $row['data'],
            'pret_total' => $row['pret_total'],
            'ora_ridicare_comanda' => $row['ora_ridicare_comanda'],
            'produse' => []
        ];
    }
  
    $comenzi[$id_comenzi]['produse'][] = [
        //'id_produs' => $row['id_produs'],
        'nume_produs' => $row['nume_produs'],
        'pret_produs' => $row['pret_produs'],
        'cantitate' => $row['cantitate']
    ];
}
    $response= true;
}else{
    $response_data['error'] = "Nu s-au găsit comenzi pentru acest utilizator.";
}

echo json_encode(['success' => $response, 'data' => array_values($comenzi), 'error' => $response ? null : $response_data['error']]);
$stmt->close();
mysqli_close($conectare);   

?>