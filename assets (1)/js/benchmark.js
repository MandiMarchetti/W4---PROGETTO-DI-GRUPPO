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
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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

//   richiamo gli elementi e creo un indice per leggere il const question.

let iQuest = 0;

const domande = document.getElementById("domande");
const risposte = document.getElementById("risposte");

const cambiaDomanda = () => {
  if (iQuest < questions.length) {
    iQuest++;
    visualizzaDomanda(iQuest);
  }
};

// creo una funzione che mi permetta di visualizzare le domande con le risposte

const visualizzaDomanda = (iQuest) => {
  const domandaCorrente = questions[iQuest];
  domande.innerText = domandaCorrente.question;

  risposte.innerText = "";

  if (domandaCorrente.type === "multiple") {
    for (let i = 0; i < domandaCorrente.incorrect_answers.length; i++) {
      const risposta = domandaCorrente.incorrect_answers[i];

      const labelIncorrect = document.createElement("label");
      const inputIncorrect = document.createElement("input");
      // definisco gli input che devono avere le risposte
      inputIncorrect.type = "radio";
      inputIncorrect.name = `risposta_${iQuest}`;
      inputIncorrect.value = "sbagliata";
      inputIncorrect.onclick = cambiaDomanda;
      //inserisco gli elementi nell'HTML
      labelIncorrect.appendChild(inputIncorrect);
      labelIncorrect.appendChild(document.createTextNode(risposta));
      risposte.appendChild(labelIncorrect);
    }

    const labelCorrect = document.createElement("label");
    const inputCorrect = document.createElement("input");
    inputCorrect.type = "radio";
    inputCorrect.name = `risposta_${iQuest}`;
    inputCorrect.value = "Giusta!";
    inputCorrect.onclick = cambiaDomanda;
    labelCorrect.appendChild(inputCorrect);
    labelCorrect.appendChild(document.createTextNode(domandaCorrente.correct_answer));
    risposte.appendChild(labelCorrect);
  } else if (domandaCorrente.type === "boolean") {
    const labelTrue = document.createElement("label");
    const inputTrue = document.createElement("input");
    inputTrue.type = "radio";
    inputTrue.name = `risposta_${iQuest}`;
    inputTrue.value = "Giusta!";
    inputTrue.onclick = cambiaDomanda;
    labelTrue.appendChild(inputTrue);
    labelTrue.appendChild(document.createTextNode(domandaCorrente.correct_answer));
    risposte.appendChild(labelTrue);

    const labelFalse = document.createElement("label");
    const inputFalse = document.createElement("input");
    inputFalse.type = "radio";
    inputFalse.name = `risposta_${iQuest}`;
    inputFalse.value = "Giusta!";
    inputFalse.onclick = cambiaDomanda;
    labelFalse.appendChild(inputFalse);
    labelFalse.appendChild(document.createTextNode(domandaCorrente.incorrect_answers));
    risposte.appendChild(labelFalse);
  }
};

visualizzaDomanda(iQuest);
