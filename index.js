const readlineSync = require("readline-sync");

let jugadorActual = "Jugador 1";

let tablero = [
  [' - |', ' - |', ' -'],
  [' - |', ' - |', ' -'],
  [' - |', ' - |', ' -']
];

console.log(tablero[1][1])

let vacio = [' - |', ' - |', ' -'];

function imprimirTablero() {
  console.log("   A   B   C");
  for (let i = 0; i < tablero.length; i++) {
    if (i === tablero.length - 1) {
      console.log(`${i + 1} ${tablero[i].join("")}`);
    } else {
      console.log(`${i + 1} ${tablero[i].join("")} \n  ---|---|---`);
    }
  }
}

function comprobarCombinacionGanadora() {
  for (let i = 0; i < 3; i++) {
    if (
      (tablero[i][0].charAt(1) === tablero[i][1].charAt(1) 
      && tablero[i][0].charAt(1) === tablero[i][2].charAt(1) 
      && tablero[i][0].charAt(1) !== "-") 
      ||
      (tablero[0][i].charAt(1) === tablero[1][i].charAt(1) 
      && tablero[0][i].charAt(1) === tablero[2][i].charAt(1) 
      && tablero[0][i].charAt(1) !== "-")
    ) {
      return true;
    }
  }

  if (
    (tablero[0][0].charAt(1) === tablero[1][1].charAt(1) 
    && tablero[0][0].charAt(1) === tablero[2][2].charAt(1) 
    && tablero[0][0].charAt(1) !== "-") 
    ||
    (tablero[0][2].charAt(1) === tablero[1][1].charAt(1) 
    && tablero[0][2].charAt(1) === tablero[2][0].charAt(1) 
    && tablero[0][2].charAt(1) !== "-")
  ) {
    return true;
  }

  return false;
}

console.log("¡Bienvenidos a Tres en Raya!");

for (let i = 1; i <= 9; i++) {

  imprimirTablero();

  let posicion = readlineSync.question(`${jugadorActual}, introduce la posición (ejemplo: A1): `);

  let columna = 0;
  if (posicion[0] === 'A') {
    columna = 0;
  } else if (posicion[0] === 'B') {
    columna = 1;
  } else if (posicion[0] === 'C') {
    columna = 2
  }
  let fila = parseInt(posicion[1]) - 1;

  if (fila >= 0 && fila < 3
    && columna >= 0 && columna < 3
    && vacio.includes(tablero[fila][columna])) {

      if (jugadorActual === "Jugador 1") {
        tablero[fila][columna] = tablero[fila][columna].replace("-", "X");
      } else if (jugadorActual === "Jugador 2") {
        tablero[fila][columna] = tablero[fila][columna].replace("-", "O");
      }

      if (comprobarCombinacionGanadora()) {
        imprimirTablero();
        console.log(`${jugadorActual} gana!`);
        break;
      }

      jugadorActual = jugadorActual === "Jugador 1" ? "Jugador 2" : "Jugador 1";

      if (i === 9 && !comprobarCombinacionGanadora()) {
        imprimirTablero();
        console.log("Empate!");
        break;
      }

    } else {
      console.log("Introduce una posición válida!");
      i--;
    }
}
