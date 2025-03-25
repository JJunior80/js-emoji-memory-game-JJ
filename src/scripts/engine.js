const emojis = ["🐱", "🐱", "🦝", "🦝", "🦊", "🦊", "🐶", "🐶", "🐵", "🐵", "🦁", "🦁", "🐯", "🐯", "🐮", "🐮"];

let openCards = [];
let canClick = true; // Bloqueia cliques enquanto verifica

// Embaralhamento Fisher-Yates
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledEmojis = shuffle([...emojis]);

const gameContainer = document.querySelector(".game");

shuffledEmojis.forEach((emoji) => {
  let card = document.createElement("div");
  card.className = "item";
  card.innerHTML = emoji;
  card.onclick = handleClick;
  gameContainer.appendChild(card);
});

function handleClick() {
  if (!canClick || openCards.includes(this) || this.classList.contains("boxMatch")) return;

  this.classList.add("boxOpen");
  openCards.push(this);

  if (openCards.length === 2) {
    canClick = false;
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [first, second] = openCards;
  if (first.innerHTML === second.innerHTML) {
    first.classList.add("boxMatch");
    second.classList.add("boxMatch");
  } else {
    first.classList.remove("boxOpen");
    second.classList.remove("boxOpen");
  }

  openCards = [];
  canClick = true;

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    setTimeout(() => alert("🎉 Você venceu!"), 300);
  }
}
