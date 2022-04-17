const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Elon Musk",
  "Jeff Bezos",
  "Bernard Arnault",
  "Bill Gates",
  "Warren Buffet",
  "Larry Page",
  "Sergey Brin",
  "Steve Ballmer",
  "Larry Ellison",
  "Gautam Adani",
];

// Store list items
const listItems = [];

// Index to keep track of order
let dragStartIndex;

createList();

// Insert list items to DOM
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <em class="fas fa-grip-lines"></em>
        </div>
    `;

      listItems.push(listItem);

      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

// Drag API functions
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");

  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

// Swap item list position
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check list order is correct
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

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
