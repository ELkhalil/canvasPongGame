export class Ball {
  constructor(x, y, radius, velocityX, velocityY, speed, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.speed = speed;
    this.color = color;
  }

  drawBall(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  moveBall() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  resetBall(width, height) {
    console.log("resetBall");
    this.x = width / 2;
    this.y = height / 2;
    this.velocityX = -this.velocityX;
    this.speed = 7;
  }

  ballPlayerCollision(player) {
    return (
      player.x < this.x + this.radius &&
      player.y < this.y + this.radius &&
      player.x + player.width > this.x - this.radius &&
      player.y + player.height > this.y - this.radius
    );
  }

  ballTopAndBottomCollision(gameHeight) {
    if (this.y - this.radius < 0 || this.y + this.radius > gameHeight) {
      this.velocityY = -this.velocityY;
    }
  }
}
