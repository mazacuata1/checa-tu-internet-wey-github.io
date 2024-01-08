document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const resultDiv = document.getElementById('result');
    const progressBar = document.getElementById('progressBar');

    startBtn.addEventListener('click', async function () {
        startBtn.disabled = true;
        resultDiv.innerHTML = '';
        progressBar.style.width = '0%';

        const speedTest = new Speedtest();
        const downloadSpeed = await speedTest.download();
        progressBar.style.width = '50%';

        const uploadSpeed = await speedTest.upload();
        progressBar.style.width = '100%';

        setTimeout(() => {
            resultDiv.innerHTML = `
                <div>
                    <p>Velocidad de descarga:</p>
                    <h2>${downloadSpeed.toFixed(2)} Mbps</h2>
                </div>
                <div>
                    <p>Velocidad de carga:</p>
                    <h2>${uploadSpeed.toFixed(2)} Mbps</h2>
                </div>
                <div>
                    <img id = "nomo" src="imagenes/nomo.webp" alt="XDDDD">
                </div>
            `;
            
            // Cambiamos el botón "Iniciar Prueba" a un botón de reiniciar con una imagen
            startBtn.innerHTML = '<img src="imagenes/recargar.png" alt="Reiniciar">';
            startBtn.disabled = false;
            startBtn.removeEventListener('click', reloadPage); // Eliminamos el evento de recarga
            startBtn.addEventListener('click', restartTest);

            progressBar.style.width = '0%';
        }, 500); // Agregamos un pequeño retraso antes de mostrar los resultados (ajusta según sea necesario)
    });

    // Función para reiniciar la prueba al hacer clic en el botón de reiniciar
    function restartTest() {
        startBtn.removeEventListener('click', restartTest); // Eliminamos el evento de reinicio
        startBtn.click(); // Simulamos un clic para iniciar la prueba nuevamente
    }
});
