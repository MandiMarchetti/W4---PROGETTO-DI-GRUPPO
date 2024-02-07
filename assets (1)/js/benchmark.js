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

const tempo = document.getElementById("tempo"); // richiamo il canvas con l'id tempo
const timers = []; // creo un array così da avere un timer per ogni domanda

const doughnut = document.querySelector(".doughnut"); // ho dato una classe in modo che non vada in conflitto con l'id tempo
const context = doughnut.getContext("2d"); // da lo stile al grafico

//setto il timer

function tempoRimasto(scadenza) {
  let now = new Date().getTime();
  let tempoRimasto = scadenza - now;
  let sec = Math.floor((tempoRimasto / 1000) % 60);
  let total = Math.ceil(tempoRimasto / 1000);
  return { secondi: sec, total: total };
}

//Creo il timer e gli assegno come stile il doughnut

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

  timers.push(intervalloTempo); // faccio un push nell'array dei timer
}

// richiamo gli elementi e creo un indice per leggere il const question.

let iQuest = 0;

const domande = document.getElementById("domande");
const risposte = document.getElementById("risposte");

//creo il numero della pagina interattivo

const pagine = document.getElementById("pages");
//imposto il suo testo con i backtick in modo da rendere interattivo il suo indice e gli do +1 perchè parte da 0
pagine.innerText = `QUESTION ${iQuest + 1}`;

//inizializzo il timer quando apro la domanda
let scadenza = new Date().getTime() + 10000;
inizializzoTimer("tempo", scadenza);

// creo due variabili che mi serviranno per assegnare il punteggio al cambio domanda
let punteggioCorretto = 0;
let punteggioErrato = 0;

const cambiaDomanda = () => {
  //al cambio domanda assegno un valore alla risposta
  //creo una variabile richiamando i button selezionati (checked)
  const rispostaUtente = document.querySelector('button[type="radio"]:checked');
  //creo un if ed else dove se rispondo correttamente la mia variabile di punteggioCorretto aumenterà di 1, altrimenti aumenta quello di punteggioErrato
  if (rispostaUtente && rispostaUtente.value === domandaCorrente.correct_answer) {
    punteggioCorretto++;
  } else {
    punteggioErrato++;
  }

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

//creo una funzione generica che serva a mischiare elementi all'interno di array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//visualizzo domande randomicamente

const visualizzaDomanda = (iQuest) => {
  // creo una variabile per semplificare la lettura contenente l'indice di questions
  const domandaCorrente = questions[iQuest]; //inserisco le domande nel mio h1 in HTML
  domande.innerText = domandaCorrente.question;
  //cancello le risposte al rinnovo della domanda
  risposte.innerText = "";
  //creo una copia dell'array di risposte sbagliate
  const risposteSbagliate = [...domandaCorrente.incorrect_answers];
  //creo una variabile più leggibile delle risposte corrette
  const rispostaCorretta = domandaCorrente.correct_answer;

  //mescolo le risposte giuste con le sbagliate
  const risposteMiste = shuffleArray([...risposteSbagliate, rispostaCorretta]);
  //creo i button con dentro le risposte
  risposteMiste.forEach((risposta) => {
    //creo un button per ogni risposta
    const button = document.createElement("button");
    //assegno un tipo al button
    button.type = "radio";
    //gli assegno al click la funzione che cambia domanda
    button.onclick = cambiaDomanda;
    //scrivo all'interno il testo della risposta
    button.innerText = risposta;
    //inserisco i button nel div
    risposte.appendChild(button);
  });
};

// avvio la funzione
visualizzaDomanda(iQuest);
