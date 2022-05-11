//Player factory function
const Player = function(piece){
    return {piece};
}

//Create the two players: O and X
const oPlayer = Player("O");
const xPlayer = Player("X");

//Player O starts the game
let currentPlayer = oPlayer;
let nextPlayer = xPlayer;

//Select all cell elements
const cells = document.querySelectorAll(".cell");

//Select restart button
const restart = document.querySelector(".restart");

//All winning combinations
const WIN = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Start game
game();
//Add restart button functionality
restart.addEventListener('click', game);


function game(){
    //set up initial settings
    currentPlayer = oPlayer;
    nextPlayer = xPlayer;
    let status = document.querySelector(".status");
    status.textContent = `It is ${currentPlayer.piece}'s turn!`;

    //Make each cell clickable
    cells.forEach((cell) => {
        //reset game board status
        cell.textContent = "";
        cell.removeEventListener('click', makeMove);
        //add click to each cell and execute their move
        cell.addEventListener('click', makeMove, {once: true})
    });
}

function makeMove(e){
    //declare cell that triggered the "click"
    const cell = e.target;
    const currentPiece = currentPlayer.piece;

    //place piece from current player
    placePiece(cell, currentPiece);

    //Check For Win
    if(checkWin(currentPlayer)){
        
        endGame(false)
    }
    //Check for draw
    else if(isDraw()){
        endGame(true)
    }
    //Move to next turn
    else{
        changeTurn();
    }
}

//Fill cell with the piece of the respective player
function placePiece(cell, currentPiece) {
    cell.textContent = `${currentPiece}`;
    //Display whose turn it is
    let status = document.querySelector(".status");
    status.textContent = `It is ${nextPlayer.piece}'s turn!`;
}

//Check if current player won
function checkWin(currentPlayer){
    //return true if at least one of the winning combinations match the game board
    return WIN.some(combination => {
        //return true if every index matches with the same piece
        return combination.every(index => {
            //return true if the cell contains the current player's piece
            return cells[index].textContent.includes(currentPlayer.piece);
        })
    })
}

//Check to see if game is over
function endGame(draw){
    let status = document.querySelector(".status");
    //display draw message if game was a draw
    if(draw)
    {
        status.textContent = "It is a Draw!";
    }
    //display winning message for respective winner
    else{
        status.textContent = `Player ${currentPlayer.piece} wins!`;
    }
    cells.forEach((cell) => {
        cell.removeEventListener('click', makeMove);
    });
}

//Check for draw
function isDraw(){
    //return true if every cell is occupied and there are no winner yet
    return [...cells].every(cell => {
        return cell.textContent.includes(currentPlayer.piece) ||
               cell.textContent.includes(nextPlayer.piece);
    });
}

//Alternate turns
function changeTurn(){
    if(currentPlayer == oPlayer){
        currentPlayer = xPlayer;
        nextPlayer = oPlayer;
    }
    else{
        currentPlayer = oPlayer;
        nextPlayer = xPlayer;
    }
}