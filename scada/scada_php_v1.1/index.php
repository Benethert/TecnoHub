<?php
// index.php
require_once __DIR__ . '/core/NodeRedClient.php';
$client = new NodeRedClient();

// 1. Manejo de API (JSON)
if (isset($_GET['action'])) {
    header('Content-Type: application/json');
    $action = $_GET['action'];

    if ($action === 'enviar' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $res = $client->enviarComando($data['tag'] ?? '', $data['valor'] ?? null);
        echo json_encode(['status' => 'success', 'resultado' => $res]);
    } 
    elseif ($action === 'leer') {
        echo json_encode($client->obtenerEstados());
    }
    exit; // ESTO EVITA QUE EL HTML SE ENVÍE
}

// 2. Si no es una acción de API, carga la vista HTML
require_once 'views/dashboard.php';

?>