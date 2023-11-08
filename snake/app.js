const canvas = document.querySelector("#myCanvas");
//會回傳一個canvas 的 drawing context(繪圖環境)
//drawing context可用來在canvas內畫圖
const ctx = canvas.getContext("2d");

//設定蛇身體的每一個單位
const unit = 20; // 320/20 = 16，所以一行最多16格
const row = canvas.height / unit; //320/20 = 16
const column = canvas.width / unit;

let snake = []; //array中的每個元素都是一個物件
//物件的工作是儲存身體的x,y座標

//為了讓程式碼更簡潔而創造一個func
function createSnake() {
  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20,
    y: 0,
  };
}

class Fruit {
  constructor() {
    //隨機出現，但必須是Unit的倍數
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  //畫出果實
  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  //選定新座標
  pickALocation() {
    //新座標不可跟蛇重疊
    let overlapping = false;
    let new_x;
    let new_y;

    function checkOverlap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    //先做do，如果overlapping還是true就會再繼續做do
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkOverlap(new_x, new_y);
    } while (overlapping);

    this.x = new_x;
    this.y = new_y;
  }
}

//初始設定
createSnake();
let myFruit = new Fruit();
window.addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(e) {
  if (e.key == "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key == "ArrowUp" && d != "Down") {
    d = "Up";
  } else if (e.key == "ArrowRight" && d != "Left") {
    d = "Right";
  } else if (e.key == "ArrowDown" && d != "Up") {
    d = "Down";
  }

  //為了防止手速太快，在每次按下上下左右鍵後，在下一幀被畫出來前
  //不接受任何keydown事件，這樣可防蛇反咬自己而自殺
  window.removeEventListener("keydown", changeDirection);
}

//手機設定
const right = document.querySelector(".btn-right");
const left = document.querySelector(".btn-left");
const up = document.querySelector(".btn-up");
const down = document.querySelector(".btn-down");

right.addEventListener("click", changeRight);
left.addEventListener("click", changeLeft);
up.addEventListener("click", changeUp);
down.addEventListener("click", changeDown);
function changeRight() {
  d == "Left" ? "" : (d = "Right");
}
function changeLeft() {
  d == "Right" ? "" : (d = "Left");
}
function changeUp() {
  d == "Down" ? "" : (d = "Up");
}
function changeDown() {
  d == "Up" ? "" : (d = "Down");
}

let score = 0;
let highestScore;
loadHighestScore();

document.querySelector("#myScore").innerText = `遊戲分數：${score}`;
document.querySelector("#myScore2").innerText = `最高分數：${highestScore}`;

let speed = 100;
function draw() {
  if (score > 2) {
    speed = 20;
    clearInterval(myGame); // 先清除原本的Interval
    myGame = setInterval(draw, speed); // 重新設定Interval
  }
  //畫圖前先確認蛇有沒有咬到自己
  //i=1是因為要確認是蛇的"身體"
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(myGame);
      alert("遊戲結束！");
      //因為return draw func了，下面的通通不會被執行
      return;
    }
  }

  //每一次重新畫蛇時先讓背景變回全黑，如果不寫這個，舊的蛇會留在背景，造成pop()失效的感覺
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //執行畫出果實
  myFruit.drawFruit();

  //   console.log("正在執行draw...");
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white";

    //蛇的穿牆要放在這，因為下面是根據這邊的座標來更改蛇的方向
    //在劃出蛇之前就把xy座標更正

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }

    //繪一個實心長方形，座標為x,y,寬,高
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  //以目前的d變數方向來決定蛇的下一幀要放哪個座標
  let snakeX = snake[0].x; //snake[0]是一個物件，但snake[0].x是num，所以是primitive data type而非reference data type
  let snakeY = snake[0].y; //所以snake[0]這個物件不會因為我們寫了snakeX -= unit而改變。
  if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Right") {
    snakeX += unit;
  } else if (d == "Down") {
    snakeY += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //確認蛇是否有吃到果實
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    myFruit.pickALocation();
    score++;
    setHighestScore(score);
    document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
    document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, speed);

function loadHighestScore() {
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore"));
  }
}

function setHighestScore(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
