/*
Keeping Up With the Javascripts: ES6
Homework #8
*/

const ROWS = 3;
const COLS = 3;
const CROSS = 'X';
const CIRCLE = 'O';

let state = {};

function initState() {
    state.start = null;
    state.inTurn = null;

    for (let row = 1; row <= ROWS; row++) {
        for (let col = 1; col <= COLS; col++) {
            const id = `box${row}${col}`;

            state[id] = {
                row: row,
                col: col,
                mark: null,
            };
        }
    }
}

function initBoard() {
    for (let row = 1; row <= ROWS; row++) {
        for (let col = 1; col <= COLS; col++) {
            const id = `box${row}${col}`;
            const elm = document.getElementById(id);

            elm.innerHTML = '&nbsp;';
            elm.classList.remove('cross', 'circle');
        }
    }
}

function attachOnClick() {
    for (let row = 1; row <= ROWS; row++) {
        for (let col = 1; col <= COLS; col++) {
            const id = `box${row}${col}`;
            const elm = document.getElementById(id);

            elm.addEventListener('click', (ev) => {
                const elm = ev.target;

                gameLogic(elm.id);
            });
        }
    }
}

function gameInit() {
    gameReset();
    attachOnClick();
}

function gameStart() {
    state.start = true;
    state.inTurn = CROSS;
}

function gameReset() {
    state = {};
    initState();
    initBoard();

    gameStart(); // for enchancement, to create a 'Start game' button then call this function
}

function gameLogic(id) {
    const stat = state[id];

    if (state.start !== true) return;
    if (stat.mark !== null) return;


    // mark the state
    stat.mark = state.inTurn;


    // draw the marking on board
    const elm = document.getElementById(id);
    elm.innerText = stat.mark;
    elm.classList.add(state.inTurn === CROSS ? 'cross' : 'circle');


    // check if win
    if (isWin(id)) {
        const msg = `${stat.mark} has won!`;
        alert(msg);
        console.log(msg);

        gameReset();
        return;
    }


    // check whether the board has been fully marked, means game end
    if (isBoardFullyMarked()) {
        const msg = 'Cats game!';
        alert(msg);
        console.log(msg);

        gameReset();
        return;
    }


    // set the turn
    state.inTurn = state.inTurn === CROSS ? CIRCLE : CROSS;



    function isWin(id) {
        const stat = state[id];

        // check vertical
        for (let row = 1; row <= ROWS; row++) {
            const id2 = `box${row}${stat.col}`;
            const stat2 = state[id2];
            if (stat2.mark !== stat.mark) break;
            if (stat2.mark === stat.mark && row === ROWS) return true;
        }

        // check horizontal
        for (let col = 1; col <= COLS; col++) {
            const id2 = `box${stat.row}${col}`;
            const stat2 = state[id2];
            if (stat2.mark !== stat.mark) break;
            if (stat2.mark === stat.mark && col === COLS) return true;
        }

        // ok, below diagonal checking i just make it simple.
        // if 'one day' tic-tac-toe has more than 3 rows/cols, following need to change

        // check diagonal top left to bottom right
        if (
            state['box11'].mark === state['box22'].mark &&
            state['box22'].mark === state['box33'].mark &&
            stat.mark === state['box22'].mark) { // comparing with any diagonal box will do

            return true;
        }

        // check diagonal top left to bottom right
        if (
            state['box13'].mark === state['box22'].mark &&
            state['box22'].mark === state['box31'].mark &&
            stat.mark === state['box22'].mark) { // comparing with any diagonal box will do

            return true;
        }
    }

    function isBoardFullyMarked() {
        for (let row = 1; row <= ROWS; row++) {
            for (let col = 1; col <= COLS; col++) {
                const id = `box${row}${col}`;

                if (state[id].mark === null) {
                    return false;
                }
            }
        }

        return true;
    }
}

window.onload = function() {
    gameInit();
};
