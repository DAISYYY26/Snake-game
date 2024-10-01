//board

var blocksize=25
var rows=20
var cols=20
var board;
var context;

//snake head
var snakeX=blocksize*5 //at coordinate 5 of x-axis
var snakeY=blocksize*5 //at coordinate 5 of y-axis


//velocity
var velocityX=0
var velocityY=0

// snake body 
var snakeBody=[]

// food 
var foodX;
var foodY;

//gameover
var gameOver=false


window.onload=function(){
    board=document.getElementById('board')
    board.height=rows*blocksize
    board.width=cols*blocksize
    context=board.getContext("2d"); //used for drawing on the board

    placefood()
    document.addEventListener("keyup",changeDirection)
    // update()
    setInterval(update,1000/10); //100milliseconds
}

function update(){
    if(gameOver){
        return;
    }
    context.fillStyle="black"
    context.fillRect(0,0,board.width,board.height)


    context.fillStyle="red"
    context.fillRect(foodX,foodY,blocksize,blocksize)

    if(snakeX==foodX &&snakeY==foodY){
        snakeBody.push([foodX,foodY])
        placefood()
    }
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1]
    }
    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY]
    }
    
    context.fillStyle="lime"
    snakeX += velocityX*blocksize
    snakeY += velocityY*blocksize
    context.fillRect(snakeX,snakeY,blocksize,blocksize)

  for(let i=0;i<snakeBody.length;i++){
    context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize)
  }

    // game over conditions 
    if(snakeX<0 || snakeX>cols*blocksize || snakeY<0 || snakeY>rows*blocksize){
        gameOver=true;
        alert("Game Over!!")
    }
    for(let i=0;i<snakeBody.length;i++){
        if(snakeX ==snakeBody[i][0] && snakeY==snakeBody[i][1]){
            gameOver=true;
            alert("Game Over!!")
        }
    }
}


function changeDirection(e){
    if(e.code =="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1
    }
   else if(e.code =="ArrowDown"&& velocityY!=-1){
        velocityX=0;
        velocityY=1
    }
    else if(e.code =="ArrowLeft"&& velocityY!=1){
        velocityX=-1;
        velocityY=0
    }
   else if(e.code =="ArrowRight"&& velocityY!=-1){
        velocityX=1;
        velocityY=0
    }
}
 
//placing food at randomw places
function placefood(){
    foodX=Math.floor(Math.random()*cols)*blocksize;
    foodY=Math.floor(Math.random()*rows)*blocksize;
}



    

       

