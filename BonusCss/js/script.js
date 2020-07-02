// ----------   BONUS   ----------

//Quando l'utente preme il bottone genera campo creo l'array con le mine e stampo una lista ul nell'html che rappresenta graficamente il campo minato.

// dichiaro queste variabili fuori dalle funzioni perchè poi dovrò usarle in altre funzioni. Il tasto genera modifica i valori di queste funzioni. il tasto gioca utilizzerà questi valori
var numDiff;
var mine;
var storicoTentativi; // questa variabile viene inizializzata premendo genera campo in modo che si possano giocare più partite sullo stesso campo
var piuPartite;
var quanteMine = 16;
document.getElementById("btnGenera").addEventListener("click", function(){

  //azzero i giochi precedenti
  numDiff = 0;
  mine = [];
  storicoTentativi = [];
  piuPartite = false;
  //HTML
  document.getElementById("campoMinato").innerHTML = "";
  document.getElementById("esito").innerHTML = "Risultato ultima partita: " + document.getElementById("esito").innerHTML;
  // chiedo all'utente un input per determinare la difficoltà


  // assegno una variabile che cambia alcuni valori successivi del gioco per determinare la difficolta.
  while (numDiff == 0){
    var difficolta = parseInt(prompt("Inserisci 0 per difficoltà facile, 1 per media, 2 per difficile:"))
    if (difficolta == 0) {
      numDiff = 100;
    } else if (difficolta == 1){
      numDiff = 80;
    } else if (difficolta == 2){
      numDiff = 50;
    }

  }


  // ------- CREO UN ARRAY CON 16 NUMERI CASUALI TRA 1 E 100. ------

  var nuovoNum;

  while(mine.length < quanteMine){ //ripeto il while finchè non ho generato 16 mine
    nuovoNum = numeroCasualeTra(1, numDiff);
    if (!cercaElemento(nuovoNum, mine)) { // genero un nuovo numero e lo aggiungo a mine solo se non è già presente nell'array mine
      mine.push(nuovoNum);
    }
  }

  console.log(mine);


// ---------- PARTE HTML -------------
//stampo una lista di <li> di numero diverso a seconda della difficoltà scelta. i li rappresenteranno dei blocchetti. ad ogni li do un id diverso in modo da poterli modificare singolarmente man mano che il gioco prosegue

for (var i = 1; i <= numDiff; i++) {
  document.getElementById("campoMinato").innerHTML += "<li id=\"pos-" + i +"\" >" + i +"</li>";
}

});


// ----- BOTTONE GIOCA -----
// fa partire effettivamente il gioco. utilizza numDiff per sapere quante sono in totale le caselle e l'array mine[] per sapere dove sono le mine

document.getElementById("btnGioca").addEventListener("click", function(){

  // -------- CHIEDO IL NUMERO ALL'UTENTE E VERIFICO I TENTATIVI ---------
  var esplosione = false;
  var numeroUtente;

  // Html
  // ripristino l'animazione su BOOM
  document.getElementById("boom").classList.remove("animazione");




  while (storicoTentativi.length < numDiff - quanteMine && !esplosione ){ // procedo finche non i tentativi sono tutti i numeri meno le mine (partita vinta) o l'utente ha preso una mina quindi esplosione è true

    numeroUtente = parseInt(prompt("Inserisci un numero"));

    //html
    // variabile con indirizzo della casella nell'html
    var casella = document.getElementById("pos-" + numeroUtente);

    if (isValid(1, numDiff, numeroUtente) && !cercaElemento(numeroUtente, storicoTentativi)){  //verifica validità input

      if (cercaElemento(numeroUtente, mine)) {//in caso di input valido lo confronto con mine[]

        console.log("BOOM");
        esplosione = true;
        // HTML
        // se nella casella c'è una mina metto l'icona di una bomba e cambio lo sfondo
        casella.innerHTML = "<i class=\"fas fa-bomb\"></i>";
        casella.classList.add("bomb");
        document.getElementById("boom").classList.add("animazione");
        console.log(numeroUtente);
      } else {
        storicoTentativi.push(numeroUtente);
        // HTML
        // Se nella casella non c'è una mina aggiungo una bandierina sulla casella e cambio lo sfondo con una classe
        casella.innerHTML = "<i class=\"fas fa-flag\"></i>";
        casella.classList.add("safe");
        console.log(numeroUtente);
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
  var esito = document.getElementById("esito");
  if (storicoTentativi.length == 0) { // L'utente ha preso una mina al primo tentativo
    esito.innerHTML = "AHAHAH Mina al primo tentativo!!";
  } else if (storicoTentativi.length == numDiff - quanteMine){ // L'utente ha inserito tutti i numeri escluse le mine
    esito.innerHTML = "Incredibile! Hai evitato tutte le mine. Complimenti!";
  } else {
    esito.innerHTML = "Non male... Punteggio: " + (storicoTentativi.length);
  }
  // con più partite sullo stesso campo resta da risolvere la questione punteggio

});




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
