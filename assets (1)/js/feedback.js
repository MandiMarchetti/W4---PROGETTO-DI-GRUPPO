//creo una costante che richiami tutti gli elementi con stessa classe imggrayscale, condizione di partenza delle stelle

const ratingStars = [...document.getElementsByClassName("unactiveStarsSvg")];

function changeClass(clickedSvg) {
  // Se l'SVG cliccato è già attivo, imposta tutte le stelle come inattive
  if (clickedSvg.classList.contains("active")) {
    const svgs = document.querySelectorAll("svg");
    svgs.forEach((svg) => {
      svg.classList.add("unactive");
      svg.classList.remove("active");
    });
  } else {
    // Altrimenti, esegui la logica precedente
    const svgs = document.querySelectorAll("svg");
    svgs.forEach((svg) => {
      if (svg === clickedSvg || svg.compareDocumentPosition(clickedSvg) & Node.DOCUMENT_POSITION_FOLLOWING) {
        svg.classList.add("active");
        svg.classList.remove("unactive");
      } else {
        svg.classList.add("unactive");
        svg.classList.remove("active");
      }
    });
  }
}

// Aggiungi un evento di click a tutti gli SVG
const svgs = document.querySelectorAll("svg");
svgs.forEach((svg) => {
  svg.addEventListener("click", function () {
    changeClass(this); // Passa l'SVG cliccato alla funzione changeClass
  });
});

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
