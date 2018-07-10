let board = document.getElementById('grid');
let selectGridSize = document.getElementById('board-select');
let boxes = document.getElementsByClassName('block');
let boardSize = 9;
let boxWidth = 570 / 3;
let boxMargin = 30 / 6;
let btnReset = document.querySelector('.btn-reset');
let moves = 0;
let turn;
let player1 = 'X';
let player2 = 'O';
let win = false;
let tie = false;




/* Function paint the grid  on click */

selectGridSize.addEventListener('change', (e) => {
    boardSize = eval(e.target.value);
    boxWidth = 570 / Math.sqrt(boardSize);
    boxMargin = 30 / (Math.sqrt(boardSize) * 2);
    reset()
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
        let elem = `<div id="${i}" class="block" style="width:${width}px; margin:${margin}px"></div>`;
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
        let box = gridArray[i];
        box.addEventListener('click', mark);
        box.addEventListener('click', function () {
            checkWin(boxes);
            checkTie(boxes);
            if (win) {
                setTimeout(function () { alert(`${turn} has won`); }, 200);
                setTimeout(function () {
                    reset();
                    startGame();
                }, 400);
            }
            else if (tie) {
                setTimeout(function () { alert(`it is a tie`); }, 200);
                setTimeout(function () {
                    reset();
                    startGame();
                }, 400);
            }
        });

    };

}
// mark "X" or "Y"


function mark(e) {
    let currentBox = e.currentTarget;
    if (currentBox.textContent) {
        return;
    }
    moves++
    turn = moves % 2 !== 0 ? player1 : player2;
    currentBox.textContent = turn;

}


function checkWin(array) {
    // check row
    for (let i = 0; i < array.length; i += Math.sqrt(array.length)) {
        let counter = 1;
        if (array[i].textContent !== "") {
            for (let j = i + 1; j < i + Math.sqrt(array.length); j++) {
                if (array[j].textContent === array[i].textContent) {
                    counter++
                    if (counter === Math.sqrt(array.length)) {
                        win = true;
                        console.log(win);
                    }
                }
            }

        }
    }

    //check column
    for (let i = 0; i < Math.sqrt(array.length); i++) {
        let counter = 1;
        if (array[i].textContent !== "") {
            for (let j = i + Math.sqrt(array.length); j < array.length; j += Math.sqrt(array.length)) {
                if (array[j].textContent === array[i].textContent) {
                    counter++
                    if (counter === Math.sqrt(array.length)) {
                        win = true;
                        console.log(win);
                    }
                }
            }

        }
    }

    // check diagonal left to right.


    if (array[0].textContent !== "") {
        let counter = 1;
        let comparison = array[0].textContent;
        for (let i = Math.sqrt(array.length) + 1; i < array.length; i += Math.sqrt(array.length) + 1) {
            if (array[i].textContent === comparison) {
                counter++;
                if (counter === Math.sqrt(array.length)) {
                    win = true;
                    console.log(win);
                }

            }
        }


    }

    // check diagonal right to left.

    if (array[Math.sqrt(array.length) - 1].textContent !== "") {
        let counter = 0;
        let comparison = array[Math.sqrt(array.length) - 1].textContent;
        for (let i = Math.sqrt(array.length) - 1; i < array.length - 1; i += Math.sqrt(array.length) - 1) {
            if (array[i].textContent === comparison) {
                counter++;
                if (counter === Math.sqrt(array.length)) {
                    win = true;
                    console.log(win);
                }

            }
        }


    }

}

function checkTie(array) {
    let counter = 0;
    for (let i = 0; i < array.length; i++) {
        if (boxes[i].textContent !== "") {
            counter++;
        }
    }
    if (counter === array.length && win === false) {
        tie = true;
    }
}



