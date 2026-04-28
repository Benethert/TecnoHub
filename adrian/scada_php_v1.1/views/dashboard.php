<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>HMI SCADA Industrial</title>
    <style>
        :root { --bg-panel: #1e293b; --water: #38bdf8; --on-solid: #22c55e; }
        body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: white; padding: 30px; margin: 0; }
        .scada-container { display: flex; flex-direction: column; align-items: center; gap: 20px; }
        
        .process-view { 
            background: var(--bg-panel); padding: 50px; border-radius: 20px; 
            width: 950px; display: flex; align-items: center; justify-content: space-between; gap: 10px;
            border: 1px solid #334155; box-shadow: 0 10px 15px rgba(0,0,0,0.5);
            position: relative;
        }
        
        .pipe {
            height: 20px;
            background: linear-gradient(to bottom, #94a3b8 0%, #475569 50%, #94a3b8 100%);
            border: 2px solid #334155;
            flex-grow: 1;
            margin: 0 -5px;
            z-index: 1;
            border-radius: 5px;
        }

        .tank { width: 120px; height: 180px; border: 4px solid #cbd5e1; border-radius: 10px; background: #334155; position: relative; overflow: hidden; z-index: 2; }
        .water { width: 100%; position: absolute; bottom: 0; background: var(--water); transition: 0.5s; }
        .tank-active { border-color: var(--on-solid) !important; background: #166534 !important; }

        .component { text-align: center; font-weight: bold; z-index: 2; }
        .icon { width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; background: #475569; font-size: 16px; border: 4px solid #334155; margin-bottom: 10px; transition: 0.3s; }
        .on { background: var(--on-solid) !important; color: white; border-color: #16a34a; box-shadow: 0 0 20px var(--on-solid); }
        .off { background: #64748b !important; border-color: #475569; }
        
        .digital-clock-container { background: #000; padding: 15px 30px; border-radius: 10px; border: 4px solid #333; text-align: center; margin: 10px 0; }
        .clock-label { color: #555; font-size: 10px; letter-spacing: 2px; font-weight: bold; }
        .digital-clock { font-family: 'Courier New', monospace; font-size: 60px; color: #0f0; text-shadow: 0 0 10px #0f0; }
        
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.2; } 100% { opacity: 1; } }
        .lamp { width: 80px; height: 80px; background: #475569; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-bottom: 10px; }
        .lamp.on { background: var(--on-solid); animation: blink 0.8s infinite; box-shadow: 0 0 20px var(--on-solid); }

        .control-panel { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; width: 950px; }
        .btn { padding: 15px; border-radius: 10px; font-weight: 800; cursor: pointer; border: none; transition: 0.2s; text-transform: uppercase; }
        .btn:active { transform: translateY(4px); }
        .btn-primary { background-color: #007bff !important; color: white; }
        .btn-std { background: #6b7280; color: white; }
        .btn-emergency { background: #dc2626; color: white; }
        .btn-auto { background: #fbbf24; color: #111; }
    </style>
</head>
<body>

<div class="scada-container">
    <h1>HMI CONTROL INDUSTRIAL</h1>
    <div class="process-view">
        <div class="component"><div class="tank"><div class="water" id="t1" style="height:60%"></div></div><p>DEPÓSITO 1</p></div>
        
        <div class="pipe"></div>
        <div class="component"><div class="icon off" id="v-valvula">VAL</div></div>
        <div class="pipe"></div>
        <div class="component"><div class="icon off" id="v-bomba1">B1</div></div>
        <div class="pipe"></div>
        <div class="component"><div class="icon off" id="v-bomba2">B2</div></div>
        <div class="pipe"></div>
        
        <div class="component">
            <div class="lamp off" id="v-lampara">LAMP</div>
            <div class="tank" id="t2"><div class="water" id="w2" style="height:40%"></div></div>
            <p>DEPÓSITO 2</p>
        </div>
    </div>

    <div class="digital-clock-container">
        <div class="clock-label">TIEMPO OPERATIVO</div>
        <div class="digital-clock" id="txt-tiempo">00:00</div>
    </div>
    
    <div class="control-panel">
        <button class="btn btn-auto" onclick="enviar('Auto', true)">MODO AUTO</button>
        <button class="btn btn-emergency" onclick="enviar('PE', true)">EMERGENCIA</button>
        <button class="btn btn-std" onclick="enviar('Abrir_Val', true)">ABRIR V</button>
        <button class="btn btn-std" onclick="enviar('Cerrar_Val', true)">CERRAR V</button>
        <button class="btn btn-primary" onclick="enviar('REARME', true)">REARME ON</button>
        <button class="btn btn-std" onclick="enviar('ON_LAMP', true)">LÁMPARA ON</button>
        <button class="btn btn-std" onclick="enviar('OFF_LAMP', true)">LÁMPARA OFF</button>
        <button class="btn btn-std" style="background:#2ecc71" onclick="enviar('Marcha_B', true)">MARCHA B</button>
        <button class="btn btn-std" style="background:#e67e22" onclick="enviar('Paro_B', true)">PARO B</button>
        <button class="btn btn-emergency" onclick="enviar('REARME', false)">REARME OFF</button>
    </div>
</div>

<script>
    let tiempoActual = 0; 
    let bomba2Activa = false;
    // Variable de control para detectar cuándo el servidor cambia el tiempo (Rearme)
    let ultimoTiempoServidor = -1;

    async function enviar(tag, valor) {
        await fetch('index.php?action=enviar', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({tag, valor}) 
        });
    }

    // Cronómetro fluido: Se ejecuta cada segundo independientemente del fetch
    setInterval(() => {
        if (bomba2Activa) {
            tiempoActual++;
            const min = Math.floor(tiempoActual / 60).toString().padStart(2, '0');
            const seg = (tiempoActual % 60).toString().padStart(2, '0');
            document.getElementById('txt-tiempo').innerText = `${min}:${seg}`;
        }
    }, 1000);

    // Función de actualización: Sincroniza estados del PLC
    function actualizar() {
        fetch('index.php?action=leer')
            .then(res => res.json())
            .then(data => {
                const isTrue = (val) => val === true || val === 1 || val === "true" || val === "1";
                
                // Actualizamos el estado de la bomba para el cronómetro
                bomba2Activa = isTrue(data.O_B2);

                // LÓGICA DE REARME:
                // Solo actualizamos el tiempo local si el servidor envía un valor distinto 
                // al anterior (indicando que se presionó el botón de rearme o cambió el ciclo).
                if (data.TIEMPO !== undefined && parseInt(data.TIEMPO) !== ultimoTiempoServidor) {
                    tiempoActual = parseInt(data.TIEMPO);
                    ultimoTiempoServidor = parseInt(data.TIEMPO);
                }

                // Actualización de indicadores visuales
                document.getElementById('v-valvula').className = isTrue(data.O_VAL) ? "icon on" : "icon off";
                document.getElementById('v-bomba1').className = isTrue(data.O_B1) ? "icon on" : "icon off";
                document.getElementById('v-bomba2').className = bomba2Activa ? "icon on" : "icon off";
                
                const lampOn = isTrue(data.O_LAMP);
                document.getElementById('v-lampara').className = lampOn ? "lamp on" : "lamp off";
                lampOn ? document.getElementById('t2').classList.add('tank-active') 
                       : document.getElementById('t2').classList.remove('tank-active');
            });
    }

    // Refrescamos los estados cada 2 segundos
    setInterval(actualizar, 2000);
</script>
</body>
</html>