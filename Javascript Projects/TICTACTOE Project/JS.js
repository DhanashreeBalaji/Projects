const boxes = document.querySelectorAll(".box");
//boxes mean all small dabba included
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

// Initially Current Player is X at the start of the game. ANd manwhile the current player changes
// alternatively as the game goes on. So a variable is required to store the value of current player
let currentPlayer;

//GameGrid array will store the values in the tictactoe grid as we update in UI
let gameGrid;

//Winning positions when data is filled in the grid  by X or O
//This means winning through X or O
//Here the index is starting with 0 is considered because we check won/ not won based on values in gameGrid array

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
    ];

    //The function to initialize the game after winning the game or after reloading
    function initGame() {
          currentPlayer = "X";
          gameGrid=["","","","","","","","",""];


          //UI Par empty bhi karna padega boxes ko
          //Means values in box UI should be cleared for a NEW GAME in UI
          //Use a for each loop and loop through each box and clear each value
           
          boxes.forEach((box,index) => {
            box.innerText = "";
            boxes[index].style.pointerEvents = "all";
            box.classList = `box box${index+1}`;
           });


            newGamebtn.classList.remove("active");
            gameInfo.innerText = `CurrentPlayer - ${currentPlayer}`;
    }

    initGame();
//Calling the initGame function to initialize the game at start of the whole process
  
       function swapTurn() {
        if(currentPlayer === 'X'){
            currentPlayer = 'O';
        }
        else{
            currentPlayer = 'X';
        }
             //UI update in game Info
             gameInfo.innerText = `CurrentPlayer - ${currentPlayer}`;

       }


        function checkGameOver() {
            let answer = "";

            winningPositions.forEach((position) => {
                 if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[0]] !== "" )
                 && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])){

                 //check if winner is X or O
                 if(gameGrid[position[0]] === "X")
                 answer = "X";
                 else{
                    answer = "O"
                 }

                      //After winner found no other activities are to be performed in the boxes on the grid
                      boxes.forEach((box) => {
                        box.style.pointerEvents = "none";
                      })

                      //now we know X/O is a winner
                      boxes[position[0]].classList.add("win");
                      boxes[position[1]].classList.add("win");
                      boxes[position[2]].classList.add("win");
                 }
            });
            
            //So we have a winner
            if(answer !== ""){
                gameInfo.innerText = `Winner Player - ${answer}`;
                newGamebtn.classList.add("active");
                return;
            }

            //If no winner found, lets check whether there is tie
            let fillCount = 0;
            //Checking how many boxes are filled
            gameGrid.forEach((box) => {
                if(box !== "")
                fillCount++;
            });
        
            //board is filled, game is Tie
            if(fillCount === 9){
                gameInfo.innerText = "Game Tied!";
                newGamebtn.classList.add("active");
            }
        }


       //The below function lists the things that HAPPEN WHEN A CLICK IS PERFORMED OVER ANY BOX
        function handleClick(index) {
     if(gameGrid[index] === ""){

        //update the currentplayer value in inner array and UI both....
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
         boxes[index].style.pointerEvents = "none";
         //Dobara koi click nahi kaam karna hai ussi box mein so no pinter events

         swapTurn();
         //Above method is to swap the value in Current Player variable

         //After a click over boxes value would be filled, and chances are there game is won. 
         //So check at every click whether game is won or not by calling a function checkGameOver()

         checkGameOver();
     }
}


//Adding event listener to each box so when clicked on a box,
// lot of things occur which are inside handleClick(index) Function
//The Index on which click happened is also passed
//So now when any of the 9 boxes are clicked the function is called
boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGamebtn.addEventListener("click", initGame);