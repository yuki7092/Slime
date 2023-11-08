const game = [
  {
    name: "~~願大家共同分享~~",
    type: "",
    img: "",
    a: "#",
    describe: "有什麼不錯的遊戲嗎？一定要寫信告訴我喔~~ ^__^",
  },
  {
    name: "貪食蛇",
    type: "懷舊",
    img: '<img src="./img/snake.jpg" class="" alt="" />',
    a: "./snake/index.html",
    describe:
      "控制這頭貪吃的蛇，幫助牠吃到更多果實，小心不要讓牠咬傷自己。方向鍵:移動。",
  },
  {
    name: "彈彈球",
    type: "技巧",

    img: '<img src="./img/ball.jpg" class="" alt="" />',
    a: "./ball/index.html",
    describe: "彈！彈！盡快打破更多的磚頭，創造佳績。考驗你的切球技術！",
  },
];

const imgGames = document.querySelector(".imgGames");
const textGames = document.querySelector(".textGames");
const games = document.querySelector(".games");
const allGames = document.querySelector(".allGames");
const oldSchool = document.querySelector(".oldSchool");
const skill = document.querySelector(".skill");

let gameList = "";

function showAllGames() {
  game.forEach((data) => {
    return (gameList += `   
  <tr>
        <td class="p-2 position-relative">
          <small class="text-muted position-absolute top-0 end-0 pe-1">
            ${data.type}
          </small>
          <a
            href=${data.a}
            class="d-flex flex-wrap align-items-end mt-1 mt-md-0"
          >
            ${data.img} ${data.name}
          </a>
        </td>
        <td class="p-1">
          ${data.describe}
        </td>
      </tr>`);
  });
  games.innerHTML = gameList;
}

function showAllTextGames() {
  game.forEach((data) => {
    return (gameList += `   
  <tr>
        <td class="p-2 position-relative">
          <small class="text-muted position-absolute top-0 end-0 pe-1">
            ${data.type}
          </small>
          <a
            href=${data.a}
            class="d-flex flex-wrap align-items-end mt-1 mt-md-0"
          >
          ${data.img} ${data.name}
          </a>
        </td>
        <td class="p-1">
          ${data.describe}
        </td>
      </tr>`);
  });
  games.innerHTML = gameList;
}

imgGames.addEventListener("click", (e) => {
  e.preventDefault();
  gameList = "";
  showAllGames();
});

imgGames.addEventListener("click", (e) => {
  e.preventDefault();
  gameList = "";
  showAllTextGames();
});

allGames.addEventListener("click", (e) => {
  e.preventDefault();
  gameList = "";
  showAllGames();
});

oldSchool.addEventListener("click", (e) => {
  gameList = "";
  e.preventDefault();
  game.forEach((data) => {
    if (data.type === "懷舊" || data.type === "") {
      console.log(data.type);
      return (gameList += `
  <tr>
        <td class="p-2 position-relative">
          <small class="text-muted position-absolute top-0 end-0 pe-1">
            ${data.type}
          </small>
          <a
            href=${data.a}
            class="d-flex flex-wrap align-items-end mt-1 mt-md-0"
          >
          ${data.img} ${data.name}
          </a>
        </td>
        <td class="p-1">
          ${data.describe}
        </td>
      </tr>`);
    }
  });
  games.innerHTML = gameList;
});

skill.addEventListener("click", (e) => {
  gameList = "";
  e.preventDefault();
  game.forEach((data) => {
    if (data.type === "技巧" || data.type === "") {
      console.log(data.type);
      return (gameList += `
  <tr>
        <td class="p-2 position-relative">
          <small class="text-muted position-absolute top-0 end-0 pe-1">
            ${data.type}
          </small>
          <a
            href=${data.a}
            class="d-flex flex-wrap align-items-end mt-1 mt-md-0"
          >
          ${data.img} ${data.name}
          </a>
        </td>
        <td class="p-1">
          ${data.describe}
        </td>
      </tr>`);
    }
  });
  games.innerHTML = gameList;
});

showAllGames();
