export class Player {
  constructor(x, y, width, height, score, color) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = 10;
    this.score = score;
    this.color = color;
    this.moveSpeed = 20;
  }

  drawPlayer(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  movePlayer(gameHeight, direction) {
    if (direction === "up") {
      if (this.y - this.moveSpeed < 0) {
        this.y = 0;
      } else {
        this.y -= this.moveSpeed;
      }
    } else if (direction === "down") {
      if (this.y + this.height + this.moveSpeed > gameHeight) {
        console.log(`${this.y}`);
        this.y = gameHeight - this.height;
      } else {
        this.y += this.moveSpeed;
      }
    }
  }
}
