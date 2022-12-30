const facts = [
  "I play basketball although I'm not really tall (5'7\", or 170cm if you use a sane metric system).",
  "I have a cat named Milo 😻",
  "When I shave my beard entirely, I look like a 15 year old teenager 👶🏻",
  "Tangerines are the best fruits in the universe, period 🍊",
  "I secretly dream about quitting programming and do pet sitting 🐶",
  "I can\t live without three beverages: Whiskey 🥃, Mate 🧉 and Beer 🍻",
  "I like to collect vinyl records 🎵",
  "My entire life is organized in Notion 📔",
  "I hate doing the dishes 🍽️"
]

// Draggable post-it notes code adapted from https://codepen.io/pbmchc/pen/QvyEev
let element, grabPointX, grabPointY;
const newFactBtn = document.querySelector('.new-fact');
const closeFactBtns = document.querySelectorAll('.post-it button');
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

const onDragStart = (ev) => {
  if (ev.target.parentElement.className.indexOf('draggable') !== -1) {
    element = ev.target.parentElement;
  } else {
    element = ev.target.parentElement.parentElement;
  }
  
  const boundingClientRect = element.getBoundingClientRect();
  grabPointX = boundingClientRect.left - ev.clientX;
  grabPointY = boundingClientRect.top - ev.clientY;
};

const onDrag = (ev) => {
  if (element) { 
    let posX = ev.clientX + grabPointX;
    let posY = ev.clientY + grabPointY;
    const rBorder = document.body.clientWidth - element.offsetWidth;

    posX = posX < 0 ? 0 : posX;
    posX = posX > rBorder ? rBorder : posX;
    posY = posY < 0 ? 0 : posY;
    
    element.style.left = posX + "px";
    element.style.top = posY + "px";
  }
};

const onDragEnd = () => {
  element = null;
  grabPointX = null;
  grabPointY = null;
}

// Randomizer functions 🎰
const getRandomPosition = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

const getRandomFact = () => {
  const randomIndex = Math.floor(Math.random() * facts.length);
  const item = facts[randomIndex];
  return {
    index: randomIndex + 1,
    item,
  };
}

const createNewNote = () => {
  const factContainer = document.createElement("div");
  var closeButton = document.createElement("button");
  var textContainer = document.createElement("div");

  factContainer.classList.add("post-it", "draggable");
  closeButton.classList.add("close");
  closeButton.innerText = 'x';

  const fact = getRandomFact();
  textContainer.innerHTML = `
    <h6>Random fact #${fact.index}:</h6>
    <p>${fact.item}</p>
  `;

  factContainer.addEventListener('mousedown', onDragStart);
  closeButton.addEventListener('click', () => deleteNote(closeButton));
  
  factContainer.style.left = getRandomPosition(0, winWidth)+'px';
  factContainer.style.top = getRandomPosition(0, winHeight)+'px';

  factContainer.appendChild(closeButton);
  factContainer.appendChild(textContainer);
  document.body.appendChild(factContainer);
}

const deleteNote = (e) => {
  e.parentElement.remove();
}

document.addEventListener('mousemove', onDrag);
document.addEventListener('mouseup', onDragEnd);
closeFactBtns.forEach((btn => btn.addEventListener('click', () => deleteNote(btn))))
newFactBtn.addEventListener('click', createNewNote);

//touch devices handler
const touchHandler = (event) => {
  const touch = event.changedTouches[0];
  const simulatedEvent = document.createEvent("MouseEvent");
  
  simulatedEvent.initMouseEvent({
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup"
  }[event.type], true, true, window, 1,
    touch.screenX, touch.screenY,
    touch.clientX, touch.clientY, false,
    false, false, false, 0, null
  );
  
  touch.target.dispatchEvent(simulatedEvent);
  if (touch.target.parentElement.classList.contains('draggable')) event.preventDefault();
}

const initializeTouchEvents = () => {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);
}

initializeTouchEvents();