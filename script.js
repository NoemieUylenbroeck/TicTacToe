let resultDisplay = document.getElementById("result");
let turnOne = document.getElementById("turnOne");
let turnTwo = document.getElementById("turnTwo");
let cell = document.getElementsByClassName('cell');

//all of the winning combinaisons
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Start of the game => active, x is playing; grid is empty
let gameActive = true;
let currentPlayer = "Player One";
let symbol = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
turnMessage();

//Make clear button clickable
document.getElementById("clearButton").addEventListener("click", clearGame);

//Make grid cells clickable and call handlecellclick on click
for (let i = 0; i< cell.length; i++){
    cell[i].addEventListener("click", handleCellClick);
}

//on click on the cell
function handleCellClick(cellClickedEvent) {
    const cellClicked = cellClickedEvent.target;
    const cellClickedIndex = parseInt(cellClicked.getAttribute('data-cell-index'));
    console.log(cellClickedIndex);

    //if grid already used(not empty) or game inactive => nothing
    if (gameState[cellClickedIndex] !== "" || !gameActive) {
        console.log("stop");
        return;
    } 
    handleCellPlayed(cellClicked, cellClickedIndex);
    handleResultValidation();
    console.log(gameState)
}

//on click put x or o
function handleCellPlayed(cellClicked, cellClickedIndex) {
    gameState[cellClickedIndex] = symbol;
    cellClicked.innerHTML = symbol;
    if (symbol=="X"){
        document.getElementsByClassName("cell")[cellClickedIndex].style.color = "#C2FFFD";
    }else{
        document.getElementsByClassName("cell")[cellClickedIndex].style.color = "#FDBEC8";
    }
}

//See if there is a win/draw or if the game continues
function handleResultValidation() {
    let roundWon = false;
    //loop through the 8 win conditions
    for (let i = 0; i <= 7; i++)  {
        const winCondition = winningConditions[i];
        //if 3 different symbols on the position of the win condition => continue
        //We're getting an array of array (array of 3 positions)
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        //if not the same symbol 3 times => continue to loop
        if (a === '' || b === '' || c === '') {
            continue;            
        }
        //if 3 same symbols on the position of the win condition => game won and the loop can stop
        if (a == b && b == c) {
            roundWon = true;
            break;
        }
    }
        
if (roundWon) {
    gameActive = false
    resultMessage("win");
        return;
    }
    //if no "" in gamestate => means grid is full
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        gameActive = false;
        resultMessage("draw");
        return;
    }
    handlePlayerChange();
}

//change player
function handlePlayerChange() {
    if (symbol=="X"){
        symbol="O";
        currentPlayer= "Player Two";
    } else {
        symbol="X";
        currentPlayer ="Player One";
    }
    turnMessage();
}

//display wich turn it is
function turnMessage(){
    if (currentPlayer =="Player One"){
        turnOne.style.display = "block";
        turnTwo.style.display="none";
    } else{
        turnOne.style.display = "none";
        turnTwo.style.display="block";       
    }
}

//display result message
function resultMessage(result){
    if (result =="win" && currentPlayer =="Player One"){
        swal({
            title: "Player ONE wins !",
            text:" Do you want to play again ? ",
            button: "Restart the game",
            customClass:"swalPlayerOne",
          })
          .then((value) => {
            if(value){
                clearGame();
            }
          });
    }else if (result =="win" && currentPlayer =="Player Two"){
        swal({
            title: "Player TWO wins !",
            text:" Do you want to play again ?",
            button: "Restart the game",
            customClass:"swalPlayerTwo",
          })
          .then((value) => {
            if(value){
                clearGame();
            }
          });
        }else{
            swal({
                title: "It's a draw !",
                text:" Do you want to play again ?",
                button: "Restart the game",
                customClass:"swalDraw",
              })
              .then((value) => {
                if(value){
                    clearGame();
                }
              });
        }
}

//Reset the game
function clearGame() {
    gameActive = true;
    currentPlayer = "Player One";
    symbol = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    turnMessage();
    for (let i = 0; i< cell.length; i++){
        cell[i].innerHTML="";
    };
}