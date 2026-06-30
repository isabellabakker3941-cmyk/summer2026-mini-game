// Screens
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const revealScreen = document.getElementById("reveal-screen");

// Buttons
const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const submitBtn = document.getElementById("submit-btn");

// Game elements
const scrambleBox = document.getElementById("scramble-box");
const answerBox = document.getElementById("answer-box");

// MULTI-WORD PHRASE
const phrase = "PINK HEART";   // ← change this to anything you want

let scrambled = "";
let answer = [];

// Start game
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  startScrambleGame();
});

// Scramble the phrase (letters only)
function startScrambleGame() {
  const lettersOnly = phrase.replace(/\s+/g, "");
  scrambled = shuffle(lettersOnly.split("")).join("");

  answer = phrase.split("").map(char => char === " " ? " " : "");

  renderScramble();
  renderAnswer();
}

// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Show scrambled letters
function renderScramble() {
  scrambleBox.innerHTML = "";

  scrambled.split("").forEach((letter, index) => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "letter-btn";

    btn.addEventListener("click", () => {
      fillAnswer(letter);
      btn.disabled = true;
    });

    scrambleBox.appendChild(btn);
  });
}

// Show answer blanks (with spaces)
function renderAnswer() {
  answerBox.innerHTML = "";

  answer.forEach((letter) => {
    const slot = document.createElement("span");
    slot.className = "answer-slot";

    slot.textContent = letter === " " ? " " : (letter || "_");

    answerBox.appendChild(slot);
  });
}

// Fill answer slots
function fillAnswer(letter) {
  const emptyIndex = answer.indexOf("");
  if (emptyIndex !== -1) {
    answer[emptyIndex] = letter;
    renderAnswer();
  }
}

// Submit answer
submitBtn.addEventListener("click", () => {
  if (answer.join("") === phrase) {
    gameScreen.classList.add("hidden");
    revealScreen.classList.remove("hidden");
  } else {
    alert("Try again!");
  }
});

// Play again
playAgainBtn.addEventListener("click", () => {
  revealScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  startScrambleGame();
});
