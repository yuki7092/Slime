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
let bestTime = "未有通關紀錄";
let startTime;
loadBestTime();
bestTimeRecord.innerText = `最快通關速度：${bestTime}`;

//生成某區間的數字：0≤x≤950；0≤y≤550
// 假設min:100，max:500，那我們要做的就是400內的整數
function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

//製作磚塊
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

  //寫在這邊是讓磚塊可確認自己是有和球撞到
  touchBall(ballX, ballY) {
    return (
      ballX >= this.x - radius &&
      ballX <= this.x + this.width + radius &&
      ballY >= this.y - radius &&
      ballY <= this.y + this.height + radius
    );
  }
}

//製作所有磚塊
for (let i = 0; i < 30; i++) {
  new Brick(getRandom(0, 375), getRandom(0, 275));
}

function drawCircle() {
  if (!startTime) {
    startTime = new Date();
  }

  //確認球有沒右打到磚塊
  brickArr.forEach((brick, index) => {
    if (brick.visible && brick.touchBall(circle_x, circle_y)) {
      //改變方向速度，且將brick從arr刪除，並記數
      count++;
      brick.visible = false;

      //從上面撞的 跟 從上面
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

      //   brickArr.splice(index, 1); //切掉arr某元素，會讓元素的排序重新排列，時間複雜度較高
      //   if (brickArr.length == 0) {
      //     alert("遊戲結束");
      //   }

      if (count == 30) {
        const nowSec = new Date();
        const bestTime = (nowSec - startTime) / 1000;

        alert(`遊戲結束，您總共花費${bestTime}秒`);
        // alert(`遊戲結束，您總共花費${mins}分${sec}秒`);
        clearInterval(game);
        setBestTime(bestTime);
      }
    }
  });

  // 確認球有沒有打到板子
  if (
    circle_x >= ground_x - radius &&
    circle_x <= ground_x + groundWidth + radius &&
    circle_y >= ground_y - radius &&
    circle_y <= ground_y + groundHeight + radius
  ) {
    //球仍可在板子裡彈跳，所以要增加此段，產生彈力感
    // ySpeed>0代表球往下掉，讓他向上彈40
    if (ySpeed > 0) {
      circle_y -= 20;
    }
    if (ySpeed < 0) {
      circle_y += 20;
    }
    ySpeed *= -1;
  }

  if (circle_x >= canvasWidth - radius) {
    //確認球是否到達邊界
    circle_x -= 20;
    xSpeed *= -1;
  } else if (circle_x <= radius) {
    circle_x += 20;
    xSpeed *= -1;
  } else if (circle_y >= canvasHeight - radius) {
    alert(`YOU LOSE!`);
    // alert(`遊戲結束，您總共花費${mins}分${sec}秒`);
    clearInterval(game);
    // setBestTime(bestTime);
    // circle_y -= 40;
    // ySpeed *= -1;
  } else if (circle_y <= radius) {
    circle_y += 20;
    ySpeed *= -1;
  }
  //更動圓球的座標
  circle_x += xSpeed;
  circle_y += ySpeed;

  //每次更新都先畫出黑色背景，x、y、寬、高
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  //畫出所有磚塊
  brickArr.forEach((brick) => {
    // brick.drawBrick();
    if (brick.visible) {
      brick.drawBrick();
    }
  });

  //畫出可控制的地板
  ctx.fillStyle = "orange";
  ctx.fillRect(ground_x, ground_y, groundWidth, groundHeight);
  c.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    ground_x = touchX - groundWidth / 2; // 將板子中心對齊觸碰點
  });

  c.addEventListener("mousemove", (e) => {
    // console.log(e); //可看出越往右邊clientX越小，clientX最大就是canvas.width
    ground_x = e.clientX - window.innerWidth * 0.4;
  });

  //劃出圓球，圓形有五個參數:x,y,半徑,起始角度、終點角度
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

function setBestTime(time) {
  if (time < bestTime || bestTime == "未有通關紀錄") {
    localStorage.setItem("bestTime", time);
    bestTime = time;
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
