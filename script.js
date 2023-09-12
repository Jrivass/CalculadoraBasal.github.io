// Controlador de eventos de carga del documento
document.addEventListener("DOMContentLoaded", function() {
    // Obtener elementos HTML después de que se haya cargado el documento
    let pesoInput = document.getElementById("peso");
    let resultadoDiv = document.getElementById("resultado");
    let opcionSCDiv = document.getElementById("opcionSC");
    let btn1500 = document.getElementById("btn1500");
    let btn2000 = document.getElementById("btn2000");
    let reiniciarButton = document.getElementById("reiniciar"); // Botón de reinicio

    // Guardar el estado inicial de la página
    let estadoInicial = {
        pesoInputValue: pesoInput.value,
        resultadoDivHTML: resultadoDiv.innerHTML,
        opcionSCDivStyle: opcionSCDiv.style.display
    };

    // Verificar si los elementos existen antes de agregar eventos
    if (pesoInput && resultadoDiv && opcionSCDiv && btn1500 && btn2000) {
        // Esta función verifica si se presionó "Enter" en el campo de peso y llama a la función calculate()
        pesoInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Evitar la recarga de la página
                if (resultadoDiv.innerHTML !== "") {
                    reiniciarPagina(); // Reiniciar la página solo si se ha dado una respuesta
                } else {
                    calculate(); // Calcular si no se ha dado una respuesta
                }
            }
        });

        // Esta función se llama cuando se hace clic en el botón de calcular
        function calculate() {
            let peso = parseFloat(pesoInput.value);

            if (isNaN(peso) || peso <= 0 || peso >= 50) {
                alert("Ingrese un peso válido entre 0 y 50 kg.");
                pesoInput.value = ""; // Limpiar el campo de entrada
                resultadoDiv.innerHTML = "";
                opcionSCDiv.style.display = "none"; // Ocultar los botones de elección SC * 1500 o SC * 2000
                return;
            }

            let resultado = {};

            if (peso <= 10) {
                resultado.volumenDiario = peso * 100;
                resultado.mantenimientoCCHr = resultado.volumenDiario / 24;
                resultado.mmMasMedio = resultado.mantenimientoCCHr + (resultado.mantenimientoCCHr / 2);
            } 
            else if (peso <= 20) {
                resultado.volumenDiario = 1000 + ((peso - 10) * 50);
                resultado.mantenimientoCCHr = resultado.volumenDiario / 24;
                resultado.mmMasMedio = resultado.mantenimientoCCHr + (resultado.mantenimientoCCHr / 2);
            } 
            else if (peso <= 30) {
                resultado.volumenDiario = 1000 + 500 + ((peso - 20) * 20);
                resultado.mantenimientoCCHr = resultado.volumenDiario / 24;
                resultado.mmMasMedio = resultado.mantenimientoCCHr + (resultado.mantenimientoCCHr / 2);
            } 
            else {
                // Calcular superficie corporal para peso mayor a 30 kg
                let superficieCorporal = ((peso * 4) + 7) / (peso + 90);
                opcionSCDiv.style.display = "block"; // Mostrar los botones de elección SC * 1500 o SC * 2000

                btn1500.addEventListener("click", function() {
                    resultado.volumenDiario = superficieCorporal * 1500;
                    resultado.mantenimientoCCHr = null;
                    resultado.mmMasMedio = null;
                    mostrarResultados(resultado);
                    pesoInput.focus(); // Devolver el enfoque al campo de entrada de peso   
                });

                btn2000.addEventListener("click", function() {
                    resultado.volumenDiario = superficieCorporal * 2000;
                    resultado.mantenimientoCCHr = null;
                    resultado.mmMasMedio = null;
                    mostrarResultados(resultado);
                    pesoInput.focus(); // Devolver el enfoque al campo de entrada de peso   
                });
            }

            // Mostrar resultados
            mostrarResultados(resultado);
        }

        // Función para mostrar los resultados
        function mostrarResultados(resultado) {
            resultadoDiv.innerHTML = `<span class="resultados-texto">RESULTADOS:</span><br><br>Volumen diario en cc:<br> ${resultado.volumenDiario.toFixed(2)} cc`;
            if (resultado.mantenimientoCCHr !== null && resultado.mmMasMedio !== null) {
                resultadoDiv.innerHTML += `<br><br>Mantenimiento en cc/hr:<br> ${resultado.mantenimientoCCHr.toFixed(2)} cc/hr<br>m+m/2: ${resultado.mmMasMedio.toFixed(2)} cc/hr`;
            } else if (resultado.mantenimientoCCHr !== null) {
                resultadoDiv.innerHTML += `<br><br>Mantenimiento en cc/hr:<br> ${resultado.mantenimientoCCHr.toFixed(2)} cc/hr`;
            } else if (resultado.mmMasMedio !== null) {
                resultadoDiv.innerHTML += `<br> m+m/2: <br>${resultado.mmMasMedio.toFixed(2)} cc/hr`;
            }
        }
    }

    // Agregar evento al botón de explicación
    let explicacionButton = document.getElementById("explicacion");
    let infoDiv = document.getElementById("info");
    if (explicacionButton && infoDiv) {
        explicacionButton.addEventListener("click", function() {
            // Mostrar u ocultar la información según su estado actual
            if (infoDiv.style.display === "none") {
                infoDiv.style.display = "block";
            } else {
                infoDiv.style.display = "none";
            }
        });
    }

    // Función para reiniciar la página
    function reiniciarPagina() {
        pesoInput.value = estadoInicial.pesoInputValue; // Restaurar el valor del campo de peso
        resultadoDiv.innerHTML = estadoInicial.resultadoDivHTML; // Restaurar el contenido de resultadoDiv
        opcionSCDiv.style.display = estadoInicial.opcionSCDivStyle; // Restaurar la visibilidad de opcionSCDiv
        btn1500.removeEventListener("click", null); // Eliminar el evento de clic en btn1500
        btn2000.removeEventListener("click", null); // Eliminar el evento de clic en btn2000
    }
    if (reiniciarButton) {
        reiniciarButton.addEventListener("click", function() {
            reiniciarPagina();
        });
    }
});

