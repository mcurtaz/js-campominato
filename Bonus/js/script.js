// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// ----------   BONUS   ----------

// chiedo all'utente un input per determinare la difficoltà

var difficolta;

do {
  difficolta = prompt("Scrivi 0 per difficoltà facile, 1 per difficolta media o 2 per difficolta difficile.");
} while (difficolta != "0" && difficolta != "1" && difficolta != "2" );

// assegno una variabile che cambia tutti i valori successivi per determinare la difficolta

var numDiff

if (difficolta == 0) {
  numDiff = 100;
} else if (difficolta == 1){
  numDiff = 80;
} else if (difficolta == 2){
  numDiff = 50;
}

console.log(difficolta, numDiff);
// ------- CREO UN ARRAY CON 16 NUMERI CASUALI TRA 1 E 100. ------

//Utilizzo un ciclo for e la funzione per numeri casuali. In più aggiungo un controllo perchè i numeri non possono ripetersi.

var mine = [];
var nuovoNum;

for (var i = 0; i < 16; i++) {

  // Controllo che il nuovo numero non sia già presente nell'array in modo che non ci siano ripetizioni nelle posizioni delle mine. Il ciclo while continua a generare un numero casuale nella variabile nuovo num fino a quando non genera un numero non presente nell'array mine. A quel punto il ciclo for riprende aggiungendo il nuovoNum all array mine.

  do {
    nuovoNum = numeroCasualeTra(1, numDiff);
    // console.log(nuovoNum);
  } while (cercaElemento(nuovoNum, mine)); //se la condizione è vera. cioè la funzione trova l'elemento il ciclo si ripete


  mine.push(nuovoNum);

}

console.log(mine);



// -------- CHIEDO IL NUMERO ALL'UTENTE E VERIFICO I TENTATIVI ---------


// Chiedo all'utente di inserire un numero. Cerco quel numero nell'array di numeri "vietati". Se c'è esco. se non c'è proseguo.

var esplosione = false;
var numeroUtente;
var i = 0;
var storicoTentativi = [];

// il ciclo si ripete 100 - 16 cioè totale numeri meno le mine. La variabile esplosione diventa true se l'utente mette un numero che corrisponde ad una mina. In quel caso si interrompe il ciclo while.

while(i < numDiff - 16 && !esplosione){


  // CONTROLLO LA VALIDITà DEL NUMERO INSERITO

  // controllo con un while che il nuovo numero inserito non sia già stato inserito verificando nell array storico tentativi. Verifico che quello inserito dall'utente sia un numero e che sia tra 1 e 100.

  do {

    numeroUtente = parseInt(prompt("Inserisci un numero tra 1 e " + numDiff));

    // creo un alert di errore in caso l'utente stia inserendo più volte lo stesso numero, che stia inserendo qualcosa che non è un numero o che stia inserendo un numero non compreso tra 1 e 100

    if (cercaElemento(numeroUtente, storicoTentativi)) {
      alert("Hai già provato con questo numero");
    } else if (isNaN(numeroUtente)){
      alert("é possibile inserire solo numeri");
    } else if (numeroUtente < 1 || numeroUtente > numDiff){
      alert("Sono ammessi solo numeri tra 1 e " + numDiff);
    }

    console.log(numeroUtente);

  } while (cercaElemento(numeroUtente, storicoTentativi) || isNaN(numeroUtente) || numeroUtente < 1 || numeroUtente > numDiff);

  storicoTentativi.push(numeroUtente); // Inserisco il nuovo tentativo dell'utente nello storico dei tentativi per poterli controllare al ciclo successivo

  console.log(storicoTentativi);

  // CONTROLLO SE IL NUMERO CORRISPONDE AD UNA MINA

  if (cercaElemento(numeroUtente, mine)){
    console.log("BOOM!");
    esplosione = true;
  }


  i++;

}


//  ------ RESTITUISCO IL PUNTEGGIO  -------

// Per restituire il numero di tentativi utilizzo semplicemente la variabile i. Alla fine del ciclo comunque i viene incrementato di 1 quindi il numero di tentativi è i - 1 (è vero che i parte da 0 ma l'ultimo tentativo fa esplodere la mina quindi non si conta). Tranne nel caso che l'utente eviti tutte le mine. In quel caso i finisce con i = 100 - numero di mine.


if (i - 1 == 0) { // L'utente ha preso una mina al primo tentativo
  console.log("AHAHAH");
} else if (i == numDiff - 16){ // L'utente ha inserito tutti i numeri escluse le mine
  console.log("Incredibile! Hai evitato tutte le mine. Complimenti!");
} else {
  console.log("Punteggio: " + (i - 1) + " tentativi.");
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