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
// richiamo il canvas con l'id tempo
const doughnut = document.querySelector(".doughnut");
const context = doughnut.getContext("2d");
let domandaCorrente; //viene definita in visualizzaDomanda()
const tempo = document.getElementById("tempo");
let timerId;

// setto tutto a 11 per ovviare al ritardo di caricamento del grafico e timer

const timeStart = () => {
  const t = { total: 11, secondi: 11 }; // Definisci due colori distinti
  const elapsedTimeColor = "#00FFFF"; // Colore per il tempo trascorso
  const remainingTimeColor = "#8d6495"; // Colore per il tempo mancante
  function updateTimer() {
    if (t.secondi > 0) {
      t.secondi--;
      updateGraph();
      timerId = setTimeout(updateTimer, 1000);
    } else {
      punteggioErrato++;
      cambiaDomanda();
    }
  }

  function updateGraph() {
    let progress = 1 - t.secondi / t.total;

    context.clearRect(0, 0, doughnut.width, doughnut.height);

    const radius = Math.min(doughnut.width / 2, doughnut.height / 2) - 32;
    const centerX = doughnut.width / 2;
    const centerY = doughnut.height / 2;

    const startAngle = -Math.PI / 2;
    const endAngleElapsed = -Math.PI / 2 + 2 * Math.PI * progress;
    const endAngleRemaining = -Math.PI / 2;

    // Disegna la parte del grafico per il tempo trascorso
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngleElapsed, true);
    context.lineWidth = 10;
    context.strokeStyle = elapsedTimeColor;
    context.fillStyle = "transparent";
    context.fill();
    context.stroke();

    // Disegna la parte del grafico per il tempo mancante
    context.beginPath();
    context.arc(centerX, centerY, radius, endAngleElapsed, endAngleRemaining, true);
    context.lineWidth = 10;
    context.strokeStyle = remainingTimeColor;
    context.fillStyle = "transparent";
    context.fill();
    context.stroke();
    context.font = "200 0.5rem Outfit";
    context.fillStyle = "#FFFFFF";
    const originalFont = context.font;
    context.letterSpacing = "0.5px";
    context.fillText("SECONDS", centerX - context.measureText("SECONDS").width / 2, centerY - radius + 22);

    context.font = "300 2.5rem Outfit";
    context.fillText(t.secondi, centerX - context.measureText(t.secondi).width / 2, centerY + 12);

    context.font = originalFont;
    context.fillText("REMAINING", centerX - context.measureText("REMAINING").width / 2, centerY + radius - 18);
  }

  updateTimer();
};

window.onload = function () {
  timeStart();
};
// richiamo gli elementi e creo un indice per leggere il const question.

let iQuest = 0; //indice delle questions

const domande = document.getElementById("domande");
const risposte = document.getElementById("risposte");
//creo il numero della pagina interattivo

const pagine = document.getElementById("pages");
//imposto il suo testo con i backtick in modo da rendere interattivo il suo indice e gli do +1 perchè parte da 0
pagine.innerText = `QUESTION ${iQuest + 1}`;

