import { Ball } from "./Ball.js";
import { Player } from "./Player.js";

export class Game {
  constructor(width, height, framePerSeconds) {
    /* Global Game Params */
    this.width = width;
    this.height = height;
    this.framePerSeconds = framePerSeconds;
    this.loop = null;
    this.isPaused = false;

    /* Game Components */
    this.leftPlayer = new Player(
      0,
      (this.height - 100) / 2,
      10,
      100,
      0,
      "WHITE"
    );
    this.rightPlayer = new Player(
      this.width - 10,
      (this.height - 100) / 2,
      10,
      100,
      0,
      "WHITE"
    );
    this.ball = new Ball(this.width / 2, this.height / 2, 10, 5, 5, 7, "WHITE");
  }

  drawNet(ctx) {
    for (let i = 0; i <= this.height; i += 15) {
      ctx.fillStyle = "WHITE";
      ctx.fillRect((this.width - 2) / 2, 0 + i, 2, 10);
    }
  }

  drawScores(ctx) {
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(this.leftPlayer.score, this.width / 4, this.height / 5);
    ctx.fillText(this.rightPlayer.score, (3 * this.width) / 4, this.height / 5);
  }

  render(ctx) {
    ctx.clearRect(0, 0, this.width, this.height);
    this.drawScores(ctx);
    this.drawNet(ctx);
    this.leftPlayer.drawPlayer(ctx);
    this.rightPlayer.drawPlayer(ctx);
    this.ball.drawBall(ctx);
  }

  updateGameScores() {
    if (this.ball.x - this.ball.radius < 0) {
      this.rightPlayer.score++;
      this.ball.resetBall(this.width, this.height);
    } else if (this.ball.x + this.ball.radius > this.width) {
      this.leftPlayer.score++;
      this.ball.resetBall();
    }
  }

  autoAiControl() {
    this.rightPlayer.y +=
      (this.ball.y - (this.rightPlayer.y + this.rightPlayer.height / 2)) * 0.1;
    if (this.rightPlayer.y < 0) {
      this.rightPlayer.y = 0;
    } else if (this.rightPlayer.y + this.rightPlayer.height > this.height) {
      this.rightPlayer.y = this.height - this.rightPlayer.height;
    }
  }

  update() {
    /* Scoring Logic */
    this.updateGameScores();

    /* ball velocity and move */
    this.ball.moveBall();

    /* let's make the right player follow the ball */
    this.autoAiControl();

    /* Ball Collision with the top and bottom of the world */
    this.ball.ballTopAndBottomCollision(this.height);

    /* we check if the paddle hit the user or the com paddle */
    let player =
      this.ball.x + this.ball.radius < this.width / 2
        ? this.leftPlayer
        : this.rightPlayer;

    if (this.ball.ballPlayerCollision(player)) {
      // we check where the ball hits the paddle
      let collidePoint = this.ball.y - (player.y + player.height / 2);
      collidePoint = collidePoint / (player.height / 2);
      let angleRad = (Math.PI / 4) * collidePoint;
      let direction = this.ball.x + this.ball.radius < this.width / 2 ? 1 : -1;
      this.ball.velocityX = direction * this.ball.speed * Math.cos(angleRad);
      this.ball.velocityY = this.ball.speed * Math.sin(angleRad);
      this.ball.speed += 0.1;
    }
  }

  startGame(ctx) {
    this.loop = setInterval(() => {
      if (!this.isPaused) {
        this.render(ctx);
        this.update();
      }
    }, 1000 / this.framePerSeconds);
  }

  resumeGame(ctx) {
    this.isPaused = false;
    clearInterval(this.loop);
    this.startGame(ctx);
  }

  pauseGame() {
    this.isPaused = true;
    clearInterval(this.loop);
  }
}
