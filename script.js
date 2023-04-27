const codigo = [];
const maxIntento = 8;
const maxIteración = 5;

let tries = 0;
var i = 0; // "slector" de los numeros dentro del codigo del usuario (esta declarado aqui para poderla usar libremente sin tener que ir declarando contadores por doquier)

let writeCell = document.getElementById("numero"); // autoselect del <input> donde el usuario escribe el numero 
writeCell.focus({focusvisible: true});

writeCell.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
  }
});

/*1. Genera una constante CODIGO_SECRETO de tipo array de 5 número aleatorios entre 0 y 9 usando la libreria Math.random();*/
function codigoSecreto() {
    for (let i = 0; i < 5; i++) {
        codigo[i] = Math.floor((Math.random() * 10));
        console.log(codigo[i]);
    }
}

codigoSecreto();

//funcion que comprueba si coincide el numero secreto con el del usuario
function Comprobar() {


    let userNum = document.getElementById("numero").value; //numero del usuario
    let separate;// numero del usuario separado por caracteres
    const numArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let allCharsAreNums = true;

    if (userNum.length == 5) { // Condicionamos que el input sea de 5 cifras
        separate = userNum.split(""); 
    }else{
        alert("El número debe tener 5 cifras")
    }

    for (const number of separate) {
        if (!numArray.includes(number)) {
            alert("El no debe contener ningún caràcter que no sea un número")
            allCharsAreNums = false;
            break;
        }
    }

    if (allCharsAreNums == true) {
            
        let codeResult = document.querySelectorAll(".cel"); //celdas donde se mostrara el numero acertado

        let cellTextResult;
        let cells;
        let cellText;

        let n = 0; // "slector" de los numeros dentro del input del usuario (esta declarado aqui para que se resetee a cada comprobacion)

        tries++; 
        let winCount = 0;

        // Comprobacion de win
        for (let i = 0; i < codigo.length; i++) {
            if (codigo[i] == separate[i]) {
                winCount++;
            }
        }

        if (winCount == 5) { // Enseñar al usuario que ha ganado*

            let pIntents = document.getElementById("info");
            pIntents.innerText = "Lo has logrado, enhorabuena!"; // * por texto

            for (i = 0; i < maxIteración; i++) {
                ShowCorrect(codeResult, cellTextResult, separate, i); // Coloca todos los numeros del input a la cabecera
            }

            pIntents.parentElement.style.backgroundColor =  "green"; // * y por color
            pIntents.parentElement.style.borderColor =  "green";

        }
        else if (tries <= maxIntento) {

            createFilas(tries); // Creamos una nueva fila de celdas para luego llenarlas y corregirlas (pintarlas)

            for (i = 0; i < maxIteración; i++) {

                switch (true) {

                    case separate[n] == codigo[i]: // input i codigo coinciden

                        ShowCorrection("green", separate, n); //pinta la nueva celda correspondiente de verde (correcto) y con su numero
                        
                        ShowCorrect(codeResult, cellTextResult, separate, n, i); // Coloca todos los numeros del input a la cabecera
                        
                        break;

                    case separate[n] != codigo[i]: // input i codigo no coinciden

                        let inWrongPosition = 0; 
                        // Contador de numeros en posición errónea. Se hace uso de este contador porqué, si el numero en question aparece antes en el codigo que en el input,
                        // se pinta de rojo i no deja que se pinte de amarillo cuando le toca. Haciendo esto, no se pinta hasta que llega al final de la comparacion o se pinta de amarillo

                        for (const number of codigo) {

                            if (separate[n] == number) {
                                ShowCorrection("yellow", separate, n); //pinta la nueva celda correspondiente de amarillo (numero en posicion errónea) y con su numero
                                inWrongPosition++;
                                break;
                            }
                            else if (number == codigo[4] && inWrongPosition == 0){ 
                                ShowCorrection("red", separate, n); //pinta la nueva celda correspondiente de rojo (incorrecto) y con su numero
                                break;
                            }
                        }
                        break;
                    default:
                        break;
                }
                n++;
            }
        }
    }
    let writeCell = document.getElementById("numero");
    writeCell.focus({focusvisible: true});
}

// Coloca todos los numeros del input a la cabecera
// Para que colo se coloque el numero 1 vez (i no a cada comprobación), si es correco i se coloca en la cabecera, esa celda queda marcada para no repetirse
function ShowCorrect(codeResult, cellTextResult, separate, i) {
    if (!codeResult[i].hasAttribute("checked")) {
        cellTextResult = document.createTextNode(separate[i]);
        codeResult[i].appendChild(cellTextResult);
        codeResult[i].setAttribute("checked", "correct")
    }
}

//pinta la nueva celda correspondiente con su numero y correccion
function ShowCorrection(color, separate, n) {
    cells = document.querySelectorAll(".celResult");
    cells[i].style.backgroundColor = color;
    cellText = document.createTextNode(separate[n]);
    cells[i].appendChild(cellText);
}

// Crea una nueva fila de celdas para luego llenarlas y corregirlas (pintarlas)
function createFilas(tries) {

    // Se informa al jugador de sus intentos restantes
    let pIntents = document.getElementById("info")
    pIntents.innerText = "Intentos restantes: " + (maxIntento-tries); 

    // Se crea la div (fila) que contendrà las celdas con sus atributos
    let newRow = document.createElement("div");
    newRow.classList.add("rowResult", "w100", "flex", "wrap");

    // Se selecciona la section que contendra las filas con los distintos inputs
    let section = document.getElementById("Result");

    // Se rellena la div (fila)
    for (let i = 0; i < maxIteración; i++) {

        // Div que contendra la celda con sus atributos
        let newW20 = document.createElement("div");
        newW20.classList.add("w20");

        // Div de la celda con sus atributos
        let newSquare = document.createElement("div");
        newSquare.classList.add("celResult", "flex");

        newW20.appendChild(newSquare);
        newRow.appendChild(newW20);

    }

    // Se inserta la fila de manera que se corran para abajo las respuestas del usuario, quedando primero las mas recentes.
    section.insertAdjacentElement('afterbegin', newRow);

}


