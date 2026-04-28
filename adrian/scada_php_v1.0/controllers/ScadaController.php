<?php
require_once 'core/NodeRedClient.php';

class ScadaController {
    private $client;

    public function __construct() {
        $this->client = new NodeRedClient();
    }

    // Acción para botones (POST)
    public function ejecutarAccion($tag, $valor) {
        // Convertimos el valor string a booleano real
        $valBool = ($valor === 'true');
        return $this->client->enviarComando($tag, $valBool);
    }

    // Acción para actualizar la pantalla (AJAX)
    public function actualizarPanel() {
        return $this->client->obtenerEstados();
    }
}