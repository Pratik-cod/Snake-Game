const board = document.querySelector(".board");
const start = document.querySelector(".btn");
const model = document.querySelector(".model");
const RestartGame = document.querySelector(".Game-overs");
let gameEnd = document.querySelector(".game-end")
const startGame = document.querySelector(".start-game");

const bloackHeight = 50;
const blockWidth = 50;
let Highscore = document.getElementById("high-score");
const TimeEvent = document.getElementById("Time");
let scoreEvent = document.getElementById("score");
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / bloackHeight);
const blocks = [];//isme all blocks ke co oridinate save hai
let snake = [
    { x:1,y:3 },//isme basically x and y ke co ordinate save hai
]
let direction = "down"
let score = 0;
let Time = "00:00"
let highscore = localStorage.getItem("highscore") || 0
Highscore.innerText = highscore
let intervalId = null
let timerId = null;
let food = {x: Math.floor(Math.random() * rows) , y: Math.floor(Math.random() *  cols)}
// for(let i = 0; i < rows * cols; i++){
 
    // const block = document.createElement("div");
    // block.classList.add("block");
    // board.appendChild(block);
// }

for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}-${col}`;
    blocks[`${row}-${col}`] = block//idhar se pure block array block ke andar ja rahe hai
    }
}

function render(){

     let head = null

blocks[`${food.x}-${food.y}`].classList.add("food")

  if(direction === "left"){
    head = {x:snake[0].x,y:snake[0].y-1}
 
  }
  else if(direction === "right") {
  head = {x:snake[0].x,y:snake[0].y+1}
  }
  else if(direction === "up"){
    head = {x:snake[0].x-1,y:snake[0].y}
  }
  else if(direction === "down"){
    head = {x:snake[0].x + 1,y:snake[0].y};
  }

  if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){  
    clearInterval(intervalId)
    model.style.display = "flex"
   startGame.style.display = "none"
     gameEnd.style.display = "flex";

  
    return;
}


if(head.x == food.x && head.y == food.y){
    blocks[`${food.x}-${food.y}`].classList.remove("food")
    food = {x: Math.floor(Math.random() * rows) , y: Math.floor(Math.random() *  cols)}
    blocks[`${food.x}-${food.y}`].classList.add("food")
    snake.unshift(head)
    score += 10;
    scoreEvent.innerText = score

    if (score > highscore) {
  highscore = score;
  localStorage.setItem("highscore", String(highscore));
}

}

  snake.forEach(part => {
    blocks[`${part.x}-${part.y}`].classList.remove("fill");
  })
     snake.unshift(head)//samne ja raha hai issee se
     snake.pop()//snake ke piche ka element delete ho raha hai


//ye show kar raha hai snake ko
    snake.forEach(box=>{//idhar se snake show kar raha hai
     blocks[`${box.x}-${box.y}`].classList.add("fill")  

     
    })
}

//  intervalId = setInterval(() =>{
 
// render()

// },300);

start.addEventListener("click",()=>{
  console.log("start");
  
    model.style.display = "none"
 intervalId = setInterval(()=> { render() },300)
})

function restartGame() {

blocks[`${food.x}-${food.y}`].classList.remove("food")

 snake.forEach(part => {
    blocks[`${part.x}-${part.y}`].classList.remove("fill");
  })
  score = 0;
  Time = "00:00"
  scoreEvent.innerText = score
  Highscore.innerText = highscore
  direction = "down"

  model.style.display = "none"
snake = [{ x:1,y:3 }]
food = {x: Math.floor(Math.random() * rows) , y: Math.floor(Math.random() *  cols)}
 intervalId = setInterval(()=> { render() },300)
 
}

RestartGame.addEventListener("click",restartGame);

addEventListener("keydown",(event) =>{
    if(event.key === "ArrowRight"){
        direction = "right"
    }
    else if(event.key === "ArrowLeft"){
        direction = "left"
    }
    else if(event.key === "ArrowDown"){
        direction = "down"
    }
    else if(event.key === "ArrowUp"){
        direction = "up"
    }
    
})


//web dev mai y axis upar hota na ki niche
