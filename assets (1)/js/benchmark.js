const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

//timer

const tempo = document.getElementById("tempo");
const timers = [];

const doughnut = document.querySelector(".doughnut");
const context = doughnut.getContext("2d");

function tempoRimasto(scadenza) {
  let now = new Date().getTime();
  let tempoRimasto = scadenza - now;
  let sec = Math.floor((tempoRimasto / 1000) % 60);
  let total = Math.ceil(tempoRimasto / 1000);
  return { secondi: sec, total: total };
}

function inizializzoTimer(id, scadenza) {
  const previousTimer = timers.pop();
  if (previousTimer) {
    clearInterval(previousTimer);
  }
  let timer = document.getElementById(id);
  let intervalloTempo = setInterval(function () {
    let t = tempoRimasto(scadenza);
    timer.innerHTML = "secondi: " + t.secondi;

    let progress = 1 - t.total / 10; // Utilizzo di una scala da 0 a 1

    context.clearRect(0, 0, doughnut.width, doughnut.height);

    const radius = Math.min(doughnut.width / 2, doughnut.height / 2) - 40;

    context.beginPath();
    context.arc(doughnut.width / 2, doughnut.height / 2, radius, 0, 2 * Math.PI * progress, true); // l'opzione true fa disegnare l'arco in senso orario
    context.lineWidth = 10; // Impostare la larghezza della linea del bordo
    context.strokeStyle = "#4CAF50"; // Colore del bordo
    context.fillStyle = "transparent"; // Colore del riempimento interno
    context.fill(); // Riempimento interno del cerchio
    context.stroke();

    if (t.total <= 0) {
      clearInterval(intervalloTempo);
      cambiaDomanda();
    }
  }, 1000);

  timers.push(intervalloTempo);
}

// richiamo gli elementi e creo un indice per leggere il const question.

let iQuest = 0;

const domande = document.getElementById("domande");
const risposte = document.getElementById("risposte");

//creo il numero della pagina interattivo

const pagine = document.getElementById("pages");
//imposto il suo testo con i backtick in modo da rendere interattivo il suo indice e gli do +1 perchè parte da 0
pagine.innerText = `QUESTION ${iQuest + 1}`;

const cambiaDomanda = () => {
  //verifico che l'indice iQuest sia inferiore alla lunghezza dell'array questions
  if (iQuest < questions.length) {
    // con l'incremento dell'indice ci assicuriamo che quando la funzione è chiamata leggiamo la domanda successiva
    iQuest++;
    // chiama la funzione con l'indice aggiornato
    visualizzaDomanda(iQuest);
    // sovrascrivo il numero della pagina con l'indice aggiornato
    pagine.innerText = `QUESTION ${iQuest + 1}`;

    timers.forEach((timer) => clearInterval(timer));
    let scadenza = new Date().getTime() + 10000;
    inizializzoTimer("tempo", scadenza);
  }
};

let scadenza = new Date().getTime() + 10000;
inizializzoTimer("tempo", scadenza);
// creo una funzione che mi permetta di visualizzare le domande con le risposte

const visualizzaDomanda = (iQuest) => {
  // creo una variabile per semplificare la lettura contenente l'indice di questions
  const domandaCorrente = questions[iQuest];
  //inserisco le domande nel mio h1 in HTML
  domande.innerText = domandaCorrente.question;
  //cancello le risposte al rinnovo della domanda
  risposte.innerText = "";
  // creo le domande a risposta multipla
  if (domandaCorrente.type === "multiple") {
    // faccio un ciclo for delle domande sbagliate in modo da poter utilizzare l'array
    for (let i = 0; i < domandaCorrente.incorrect_answers.length; i++) {
      const rispostaSbagliata = domandaCorrente.incorrect_answers[i];

      const buttonIncorrect = document.createElement("button");
      // definisco i button che devono contenere le risposte
      buttonIncorrect.type = "radio";
      // inserisco il value per in futuro dare un valore alla risposta e nel caso creare un punteggio
      buttonIncorrect.value = "sbagliata";
      // lo collego alla funzione precedentemente creata in modo che possa andare avanti la domanda
      buttonIncorrect.onclick = cambiaDomanda;
      //inserisco il testo
      buttonIncorrect.innerText = rispostaSbagliata;
      //inserisco i button nell'HTML
      risposte.appendChild(buttonIncorrect);
    }

    //ripeto il procedimento per le domande corrette

    const buttonCorrect = document.createElement("button");
    buttonCorrect.type = "radio";
    buttonCorrect.value = "Giusta!";
    buttonCorrect.onclick = cambiaDomanda;
    buttonCorrect.innerText = domandaCorrente.correct_answer;
    risposte.appendChild(buttonCorrect);

    //ora creo le domande booleane
  } else if (domandaCorrente.type === "boolean") {
    // questa volta creo un bottone per la risposta True e successivamente False
    const buttonTrue = document.createElement("button");
    buttonTrue.type = "radio";
    buttonTrue.value = "Vera!";
    buttonTrue.onclick = cambiaDomanda;
    buttonTrue.innerText = domandaCorrente.correct_answer;
    risposte.appendChild(buttonTrue);

    const buttonFalse = document.createElement("button");
    buttonFalse.type = "radio";
    buttonFalse.value = "Falsa!";
    buttonFalse.onclick = cambiaDomanda;
    buttonFalse.innerText = domandaCorrente.incorrect_answers;
    risposte.appendChild(buttonFalse);
  }
};

// avvio la funzione
visualizzaDomanda(iQuest);
