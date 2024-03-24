import { Game } from "./Game.js";
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
let game = new Game(canvas.width, canvas.height, 60);

/* Selecting Buttons */
const pauseButton = document.getElementById("pauseGame");
const resumeButton = document.getElementById("resumeGame");

/* Adding Event listeners */
pauseButton.addEventListener("click", () => game.pauseGame());

resumeButton.addEventListener("click", () => game.resumeGame(ctx));
canvas.addEventListener("keydown", (e) => {
  handleUserInput(e);
});

function handleUserInput(e) {
  switch (e.code) {
    case "ArrowUp":
      game.leftPlayer.movePlayer(game.height, "up");
      break;
    case "ArrowDown":
      game.leftPlayer.movePlayer(game.height, "down");
      break;
  }
}

game.startGame(ctx);
