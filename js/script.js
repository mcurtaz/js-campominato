// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati
// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.
// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.




// ------- CREO UN ARRAY CON 16 NUMERI CASUALI TRA 1 E 100. ------

// versione precedente al refactoring commentata

// var mine = [];
// var nuovoNum;
//
// for (var i = 0; i < 16; i++) {
//
//   do {
//     nuovoNum = numeroCasualeTra(1, 100);
//   } while (cercaElemento(nuovoNum, mine)); //se la condizione è vera. cioè la funzione trova l'elemento il ciclo si ripete
//
//
//   mine.push(nuovoNum);
//
// }


//Utilizzo un ciclo for e la funzione per numeri casuali. In più aggiungo un controllo perchè i numeri non possono ripetersi.

var mine = [];
var nuovoNum;

while(mine.length < 16){ //ripeto il while finchè non ho generato 16 mine
  nuovoNum = numeroCasualeTra(1, 100);
  if (!cercaElemento(nuovoNum, mine)) { // genero un nuovo numero e lo aggiungo a mine solo se non è già presente nell'array mine
    mine.push(nuovoNum);
  }
}

console.log(mine);



// -------- CHIEDO IL NUMERO ALL'UTENTE E VERIFICO I TENTATIVI ---------

// ------- versione precedente al refactoring commentata
//
// var esplosione = false;
// var numeroUtente;
// var i = 0;
// var storicoTentativi = [];
//
// while(i < 100 - 16 && !esplosione){
//
//   do {
//
//     numeroUtente = parseInt(prompt("Inserisci un numero tra 1 e 100"));
//
//     if (cercaElemento(numeroUtente, storicoTentativi)) {
//       alert("Hai già provato con questo numero");
//     } else if (isNaN(numeroUtente)){
//       alert("é possibile inserire solo numeri");
//     } else if (numeroUtente < 1 || numeroUtente > 100){
//       alert("Sono ammessi solo numeri tra 1 e 100");
//     }
//
//   } while (cercaElemento(numeroUtente, storicoTentativi) || isNaN(numeroUtente) || numeroUtente < 1 || numeroUtente > 100);
//
//   storicoTentativi.push(numeroUtente); // Inserisco il nuovo tentativo dell'utente nello storico dei tentativi per poterli controllare successivamente
//
//   // CONTROLLO SE IL NUMERO CORRISPONDE AD UNA MINA
//
//   if (cercaElemento(numeroUtente, mine)){
//     console.log("BOOM!");
//     esplosione = true;
//   }
//
//
//   i++;
//
// }
//

var esplosione = false;
var numeroUtente;
var storicoTentativi = [];

while (storicoTentativi.length < 100 - 16 && !esplosione ){ //se il numero di tentativi registrati nell'array storico tentativi è minore delle posizioni - il numero di mine e non c'è stata esplosione (quindi l'utente non ha inserito un numero corrispondente ad una mina il ciclo prosegue). Questo funziona perchè lo storico tentativi viene implementato solo se l'utente inserisce un input valido.

  numeroUtente = parseInt(prompt("Inserisci un numero"));

  if (isValid(1, 100, numeroUtente) && !cercaElemento(numeroUtente, storicoTentativi)){//se il numero dell'utente è valido (funzione di controllo dell'input) e non è già presente nello storico tentativi procedo a verificare se il numero corrisponde ad una mina o no

    if (cercaElemento(numeroUtente, mine)) { //se il numero già validato corrisponde ad una mina la partita finisce altrimenti aggiungo il numero utente allo storico tentativi
      console.log("BOOM");
      esplosione = true;
    } else {
      storicoTentativi.push(numeroUtente);
    }

  } else { // se il numero non è valido possono esserci diversi motivi: 1 è stato inserito un numero già tentato in precedenza. 2 è stato inserito un numero non compreso nel range accettato. 3 è stato inserito qualcosa che non è un numero
    if (cercaElemento(numeroUtente, storicoTentativi)) {
      alert("Hai già provato con questo numero");
    } else if (numeroUtente < 1 || numeroUtente > 100){
      alert("Sono ammessi solo numeri compresi tra 1 e 100");
    } else {
      alert("Input non valido");
    }
  }

}

console.log(storicoTentativi, storicoTentativi.length);


//  ------ RESTITUISCO IL PUNTEGGIO  -------

// Per restituire il numero di tentativi utilizzo length di storico tentativi


if (storicoTentativi.length == 0) { // L'utente ha preso una mina al primo tentativo
  console.log("AHAHAH");
} else if (storicoTentativi.length == 100 - 16){ // L'utente ha inserito tutti i numeri escluse le mine
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
