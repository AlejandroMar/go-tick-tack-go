const board = document.getElementById('grid');
const selectGridSize = document.getElementById('board-select');
const boxes = document.getElementsByClassName('block');
let boardSize = 9;
let boxWidth = 570 / 3;
let boxMargin = 30 / 6;
const btnReset = document.querySelector('.btn-reset');
let moves = 0;
let turn;
const player1 = 'X';

const player2 = 'O';
let win = false;
let tie = false;

// modal vars
const modal = document.getElementById('myModal');
const span = document.querySelector('.close');
const playAgainBtn = document.querySelector('.play-again');
const stopPlayingBtn = document.querySelector('.stop-playing');
const modalHeader = document.getElementById('modal-header');

/* Function paint the grid  on click */

selectGridSize.addEventListener('change', e => {
  boardSize = eval(e.target.value);
  boxWidth = 570 / Math.sqrt(boardSize);
  boxMargin = 30 / (Math.sqrt(boardSize) * 2);
  reset();
  paintGrid(boardSize, board, boxWidth, boxMargin);
  listen(boxes);
});

btnReset.addEventListener('click', () => {
  reset();
  paintGrid(boardSize, board, boxWidth, boxMargin);
  listen(boxes);
});

/* Function paint the grid */
function paintGrid(size, board, width, margin) {
  for (let i = 0; i < size; i++) {
    const elem = `<div id="${i}" class="block" style="width:${width}px; margin:${margin}px"></div>`;
    board.innerHTML += elem;
  }
}

function startGame() {
  paintGrid(boardSize, board, boxWidth, boxMargin);
  listen(boxes);
}

startGame();

function reset() {
  tie = false;
  win = false;
  moves = 0;
  board.innerHTML = '';
}

// game logic

/* event listener to boxes */

function listen(gridArray) {
  for (let i = 0; i < gridArray.length; i++) {
    const box = gridArray[i];
    box.addEventListener('click', mark);
    box.addEventListener('click', function() {
      checkWin(boxes);
      checkTie(boxes);
      if (win) {
        modalHeader.innerText = `${turn} You win!`;
        setTimeout(() => {
          modal.style.display = 'block';
        }, 300);

        playAgain();
        stopPlaying();
      } else if (tie) {
        modalHeader.innerText = "It's a Tie!";
        setTimeout(function() {
          modal.style.display = 'block';
        }, 300);
        stopPlaying();
        playAgain();
      }
    });
  }
}

// mark "X" or "Y"
function mark(e) {
  const currentBox = e.currentTarget;
  if (currentBox.textContent) {
    return;
  }
  moves++;
  turn = moves % 2 !== 0 ? player1 : player2;
  currentBox.textContent = turn;
}

function checkWin(array) {
  // check row
  for (let i = 0; i < array.length; i += Math.sqrt(array.length)) {
    let counter = 1;
    if (array[i].textContent !== '') {
      for (let j = i + 1; j < i + Math.sqrt(array.length); j++) {
        if (array[j].textContent === array[i].textContent) {
          counter++;
          if (counter === Math.sqrt(array.length)) {
            win = true;
          }
        }
      }
    }
  }

  // check column
  for (let i = 0; i < Math.sqrt(array.length); i++) {
    let counter = 1;
    if (array[i].textContent !== '') {
      for (
        let j = i + Math.sqrt(array.length);
        j < array.length;
        j += Math.sqrt(array.length)
      ) {
        if (array[j].textContent === array[i].textContent) {
          counter++;
          if (counter === Math.sqrt(array.length)) {
            win = true;
          }
        }
      }
    }
  }

  // check diagonal left to right.

  if (array[0].textContent !== '') {
    let counter = 1;
    const comparison = array[0].textContent;
    for (
      let i = Math.sqrt(array.length) + 1;
      i < array.length;
      i += Math.sqrt(array.length) + 1
    ) {
      if (array[i].textContent === comparison) {
        counter++;
        if (counter === Math.sqrt(array.length)) {
          win = true;
        }
      }
    }
  }

  // check diagonal right to left.

  if (array[Math.sqrt(array.length) - 1].textContent !== '') {
    let counter = 0;
    const comparison = array[Math.sqrt(array.length) - 1].textContent;
    for (
      let i = Math.sqrt(array.length) - 1;
      i < array.length - 1;
      i += Math.sqrt(array.length) - 1
    ) {
      if (array[i].textContent === comparison) {
        counter++;
        if (counter === Math.sqrt(array.length)) {
          win = true;
        }
      }
    }
  }
}

function checkTie(array) {
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    if (boxes[i].textContent !== '') {
      counter++;
    }
  }
  if (counter === array.length && win === false) {
    tie = true;
  }
}

// modal js
// When the user clicks on <span> (x), close the modal

span.onclick = function() {
  modal.style.display = 'none';
};

function playAgain() {
  return playAgainBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    setTimeout(() => {
      reset();
      startGame();
    }, 500);
  });
}

function stopPlaying() {
  return stopPlayingBtn.addEventListener('click', () => {
    win = false;
    if (document.querySelector('h3')) {
      board.removeChild(document.querySelector('h3'));
    }
    modal.style.display = 'none';
    const msg = document.createElement('h3');
    msg.classList.add('msg');
    msg.innerText = 'Thanks for playing';
    board.appendChild(msg);
  });
}
