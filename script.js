// Get elements
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const revealScreen = document.getElementById("reveal-screen");

const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");

const heart = document.getElementById("heart");

// Hidden heart position
let heartX = 0;
let heartY = 0;

// Start the game
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  placeHeartRandomly();
});

// Randomly place the heart somewhere on the screen
function placeHeartRandomly() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  heartX = Math.random() * (screenWidth - 80); // 80px heart size
  heartY = Math.random() * (screenHeight - 200); // avoid bottom area

  heart.style.left = heartX + "px";
  heart.style.top = heartY + "px";
}

// Detect clicks
gameScreen.addEventListener("click", (event) => {
  const clickX = event.clientX;
  const clickY = event.clientY;

  const distance = Math.hypot(clickX - heartX, clickY - heartY);

  if (distance < 60) {
    revealHeart();
  }
});

// Reveal the heart + go to reveal screen
function revealHeart() {
  heart.classList.add("found");

  setTimeout(() => {
    gameScreen.classList.add("hidden");
    revealScreen.classList.remove("hidden");
  }, 800);
}

// Play again
playAgainBtn.addEventListener("click", () => {
  revealScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  heart.classList.remove("found");
  placeHeartRandomly();
});
