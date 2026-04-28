<?php
require_once 'controllers/ScadaController.php';
$controller = new ScadaController();

$action = $_GET['action'] ?? 'home';

if ($action == 'enviar') {
    $data = json_decode(file_get_contents('php://input'), true);
    echo $controller->ejecutarAccion($data['tag'], $data['valor']);
} 
elseif ($action == 'leer') {
    header('Content-Type: application/json');
    echo json_encode($controller->actualizarPanel());
} 
else {
    include 'views/dashboard.php';
}