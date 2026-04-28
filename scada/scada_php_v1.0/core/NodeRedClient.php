<?php
class NodeRedClient {
    private $baseUrl = "http://127.0.0.1:1880";

    public function enviarComando($tag, $valor) {
        $url = $this->baseUrl . "/control-plc";
        $data = json_encode(["tag" => $tag, "valor" => $valor]);

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_TIMEOUT, 2); // Para que no se quede colgado
        
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    public function obtenerEstados() {
        $url = $this->baseUrl . "/scada-status";
        // Usamos cURL también para leer, es más robusto que file_get_contents
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 2);
        $json = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($json, true) ?? [];
    }
}