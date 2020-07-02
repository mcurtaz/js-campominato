// ----------   BONUS   ----------

// chiedo all'utente un input per determinare la difficoltà
// creo una variabile numDiff che cambierà diversi i valori successivi per determinare la difficolta

var numDiff = 0;

while (numDiff == 0){// piccolo controllo per verificare che l'utente inserisca effettivamente 0 1 o 2

  var difficolta = parseInt(prompt("Scrivi 0 per difficoltà facile, 1 per difficolta media o 2 per difficolta difficile."));

  if (difficolta == 0) {
    numDiff = 100;
  } else if (difficolta == 1){
    numDiff = 80;
  } else if (difficolta == 2){
    numDiff = 50;
  }
}


console.log(difficolta, numDiff);


// ------- CREO UN ARRAY CON 16 NUMERI CASUALI TRA 1 E 100. ------

var mine = [];
var nuovoNum;
var quanteMine = 16;
while(mine.length < quanteMine){ //ripeto il while finchè non ho generato 16 mine
  nuovoNum = numeroCasualeTra(1, numDiff);
  if (!cercaElemento(nuovoNum, mine)) { // genero un nuovo numero e lo aggiungo a mine solo se non è già presente nell'array mine
    mine.push(nuovoNum);
  }
}

console.log(mine);




// -------- CHIEDO IL NUMERO ALL'UTENTE E VERIFICO I TENTATIVI ---------

var esplosione = false;
var numeroUtente;
var storicoTentativi = [];

while (storicoTentativi.length < numDiff - quanteMine && !esplosione ){  // procedo finche non i tentativi sono tutti i numeri meno le mine (partita vinta) o l'utente ha preso una mina quindi esplosione è true

  numeroUtente = parseInt(prompt("Inserisci un numero"));

  if (isValid(1, numDiff, numeroUtente) && !cercaElemento(numeroUtente, storicoTentativi)){ //verifica validità input

    if (cercaElemento(numeroUtente, mine)) {//in caso di input valido lo confronto con mine[]

      console.log("BOOM");
      esplosione = true;

    } else {
      storicoTentativi.push(numeroUtente);
    }

  } else { // Input non valido diversi alert per diversi motivi

    if (cercaElemento(numeroUtente, storicoTentativi)) {
      alert("Hai già provato con questo numero");
    } else if (numeroUtente < 1 || numeroUtente > numDiff){
      alert("Sono ammessi solo numeri compresi tra 1 e " + numDiff);
    } else {
      alert("Input non valido");
    }

  }

}

//  ------ RESTITUISCO IL PUNTEGGIO  -------

// Per restituire il numero di tentativi utilizzo length di storico tentativi


if (storicoTentativi.length == 0) { // L'utente ha preso una mina al primo tentativo
  console.log("AHAHAH");
} else if (storicoTentativi.length == numDiff - quanteMine){ // L'utente ha inserito tutti i numeri escluse le mine
  console.log("Incredibile! Hai evitato tutte le mine. Complimenti!");
} else {
  console.log("Punteggio: " + storicoTentativi.length);
}



// -----------  FUNCTIONS  ------------


// Funzione per generare un numero random tra max e min. Max e min sono inclusi nei possibili risultati.  MIN E MAX NON VANNO INVERTITI. SI SCRIVE COME ARGOMENTO PRIMA MIN E POI MAX!!!

function numeroCasualeTra(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso
}

// Funzione per cercare un elemento in un array. Se l'elemento è presente restituisce true se non è presente restituisce false.

function cercaElemento(elem, array){
  for (var i = 0; i < array.length; i++) {
    if (elem == array[i]) {
      return true;
    }

  }

  return false;
}

// funzione di controllo degli input dell'utente nel giocatore

function isValid(min, max, number){
  if (number >= min && number <= max && !isNaN(number)) { // se il valore è un numero && è maggiore o uguale al minimo && è minore o uguale al massimo la funzione restituisce true. usando l'operatore && la condizione è vera solo se sono vere contemporaneamente tutte e tre le condizioni.
    return true;
  } else{
    return false;
  }
}
