let tamañoTablero = 4;
let jugadorActual = 1;
let tablero = [];
let puntaje = [0, 0];

function iniciarJuego() {
    tamañoTablero = parseInt(document.getElementById('tamano').value);
    jugadorActual = 1;
    tablero = Array(tamañoTablero).fill(null).map(() => Array(tamañoTablero).fill(0));
    crearTablero();
    actualizarPuntaje();
}

function crearTablero() {
    const contenedorTablero = document.getElementById('tablero');
    contenedorTablero.innerHTML = '';
    contenedorTablero.style.gridTemplateColumns = `repeat(${tamañoTablero}, 50px)`;

    for (let i = 0; i < tamañoTablero; i++) {
        for (let j = 0; j < tamañoTablero; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.addEventListener('click', () => colocarFicha(i, j));
            contenedorTablero.appendChild(celda);
        }
    }
}

function colocarFicha(fila, col) {
    if (tablero[fila][col] !== 0) return;

    tablero[fila][col] = jugadorActual;
    actualizarTablero();
    if (verificarVictoria()) {
        document.getElementById('mensaje').textContent = `¡Jugador ${jugadorActual} gana!`;
        puntaje[jugadorActual - 1]++;
        setTimeout(iniciarJuego, 2000);  // Reinicia el juego después de 2 segundos
    } else if (tablero.flat().every(celda => celda !== 0)) {
        document.getElementById('mensaje').textContent = '¡Empate!';
        setTimeout(iniciarJuego, 2000);  // Reinicia el juego después de 2 segundos
    } else {
        jugadorActual = jugadorActual === 1 ? 2 : 1;
    }
}

function actualizarTablero() {
    const celdas = document.querySelectorAll('.celda');
    for (let i = 0; i < tamañoTablero; i++) {
        for (let j = 0; j < tamañoTablero; j++) {
            const index = i * tamañoTablero + j;
            const celda = celdas[index];
            if (tablero[i][j] === 1) {
                celda.classList.add('jugador1');
            } else if (tablero[i][j] === 2) {
                celda.classList.add('jugador2');
            }
        }
    }
}

function verificarVictoria() {
    const checkLine = (line) => line.every(celda => celda === line[0] && celda !== 0);

    // Verificar filas
    for (let i = 0; i < tamañoTablero; i++) {
        if (checkLine(tablero[i])) return true;
    }

    // Verificar columnas
    for (let j = 0; j < tamañoTablero; j++) {
        if (checkLine(tablero.map(fila => fila[j]))) return true;
    }

    // Verificar diagonales
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < tamañoTablero; i++) {
        diagonal1.push(tablero[i][i]);
        diagonal2.push(tablero[i][tamañoTablero - 1 - i]);
    }
    if (checkLine(diagonal1) || checkLine(diagonal2)) return true;

    return false;
}

function actualizarPuntaje() {
    document.getElementById('puntaje1').textContent = puntaje[0];
    document.getElementById('puntaje2').textContent = puntaje[1];
}

document.addEventListener('DOMContentLoaded', iniciarJuego);