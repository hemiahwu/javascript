// 获取节点
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// 游戏单词
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving"
];

// 初始单词（随机）
let randomWord;

// 初始得分
let score = 0;

// 初始时间
let time = 10;

// 难度选择
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// 更新难度选项
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// 聚焦到text输入框
text.focus();

// 开始倒数
const timeInterval = setInterval(updateTime, 1000);

// 设置随机产生单词
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
// console.log(getRandomWord());

// 更新单词到DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// 更新得分
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
//更新剩余时间updateTime
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    // 游戏结束
    gameOver();
  }
}

// 提示游戏结束
function gameOver() {
  endgameEl.innerHTML = `
    <h1>游戏结束</h1>
    <p>您的最终得分为${score}</p>
    <button onclick = "location.reload()">再玩一次</button>
    `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// 设置text的事件监听
text.addEventListener("input", e => {
  const insertedText = e.target.value;
  //   console.log(insertedText);

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // 清空输入框
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// 设置按钮事件监听
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// 下拉框事件监听
settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  //   console.log(difficulty);
  localStorage.setItem("difficulty", difficulty);
});
