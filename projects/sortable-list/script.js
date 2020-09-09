// 获取节点
const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Bernard Arnault",
  "Warren Buffett",
  "Mark Zuckerberg",
  "Amancio Ortega",
  "Larry Ellison",
  "Larry Page",
  "Steve Ballmer",
  "Carlos Slim Helu"
];
// 存储所有list
const listItems = [];

let dragStartIndex;

createList();

// const numbers = [1, 3, 9, 10, 160, 302];
// console.log(
//   numbers.sort(function(a, b) {
//     return a - b;
//   })
// );
// 创建createList函数，将li插入到DOM节点中
function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      //   console.log(person);
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class ="draggable" draggable ="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>
        `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
  // 事件监听函数
  addEventListeners();
}

// 拖拽函数
function dragStart() {
  //   console.log("Envent:", "dragStart");
  dragStartIndex = this.closest("li").getAttribute("data-index");
  //   console.log(dragStartIndex);
}

function dragEnter() {
  //   console.log("Envent:", "dragEnter");
  this.classList.add("over");
}

function dragOver(e) {
  //   console.log("Envent:", "dragOver");
  e.preventDefault();
}

function dragLeave() {
  //   console.log("Envent:", "dragLeave");
  this.classList.remove("over");
}

function dragDrop() {
  //   console.log("Envent:", "dragStart");
  const dragEndIndex = this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

// 调换排名
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  //   console.log(itemOne, itemTwo);
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// 查验排序
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[index]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

// 创建事件监听函数
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("drop", dragDrop);
  });
}

check.addEventListener("click", checkOrder);