const cambiaDomanda = () => {
  //verifico se il punteggio viene assegnato in modo corretto
  mostraPunteggioParziale();
  //verifico che l'indice iQuest sia inferiore alla lunghezza dell'array questions
  if (iQuest < questions.length - 1) {
    // con l'incremento dell'indice ci assicuriamo che quando la funzione è chiamata leggiamo la domanda successiva
    iQuest++;
    // chiama la funzione con l'indice aggiornato
    visualizzaDomanda(iQuest);
    // sovrascrivo il numero della pagina con l'indice aggiornato
    pagine.innerText = `QUESTION ${iQuest + 1}`;
    clearTimeout(timerId); // elimino
    timeStart(); // riavvio il timer
  } else {
    resultPage();
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
//creo una variabile per creare un punteggio
let punteggioCorretto = 0;
let punteggioErrato = 0;
// questa funzione serve a verificare se la risposta è giusta ed ad aggiungere un punteggio

// definizione di resultPage
const resultPage = () => {
  const body = document.querySelector("body");
  body.innerHTML = "";

  const container = document.createElement("div"); // Scommenta questa linea
  body.classList.add("container");
  container.innerHTML = `
    <header>
      <img class="logo" src="./assets (1)/epicode_logo.png" alt="Epicode logo" />
    </header>
    <main>
      <div class="title white">Results</div>
      <div class="subTitle white">The summary of your answers:</div>
      <div class="results" id="results">
        <div class="verticalCenter">
          <div class="perc-correct textCenter">${punteggioCorretto * 10}%</div>
          <div class="res-right"></div>
        </div>
        <canvas id="donutChart" class="res-donut" width="150" height="150"></canvas>
        <div class="verticalCenter">
          <div class="perc-wrong textCenter">${punteggioErrato * 10}%</div>
          <div class="res-wrong"></div>
        </div>
      </div>
      <a href="feedback.html" class="btn-rate white">RATE US</a>
    </main>
  `;
  body.appendChild(container); // Scommenta questa linea
  const correctResult = document.querySelector(".res-right");
  correctResult.innerHTML = `<p>${punteggioCorretto} / 10 corrette</p>`;

  const scorrectResult = document.querySelector(".res-wrong");
  scorrectResult.innerHTML = `<p>${punteggioErrato} / 10 sbagliate</p>`;

  const donutChartCanvas = document.getElementById("donutChart");
  const donutChartContext = donutChartCanvas.getContext("2d");

  const correctPercentage = (punteggioCorretto / 10) * 100;
  const wrongPercentage = (punteggioErrato / 10) * 100;

  // grafico risultati
  const centerX = donutChartCanvas.width / 2;
  const centerY = donutChartCanvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;
  const startAngle = -Math.PI / 2;
  const endAngleCorrect = startAngle + (2 * Math.PI * correctPercentage) / 100;
  const endAngleWrong = endAngleCorrect + (2 * Math.PI * wrongPercentage) / 100;

  // parte corrette
  donutChartContext.beginPath();
  donutChartContext.arc(centerX, centerY, radius, startAngle, endAngleCorrect);
  donutChartContext.strokeStyle = "#4CAF50";
  donutChartContext.lineWidth = 20;
  donutChartContext.stroke();

  // parte sbagliate
  donutChartContext.beginPath();
  donutChartContext.arc(centerX, centerY, radius, endAngleCorrect, endAngleWrong);
  donutChartContext.strokeStyle = "red";
  donutChartContext.stroke();
};
//visualizzo domande randomicamente

const verificaRisposta = (rispSelezionata, rispCorretta) => {
  if (rispSelezionata === rispCorretta) {
    punteggioCorretto++;
  } else {
    punteggioErrato++;
  }
};

const visualizzaDomanda = (iQuest) => {
  domandaCorrente = questions[iQuest]; // creo una variabile per semplificare la lettura contenente l'indice di questions
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
    //gli assegno al click due funzioni
    button.addEventListener("click", () => {
      verificaRisposta(risposta, domandaCorrente.correct_answer); //punteggio
      cambiaDomanda(); //cambio domanda
    });
    //scrivo all'interno il testo della risposta
    button.innerText = risposta;
    //inserisco i button nel div
    risposte.appendChild(button);
  });
};

// avvio la funzione
visualizzaDomanda(iQuest);

function mostraPunteggioParziale() {
  const totaleDomande = questions.length;
  const percentualeCorretto = (punteggioCorretto / totaleDomande) * 100;
  const percentualeErrato = (punteggioErrato / totaleDomande) * 100;

  console.log(`Punteggio Corretto: ${punteggioCorretto}/${totaleDomande} (${percentualeCorretto}%)`);
  console.log(`Punteggio Errato: ${punteggioErrato}/${totaleDomande} (${percentualeErrato}%)`);
}
