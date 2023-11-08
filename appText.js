const game = [
  {
    name: "~~願大家共同分享~~",
    a: "#",
    describe: "有什麼不錯的遊戲嗎？一定要寫信告訴我喔~~ ^__^",
    ori: "史萊姆",
  },
  {
    name: "貪食蛇",
    a: "./snake/index.html",
    describe:
      "控制這頭貪吃的蛇，幫助牠吃到更多果實，小心不要讓牠咬傷自己。方向鍵:移動。",
    ori: "作者自製",
  },
  {
    name: "彈彈球",
    a: "./ball/index.html",
    describe: "彈！彈！盡快打破更多的磚頭，創造佳績。考驗你的切球技術！",
    ori: "作者自製",
  },
];

const imgGames = document.querySelector(".imgGames");
const textGames = document.querySelector(".textGames");
const gamesList = document.querySelector(".gamesList");
const allGames = document.querySelector(".allGames");
const oldSchool = document.querySelector(".oldSchool");
const skill = document.querySelector(".skill");

let gameList = "";

function showAllGames() {
  game.forEach((data) => {
    return (gameList += `   
    <tr>
    <td class="p-2 position-relative">
      <a
        href=${data.a}
        class="d-flex flex-wrap align-items-end mt-1 mt-md-0"
        >${data.name}</a
      >
    </td>
    <td class="p-1">
${data.describe}
    </td>
    <td class="p-2">${data.ori}</td>
  </tr>`);
  });
  gamesList.innerHTML = gameList;
}

showAllGames();
