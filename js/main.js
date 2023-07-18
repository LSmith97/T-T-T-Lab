/*----Constants----*/

/*----State Variables----*/
let board = [
    '','','','','','','','',''
]
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
gridEles.forEach(function(ele){

});

/*----Functions----*/
function init() {
    board = [
        '','','','','','','','',''
    ]
    render();
}

function render() {
    renderScore();
    renderBoard();
}

function renderScore() {
    //Updates the score elements
    winEle.textContent = score.w;
    lossEle.textContent = score.l;
    tieEle.textContent = score.t;
}

function renderBoard() {
    
}

init();