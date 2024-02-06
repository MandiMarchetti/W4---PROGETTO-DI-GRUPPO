//creo una costante che richiami tutti gli elementi con stessa classe imggrayscale, condizione di partenza delle stelle

const ratingStars = [...document.getElementsByClassName("imggrayscale")];

// genero la funzione per illuminare la stella selezionata e tutte quelle presenti a sx
function executeRating(stars) {
  // genero due variabili per le stelle selezionate e quelle non selezionate che richiamano la classe CSS adeguata
  const starClassActive = "activestarsimg";
  const starClassUnactive = "imggrayscale";
  //genero una variabile che corrisponda al valore della lunghezza della
  const starsLength = stars.length;
  let i;
  // creo un nuovo array popolato da ogni elemento della funzione interna
  stars.map((star) => {
    //definisco il comportamento degli elementi al momento del click
    star.onclick = () => {
      i = stars.indexOf(star);
      // genero un if/else statement per definire il comportamento della funzione a seconda della classe assegnata
      if (star.className.indexOf(starClassUnactive) !== -1) {
        //ciclo for per assegnare la classe corretta alla stella selezionata e alle stelle precedenti a sx
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        //ciclo for per assegnare la classe corretta alle stelle non selezionate ovvero quelle a dx
        for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
      }
    };
  });
}
//chiamo la funzione
executeRating(ratingStars);

//genero la funzione per inviare i dati indicati dall'utente nel form al click del bottone

//const button1 = document.getElementById("sendReviewButton");
//const inputText = document.getElementById("reviewComment");

//function sendReview() {
//  inputText.setAttribute("value");
//}

//button1.addEventListener("click", sendReview());

document.getElementById("sendReviewButton").addEventListener("click", function () {
  alert("Grazie per l'attenzione! (ci aspettiamo almeno 10 come voto)");
});
