const xClass='x';
const circleClass='circle';
const winningComparisson=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements=document.querySelectorAll('[data-cell]');
const board=document.getElementById('board');
const winningMessageText=document.querySelector('[data-winning-message-text');
const winningMessage=document.getElementById('winning-message');
const restartButton=document.getElementById('restartButton');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);
function startGame(){
    winningMessage.classList.remove('show');
    circleTurn=false;
    setBoardHover();
    cellElements.forEach(cell=>{
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener('click', handleClick);
    })
    cellElements.forEach(cell=>{
        cell.addEventListener('click', handleClick, {once:true});
    })
    
}

function handleClick(e){
    const cell=e.target;
    const currentClass=circleTurn?circleClass:xClass;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endgame(false);
    }
    else if(isDraw()){
        endgame(true);
    }
    else{
        swapTurns();
        setBoardHover();
    }
    
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn=!circleTurn;
}

function setBoardHover(){
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if(circleTurn){
        board.classList.add(circleClass);
    }
    else{
        board.classList.add(xClass);
    }
}

function checkWin(currentClass){
    return winningComparisson.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function isDraw(){
    return [...cellElements].every(index=>{
        return index.classList.contains(circleClass) || 
        index.classList.contains(xClass);
    })
}

function endgame(draw){
    if(draw){
        winningMessageText.innerText=`Draw!`;
        winningMessage.classList.add('show');
    }
    else{
        winningMessageText.innerText=`${circleTurn?"O's ": "X's "}wins!`;
        winningMessage.classList.add('show');
    }
}