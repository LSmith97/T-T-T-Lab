/*----Constants----*/

/*----State Variables----*/
let board;
let winner;
const score = {
    w: 0,
    l: 0,
    t: 0
}
/*----Cached Elements----*/
//score elements
const winEle = document.querySelector('#win');
const lossEle = document.querySelector('#loss');
const tieEle = document.querySelector('#tie');

//button element
const resetBtn = document.querySelector('button');

//grid elements
const gridEles = document.querySelectorAll(".box");

/*----Event Listeners----*/
function handleClick(evt){
    // return from the fuction if there is already a value on the square or if someone already won
    if(board[evt.target.id] || winner) return;
    // Set that space on the board to X
    board[evt.target.id] = 'X';
    // Check for winners
    checkWinner();
    // Have the computer go if there is no winner
    if(!winner) {
    computerChoose();
    // Check for winners again
    checkWinner();
    }
    // Call render
    render();
}

/*----Functions----*/
function init() {
    // Initialize the empty board
    board = ['','','','','','','','','']
    // Reset winner
    winner = false;
    // Add event listeners to all elements
    gridEles.forEach(function(ele){
        ele.addEventListener('click', handleClick)
    });
    // Add a listener to reset the board if resetButton is pressed
    resetBtn.addEventListener('click', init)
    // Call render
    render();
}

function render() {
    // Renders the current game state
    renderScore();
    renderBoard();
    renderWinner();
}

function renderScore() {
    // Updates the score elements
    winEle.textContent = score.w;
    lossEle.textContent = score.l;
    tieEle.textContent = score.t;
}

function renderBoard() {
    // Update the board grid elements
    for (let i = 0; i < gridEles.length; i++){
        gridEles[i].textContent = board[i];
        //Change the text color for Xs or Os 
        if (board[i] === 'X'){
            gridEles[i].style.color = 'Lime'
        } else if (board[i] === 'O'){
            gridEles[i].style.color = 'Red'
        }
    }
}

function renderWinner() {
    if (winner) {
        resetBtn.style.display = 'block'
    } else {
        resetBtn.style.display = 'none'
    }
}

function computerChoose() {
    // Marks a random unmarked square with an 'O'
    let unmarked = [];
    for(let i = 0; i < board.length; i++){
        if(!board[i]) unmarked.push(i);
    }
    let choice = unmarked[Math.floor(Math.random() * unmarked.length)];
    board[choice] = 'O';
}

function checkWinner() {
    // Checks if there are any winners
    checkHorizontal();
    checkVertical();
    checkDiagonal();
    // If there is no winner check for a tie
    if (!winner) checkTie();
    // Change score if someone won
    if (winner === 'tie') score.t++
    if (winner === 'X') score.w++
    if (winner === 'O') score.l++
}

function checkHorizontal() {
    // Checks each row for 3 matches
    // Row 1
    if (board[0]){
        if (board[0] === board[1] && board[0] === board[2]){
            winner = board[0];
        }
    }
    // Row 2
    if (board[3]){
        if (board[3] === board[4] && board[3] === board[5]){
            winner = board[3];
        }
    } 
    // Row 3
    if (board[6]){
        if (board[6] === board[7] && board[6] === board[8]){
            winner = board[6];
        }
    } 
}

function checkVertical() {
    // Checks each collumn for 3 matches
    // collumn 1
    if (board[0]){
        if (board[0] === board[3] && board[0] === board[6]){
            winner = board[0];
        }
    }
    // collumn 2
    if (board[1]){
        if (board[1] === board[4] && board[1] === board[7]){
            winner = board[1];
        }
    }
    // collumn 3
    if (board[2]){
        if (board[2] === board[5] && board[2] === board[8]){
            winner = board[2];
        }
    }
}

function checkDiagonal() {
    // Checks both diagonals for 3 matches
    // 0-4-8
    if (board[0]){
        if (board[0] === board[4] && board[0] === board[8]){
            winner = board[0];
        }
    }
    // 2-4-6
    if (board[2]){
        if (board[2] === board[4] && board[2] === board[6]){
            winner = board[2];
        }
    }
}

function checkTie() {
    // Checks if all spaces are full
    if(board.every((grid) => grid)) {
        winner = 'tie';
    }
}

init();