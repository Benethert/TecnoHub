<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>HMI SCADA Industrial</title>
    <style>
        :root {
            --bg-panel: #2c3e50;
            --pipe-color: #7f8c8d;
            --water-color: #3498db;
            --btn-gray: #ecf0f1;
        }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #1a1a1a; color: white; margin: 0; padding: 20px; }
        
        /* Contenedor Principal */
        .scada-container { display: flex; flex-direction: column; align-items: center; gap: 20px; }
        
        /* Gráfico del Proceso */
        .process-view { 
            background: var(--bg-panel); padding: 40px; border-radius: 15px; border: 4px solid #555;
            position: relative; width: 800px; height: 400px; display: flex; align-items: center; justify-content: space-around;
        }

        /* Tanque */
        .tank { 
            width: 120px; height: 180px; border: 4px solid #bdc3c7; border-radius: 0 0 10px 10px;
            position: relative; background: #34495e; overflow: hidden;
        }
        .water { 
            position: absolute; bottom: 0; width: 100%; background: var(--water-color); 
            height: 60%; transition: height 1s; box-shadow: inset 0 0 20px rgba(0,0,0,0.3);
        }

        /* Válvula y Bombas Visuales */
        .component { text-align: center; font-weight: bold; font-size: 12px; }
        .icon { width: 50px; height: 50px; border-radius: 50%; border: 3px solid white; margin: 0 auto 5px; display: flex; align-items: center; justify-content: center; background: #95a5a6; transition: 0.3s; }
        .on { background: #2ecc71 !important; box-shadow: 0 0 15px #2ecc71; }
        .off { background: #e74c3c !important; }

        /* Tuberías Simples */
        .pipe { position: absolute; background: var(--pipe-color); height: 10px; z-index: 0; }

        /* Panel de Botones */
        .control-panel { 
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; 
            background: #444; padding: 20px; border-radius: 10px; width: 800px;
        }
        .btn { 
            padding: 15px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; 
            text-transform: uppercase; transition: 0.2s;
        }
        .btn-std { background: var(--btn-gray); color: #333; }
        .btn-std:active { transform: scale(0.95); }
        .btn-emergency { background: #c0392b; color: white; grid-column: span 2; }
        .btn-auto { background: #f1c40f; color: #333; }

        .display { background: #000; color: #0f0; padding: 10px; font-family: 'Courier New'; border: 2px solid #555; text-align: center; }
    </style>
</head>
<body>

<div class="scada-container">
    <h2>HMI CONTROL DE DEPÓSITO Y BOMBEO</h2>

    <div class="process-view">
        <div class="pipe" style="width: 500px; top: 245px; left: 150px;"></div>

        <div class="component">
            <div class="tank"><div class="water" id="v-water"></div></div>
            <p>DEPÓSITO</p>
        </div>

        <div class="component">
            <div class="icon" id="v-valvula">V</div>
            <p>VÁLVULA (O_VAL)</p>
        </div>

        <div class="component">
            <div class="icon" id="v-bomba1">B1</div>
            <p>BOMBA 1 (O_B1)</p>
        </div>

        <div class="component">
            <div class="icon" id="v-bomba2">B2</div>
            <p>BOMBA 2 (O_B2)</p>
        </div>

        <div class="component">
            <div class="icon" style="border-radius: 5px;" id="v-lampara">L</div>
            <p>LÁMPARA (O_LAMP)</p>
        </div>
    </div>

    <div class="display" style="width: 200px;">
        TIEMPO BOMBA: <span id="txt-tiempo">0</span>s
    </div>

    <div class="control-panel">
        <button class="btn btn-auto" onclick="enviar('Auto', true)">MODO AUTO</button>
        <button class="btn btn-emergency" onclick="enviar('PE', true)">PARADA EMERGENCIA</button>
        <button class="btn btn-std" onclick="enviar('ON_LAMP', true)">LÁMPARA ON</button>
        
        <button class="btn btn-std" onclick="enviar('Abrir_Val', true)">ABRIR VÁLVULA</button>
        <button class="btn btn-std" onclick="enviar('Cerrar_Val', true)">CERRAR VÁLVULA</button>
        <button class="btn btn-std" onclick="enviar('OFF_LAMP', true)">LÁMPARA OFF</button>
        
        <button class="btn btn-std" style="background:#2ecc71" onclick="enviar('Marcha_B', true)">MARCHA BOMBAS</button>
        <button class="btn btn-std" style="background:#e67e22" onclick="enviar('Paro_B', true)">PARO BOMBAS</button>
    </div>
</div>

<script>
    function enviar(tag, valor) {
        console.log("Enviando " + tag + " : " + valor);
        fetch('index.php?action=enviar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({tag: tag, valor: valor})
        });
    }

    function actualizar() {
        fetch('index.php?action=leer')
            .then(res => res.json())
            .then(data => {
                // Actualizar Visualización según los estados que envía Node-RED
                // Los nombres coinciden con tu JSON (O_B1, O_B2, O_VAL, O_LAMP, TIEMPO)
                
                document.getElementById('v-valvula').className = data.O_VAL ? "icon on" : "icon off";
                document.getElementById('v-bomba1').className = data.O_B1 ? "icon on" : "icon off";
                document.getElementById('v-bomba2').className = data.O_B2 ? "icon on" : "icon off";
                document.getElementById('v-lampara').className = data.O_LAMP ? "icon on" : "icon off";
                
                // Efecto de agua (si hay bombas o válvulas activas)
                document.getElementById('v-water').style.height = data.O_VAL ? "30%" : "70%";
                
                // Tiempo
                document.getElementById('txt-tiempo').innerText = data.TIEMPO || 0;
            })
            .catch(err => console.error("Error de enlace SCADA:", err));
    }

    // Polling cada 800ms para mayor fluidez
    setInterval(actualizar, 800);
</script>

</body>
</html>