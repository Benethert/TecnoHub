<?php
require_once 'core/NodeRedClient.php';

class ScadaController {
    private $client;

    public function __construct() {
        $this->client = new NodeRedClient();
    }

    public function ejecutarAccion($tag, $valor) {
        // Convierte "true"/1 o "false"/0 a booleano real de PHP
        $valBool = filter_var($valor, FILTER_VALIDATE_BOOLEAN);
        return $this->client->enviarComando($tag, $valBool);
    }

    public function actualizarPanel() {
        return $this->client->obtenerEstados();
    }
}