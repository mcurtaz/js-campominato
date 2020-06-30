// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.


// Piccolo test funzioni

var a = numeroCasualeTra(1, 100);
//console.log(a);

var arrayProva = [12, 3, 5, 8];
var elementoProva = 3;

//console.log(cercaElemento(elementoProva, arrayProva));


// Creo un array con 16 numeri casuali tra 1 e 100. Utilizzo un ciclo for e la funzione per numeri casuali

var mine = [];
var nuovoNum;

for (var i = 0; i < 16; i++) {

  // Controllo che il nuovo numero non sia già presente nell'array in modo che non ci siano ripetizioni nelle posizioni delle termine. Il ciclo while continua a generare un numero casuale nella variabile nuovo num fino a quando non genera un numero non presente nell'array mine. A quel punto il ciclo for riprende aggiungendo il nuovoNum all array mine.

  do {
    nuovoNum = numeroCasualeTra(1, 100);
    // console.log(nuovoNum);
  } while (cercaElemento(nuovoNum, mine));


  mine.push(nuovoNum);

}

console.log(mine);

// Chiedo all'utente di inserire un numero. Cerco quel numero nell'array di numeri "vietati". Se c'è esco. se non c'è proseguo.

var esplosione = false;
var numeroUtente;
var i = 0;

// il ciclo si ripete 100 - 16 cioè totale numeri meno le mine. La variabile esplosione diventa true se l'utente mette un numero che corrisponde ad una mina. In quel caso si interrompe il ciclo while.

while(i < 3 && !esplosione){
  numeroUtente = prompt("Inserisci un numero");
  if (cercaElemento(numeroUtente, mine)){
    console.log("BOOM!");
    esplosione = true;
  }
  i++;
}

// Per restituire il numero di tentativi utilizzo semplicemente la variabile i. Alla fine del ciclo comunque i viene incrementato di 1 quindi il numero di tentativi è i - 1. Tranne nel caso che l'utente eviti tutte le mine. In quel caso i finisce con i = 100 - numero di mine.

if (i - 1 == 0) { // L'utente ha preso una mina al primo tentativo
  console.log("AHAHAH");
} else if (i == 3){ // L'utente ha inserito tutti i numeri escluse le mine
  console.log("Incredibile! Hai evitato tutte le mine. Complimenti!");
} else {
  console.log("Punteggio: " + (i - 1) + " tentativi.");
}





// --------  FUNCTIONS  ---------


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
