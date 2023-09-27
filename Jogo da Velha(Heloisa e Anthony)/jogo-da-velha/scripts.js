//const que seleciona todas as celulas
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
//const com o paragrafo(p) da mensagem de vitoria
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
//const com a classe da mensagem de vitoria
const winningMessage = document.querySelector("[data-winning-message]");
//const com o botão de reiniciar
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//variavel para que quando o jogo começar, não será a vez do circulo
const startGame = () => {
  isCircleTurn = false;

  //for dos simbolos
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    winningMessageTextElement.innerText = isCircleTurn
      ? "Circulo Venceu!"
      : "X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};
//const para ver as combinações de vitorias
const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};
//const para ver se há algum empate
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

//const para os simbolos poderem serem colocados
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};
//const para não ser possivel colocar outro simbolo no mesmo lugar
const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");
  //if para mudar os simbolos
  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};
//const para mudar a vez
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};


//adicinando os simbolos para o "click", as verificações de vitorias e mudar a vez
const handleClick = (e) => {

  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);


  const isWin = checkForWin(classToAdd);

  // Verificar por empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Mudar símbolo
    swapTurns();
  }
};

startGame();

//função para o botão de reiniciar
restartButton.addEventListener("click", startGame);
