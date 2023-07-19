/*----Constants----*/
const X_COLOR = 'lime'
const O_COLOR = 'red'
/*----State Variables----*/
let board;
let winner;
let winningSquares;
let currentTurn;
const score = {
    x: 0,
    o: 0,
    d: 0
}
/*----Cached Elements----*/
//score elements
const oScoreEle = document.querySelector('#o');
const xScoreEle = document.querySelector('#x');
const drawEle = document.querySelector('#draw');
const turnEle = document.querySelector('#turn');

//winner element
const winEle = document.querySelector('#win');

//button element
const resetBtn = document.querySelector('button');

//grid elements
const gridEles = document.querySelectorAll(".box");

/*----Event Listeners----*/
function handleClick(evt){
    // return from the fuction if there is already a value on the square or if someone already won
    if(board[evt.target.id] || winner) return;
    // Set that space on the board to current player
    board[evt.target.id] = currentTurn;
    // Check for winners
    checkWinner();
    // change current player
    if (currentTurn === 'X'){
        currentTurn = 'O'
    } else {
        currentTurn = 'X'
    }

    // for Solo play:
    // // Have the computer go if there is no winner
    // if(!winner) {
    // computerChoose();
    // // Check for winners again
    // checkWinner();
    // }

    // Call render
    render();
}

/*----Functions----*/
function init() {
    // Initialize the empty board
    board = ['','','','','','','','','']
    // Reset winner
    winner = false;
    // Set currentTurn to X
    currentTurn = 'X';
    // reset winningSquares
    winningSquares = [];
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
    oScoreEle.textContent = score.o;
    xScoreEle.textContent = score.x;
    drawEle.textContent = score.d;
    turnEle.textContent = currentTurn;
}

function renderBoard() {
    // Update the board grid elements
    for (let i = 0; i < gridEles.length; i++){
        gridEles[i].textContent = board[i];
        //Change the text color for Xs or Os 
        if (board[i] === 'X'){
            gridEles[i].style.color = X_COLOR;
        } else if (board[i] === 'O'){
            gridEles[i].style.color = O_COLOR;
        }
        //Change border color to black
        gridEles[i].style.border = `1vmin solid black`;
    }
    //If there is a winner, change the border of the winning squares
    winningSquares.forEach(function(idx){
        if( winner === 'X') {
            gridEles[idx].style.border = `1vmin solid ${X_COLOR}`;
        } else if (winner === 'O') {
            gridEles[idx].style.border = `1vmin solid ${O_COLOR}`;
        } 
    });
}

function renderWinner() {
    if (winner === 'X' || winner === '0') {
        winEle.style.display = 'block'
        winEle.textContent = `${winner} Wins!`
    } else if (winner === 'draw'){
        winEle.style.display = 'block'
        winEle.textContent = `Its a Draw!`
    } else {
        winEle.style.display = 'none'
    }
}

// For solo play
// function computerChoose() {
//     // Marks a random unmarked square with an 'O'
//     let unmarked = [];
//     for(let i = 0; i < board.length; i++){
//         if(!board[i]) unmarked.push(i);
//     }
//     let choice = unmarked[Math.floor(Math.random() * unmarked.length)];
//     board[choice] = 'O';
// }

function checkWinner() {
    // Checks if there are any winners
    checkHorizontal();
    checkVertical();
    checkDiagonal();
    // If there is no winner check for a tie
    if (!winner) checkTie();
    // Change score if someone won
    if (winner === 'draw') score.d++
    if (winner === 'X') score.x++
    if (winner === 'O') score.o++
}

function checkHorizontal() {
    // Checks each row for 3 matches
    // Row 1
    if (board[0]){
        if (board[0] === board[1] && board[0] === board[2]){
            winner = board[0];
            winningSquares = [0,1,2];
        }
    }
    // Row 2
    if (board[3]){
        if (board[3] === board[4] && board[3] === board[5]){
            winner = board[3];
            winningSquares = [3,4,5];
        }
    } 
    // Row 3
    if (board[6]){
        if (board[6] === board[7] && board[6] === board[8]){
            winner = board[6];
            winningSquares = [6,7,8];
        }
    } 
}

function checkVertical() {
    // Checks each collumn for 3 matches
    // collumn 1
    if (board[0]){
        if (board[0] === board[3] && board[0] === board[6]){
            winner = board[0];
            winningSquares = [0,3,6];
        }
    }
    // collumn 2
    if (board[1]){
        if (board[1] === board[4] && board[1] === board[7]){
            winner = board[1];
            winningSquares = [1,4,7];
        }
    }
    // collumn 3
    if (board[2]){
        if (board[2] === board[5] && board[2] === board[8]){
            winner = board[2];
            winningSquares = [2,5,8];
        }
    }
}

function checkDiagonal() {
    // Checks both diagonals for 3 matches
    // 0-4-8
    if (board[0]){
        if (board[0] === board[4] && board[0] === board[8]){
            winner = board[0];
            winningSquares = [0,4,8];
        }
    }
    // 2-4-6
    if (board[2]){
        if (board[2] === board[4] && board[2] === board[6]){
            winner = board[2];
            winningSquares = [2,4,6];
        }
    }
}

function checkTie() {
    // Checks if all spaces are full
    if(board.every((grid) => grid)) {
        winner = 'draw';
    }
}

init();