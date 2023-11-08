const c = document.querySelector(".myCanvas");
const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");
const bestTimeRecord = document.querySelector(".bestTimeRecord");
let circle_x = 160;
let circle_y = 60;
let ballRadius = 10;
let radius = ballRadius * 2;
let xSpeed = 10;
let ySpeed = 10;
let ground_x = 100;
let ground_y = 400;
let groundHeight = 5;
let groundWidth = 90;
let brickArr = [];
let count = 0;
let bestTime = "";
let startTime;
loadBestTime();
bestTimeRecord.innerText = `最快通關速度：${bestTime}秒`;

function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    brickArr.push(this);
    this.visible = true;
  }

  drawBrick() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}

for (let i = 0; i < 30; i++) {
  new Brick(getRandom(0, 375), getRandom(0, 275));
}

function drawCircle() {
  if (!startTime) {
    startTime = new Date();
  }

  brickArr.forEach((brick, index) => {
    if (brick.visible && brick.touchBall(circle_x, circle_y)) {
      count++;
      brick.visible = false;

      if (circle_y >= brick.y + brick.height) {
        ySpeed *= -1;
        circle_y -= 20;
      } else if (circle_y <= brick.y) {
        ySpeed *= -1;
        circle_y += 20;
      } else if (circle_x >= brick.x + brick.width) {
        circle_x -= 20;
        xSpeed *= -1;
      } else if (circle_x <= brick.x) {
        circle_x += 20;

        xSpeed *= -1;
      }

      if (count == 30) {
        const nowSec = new Date();
        const thisTime = (nowSec - startTime) / 1000;

        alert(`遊戲結束，您總共花費${thisTime}秒`);

        clearInterval(game);
        setBestTime(thisTime);
      }
    }
  });

  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + groundWidth + radius &&
    circle_y >= ground_y - radius &&
    circle_y < ground_y + groundHeight + radius
  ) {
    let impactPosition = (circle_x - ground_x) / groundWidth;
    let xSpeedChange = (impactPosition - 0.5) * 2; // -1 到 1 的值，基于撞击点在板子上的位置
    xSpeed += xSpeedChange * 2; // 根据撞击点的位置改变水平速度

    // 讓球從板子上彈起
    ySpeed *= -1;

    // 調整球的y位置，避免重疊
    circle_y = ground_y - radius;
  }

  if (circle_x >= canvasWidth - radius) {
    circle_x -= 20;
    xSpeed *= -1;
  } else if (circle_x <= radius) {
    circle_x += 20;
    xSpeed *= -1;
  } else if (circle_y >= canvasHeight - radius) {
    alert(`YOU LOSE!`);
    clearInterval(game);
  } else if (circle_y <= radius) {
    circle_y += 20;
    ySpeed *= -1;
  }

  circle_x += xSpeed;
  circle_y += ySpeed;

  const maxSpeed = 15;
  xSpeed = Math.max(Math.min(xSpeed, maxSpeed), -maxSpeed);
  ySpeed = Math.max(Math.min(ySpeed, maxSpeed), -maxSpeed);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  brickArr.forEach((brick) => {
    // brick.drawBrick();
    if (brick.visible) {
      brick.drawBrick();
    }
  });

  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, groundWidth, groundHeight);
  c.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    ground_x = touchX - groundWidth / 2;
  });

  c.addEventListener("mousemove", (e) => {
    ground_x = e.clientX - window.innerWidth * 0.4;
  });

  ctx.beginPath();
  ctx.arc(circle_x, circle_y, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill();
}

const game = setInterval(drawCircle, 20);

function loadBestTime() {
  if (localStorage.getItem("bestTime") == null) {
    bestTime = "未有通關紀錄";
  } else {
    bestTime = Number(localStorage.getItem("bestTime"));
  }
}

function setBestTime(thisTime) {
  if (thisTime < bestTime || bestTime == "未有通關紀錄") {
    localStorage.setItem("bestTime", thisTime);
    bestTime = thisTime;
  }
}

const task = document.querySelector(".task");
let isBlock = true;
setInterval(() => {
  if (isBlock) {
    task.classList.add("opacity-0");
    isBlock = false;
  } else {
    task.classList.remove("opacity-0");
    isBlock = true;
  }
}, 500);
