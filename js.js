//Gameboard module
const gameBoard = (() => {
    //create empty gameboard
    const game = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    //display state of gameboard
    const displayGame = () => {
        const gameboard = document.querySelector('.gameboard');
        for(let i =0; i <3; i++)
        {
            for(let j=0; j<3; j++)
            {
                const cell = document.createElement("button");
                cell.classList.add("cell");
                cell.textContent=game[i][j];
                gameboard.appendChild(cell);
            }
        }
    }
    return {game, displayGame};
})();

//Player Factory Function
const Player = (piece) => {
    return{piece};
}

// gameBoard.displayGame();

//Change cell content on click
const cells = document.querySelectorAll('.cell');
cells.forEach((button) => {
button.addEventListener('click', () => {
        if(button.textContent == "")
        {
            button.textContent = "O";
        }
    });
});

