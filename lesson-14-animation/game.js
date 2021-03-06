'use strict';
var widthField = 800;    // ширина поля
var heightField = 400;   // высота поля
var ballSize = 50;       // размер мяча
var racketWidth = 15;    // ширина ракетки
var racketHeight = 150;  // высота ракетки
var racketSpeed = 4;     //скорость ракеток

var requestAnimateFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
var cancelAnimateFrame =
  window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelAnimationFrame ||
  window.msCancelAnimationFrame ||
  function (callback) {
    window.clearTimeout(callback);
  };
var game = {
  field: {
    width: widthField,
    height: heightField
  },
  scrollLeft: {
    width: racketWidth,
    height: racketHeight,
    posX: 0,
    posY: 0,
    SpeedY: 0,
    update: function () {
      document.getElementById('scroll-left').style.transform = 'translate(' + this.posX + 'px, ' + this.posY + 'px)';
    }
  },
  scrollRight: {
    width: racketWidth,
    height: racketHeight,
    posX: 785,
    posY: 0,
    SpeedY: 0,
    update: function () {
      document.getElementById('scroll-right').style.transform = 'translate(' + this.posX + 'px, ' + this.posY + 'px)';
    }
  },
  ball: {
    width: ballSize,
    height: ballSize,
    posX: widthField / 2 - ballSize / 2,
    posY: heightField / 2 - ballSize / 2,
    speedX: Math.floor(Math.random() * 3) + 1,
    speedY: Math.floor(Math.random() * 3) + 1,
    update: function () {
      document.getElementById('ball').style.transform = 'translate(' + this.posX + 'px, ' + this.posY + 'px)';
    }
  },
  counterLeft: 0,
  counterRight: 0,
  moveDown(obj) {
    game.setSpeed(obj);
    obj.posY += obj.SpeedY;
    if (obj.posY + obj.height >= game.field.height) {
      obj.posY = game.field.height - obj.height;
    }
  },
  moveUp(obj) {
    game.setSpeed(obj);
    obj.posY -= obj.SpeedY;
    if (obj.posY < 0) {
      obj.posY = 0;
    }
  },
  setSpeed(obj) {
    obj.SpeedY = racketSpeed;
  },
  scroll(event) {
    switch (event.code) {
      case 'ControlLeft':
        game.moveDown(game.scrollLeft);
        break;
      case 'ShiftLeft':
        game.moveUp(game.scrollLeft);
        break;
      case 'ArrowDown':
        game.moveDown(game.scrollRight);
        break;
      case 'ArrowUp':
        game.moveUp(game.scrollRight);
        break;
    }
    game.scrollRight.update();
    game.scrollLeft.update();
  },
  start() {
    game.init();
    window.requestAnimateFrame(game.play);
    //setInterval(game.play, 40);
  },
  init() {
    this.ball.posX = widthField / 2 - ballSize / 2;
    this.ball.posY = heightField / 2 - ballSize / 2;
    this.ball.speedY = Math.floor(Math.random() * 9) - 4;
    var correctAngle = Math.floor(Math.random() * 9) - 4;
    while (!correctAngle) {
      correctAngle = Math.floor(Math.random() * 9) - 4;
    }
    this.ball.speedX = correctAngle;
    this.ball.update();
  },
  play() {
    game.posXBall();
    game.posYBall();
    if (game.ball.posX + game.ball.width > game.field.width) {
      game.ball.posX = game.field.width - game.ball.width;
      game.counterLeft++;
      game.goal();
    }
    if (game.ball.posX < 0) {
      game.ball.posX = 0;
      game.counterRight++;
      game.goal();
    }
    game.ball.update();
    game.scrollLeft.update();
    game.scrollRight.update();
    window.requestAnimateFrame(game.play);
  },
  posXBall() {
    this.ball.posX += this.ball.speedX;
    if (this.ball.posX + this.ball.width >= this.scrollRight.posX && this.ball.posY >= this.scrollRight.posY && this.ball.posY <= this.scrollRight.posY + this.scrollRight.height) {
      this.ball.speedX = -this.ball.speedX;
      this.ball.posX = this.field.width - this.scrollRight.width - this.ball.width;
    }

    if (this.ball.posX <= this.scrollLeft.posX + this.scrollLeft.width && this.ball.posY >= this.scrollLeft.posY && this.ball.posY <= this.scrollLeft.posY + this.scrollLeft.height) {
      this.ball.speedX = -this.ball.speedX;
      this.ball.posX = this.scrollLeft.width;
    }
    return ball;
  },
  posYBall() {
    this.ball.posY += this.ball.speedY;
    if (this.ball.posY + this.ball.height > this.field.height) {
      this.ball.speedY = -this.ball.speedY;
      this.ball.posY = this.field.height - this.ball.height;
    }
    if (this.ball.posY < 0) {
      this.ball.speedY = -this.ball.speedY;
      this.ball.posY = 0;
    }
    return ball;
  },
  resetSpeed() {
    this.ball.speedX = 0;
    this.ball.speedY = 0;
  },
  goal() {
    this.updateScore();
    this.resetSpeed();
    this.stop();
  },
  stop() {
    window.cancelAnimateFrame(game.play);
  },
  updateScore() {
    document.getElementById('left-score').textContent = this.counterLeft;
    document.getElementById('right-score').textContent = this.counterRight;
  }
};

game.ball.update();
game.scrollLeft.update();
game.scrollRight.update();
document.addEventListener('keydown', game.scroll);
document.getElementById('start').addEventListener('click', game.start);