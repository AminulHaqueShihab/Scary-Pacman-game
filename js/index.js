var canvas;
var canvasContext;
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const musicSound = new Audio('music/music.mp3');
var xPosPac=40;
var yPosPac=235;
var xv=yv=10;
musicSound.play();
function setupCanvas(){
    canvas = document.getElementById("gameCanvas");
    
    if(canvas.getContext){
        var layout = canvas.getContext('2d');
        // layout.fillText("hello", 200, 300);
        // xPosPac=40;
        // yPosPac=235;
        // xv=yv=10;
        var xPosGst1=(canvas.width-50)*Math.random();
        var yPosGst1=(canvas.height-50)*Math.random();
        var xPosGst2=(canvas.width-50)*Math.random();
        var yPosGst2=(canvas.height-50)*Math.random();
        var xPosPum=(canvas.width-70)*Math.random();
        var yPosPum=(canvas.height-70)*Math.random();
        var score = 0;

        //importing images.
        var pacman = new Image();
        pacman.src = "img/pacman.png";
        var pacman2 = new Image();
        pacman2.src = "img/pacman 2.png";
        var ghost = new Image();
        ghost.src = "img/ghost.png";
        var apple = new Image();
        apple.src = "img/apple.png";

        var fps = 30;
        pacman.onload= function(){
            var gameLoop = setInterval(function(){
                updatePositions();
                updateCanvas();
                var point = pointEaten();
                var collision = collisionDetected();
                //checking collisions with foods
                if(point==true){
                    foodSound.play();
                    score += 10;
                    xPosPum=(canvas.width-70)*Math.random() ;
                    yPosPum=(canvas.height-70)*Math.random();
                    xPosGst1=(canvas.width-50)*Math.random();
                    yPosGst1=(canvas.height-50)*Math.random();
                    xPosGst2=(canvas.width-50)*Math.random();
                    yPosGst2=(canvas.height-50)*Math.random();
                }
                //checking collisions with ghosts
                if(collision==true){
                    gameOverSound.play();
                    musicSound.pause();
                    clearInterval(gameLoop);
                    layout.fillStyle="grey";
                    layout.fillRect(250,90,520,420);
                    layout.fillStyle="white";
                    layout.fillRect(260,100,500,400);
                    layout.fillStyle ="black";
                    layout.font = "40px Arial";
                    layout.fillText("Oppsss...", 430, 220);
                    layout.fillStyle ="black";
                    layout.font = "80px Arial";
                    layout.fillText("Game Over", 305, 300);
                    layout.fillStyle ="black";
                    layout.font = "30px Arial";
                    layout.fillText("Scored: "+score, 440, 350);
                    layout.fillStyle ="black";
                    layout.font = "20px Arial";
                    layout.fillText("Press 'F5' or Refresh the page to play again", 325, 490);
                }
            }, 1000/fps);
            }
    }
    
    function pointEaten(){
        if(xPosPac < xPosPum + 40 &&
            xPosPac + 80 > xPosPum &&
            yPosPac < yPosPum + 40 &&
            yPosPac + 80 > yPosPum)
        {
            return true;
        }else{
            return false;
        }
    }

    function collisionDetected(){
        if(xPosPac < xPosGst1 + 30 &&
            xPosPac + 70 > xPosGst1 &&
            yPosPac < yPosGst1 + 30 &&
            yPosPac + 70 > yPosGst1)
        {
            return true;
        }else if(xPosPac < xPosGst2 + 30 &&
                xPosPac + 70 > xPosGst2 &&
                yPosPac < yPosGst2 + 30 &&
                yPosPac + 70 > yPosGst2){
            return true;	
        }else {
            return false;
        }
    }

    document.addEventListener("keydown", function(event){
        var code=event.which;
        console.log(code);
        if(code==37 || code==65){
            event.preventDefault();
            if(xv<0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv*-1;
                yv=yv;
            }
        }else if(code==38 || code==87){
            event.preventDefault();
            if(yv<0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv;
                yv=yv*-1;
            }
        }else if(code==39 || code==68){
            event.preventDefault();
            if(xv>0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv*-1;
                yv=yv;
            }
        }else if(code==40 || code==83){
            event.preventDefault();
            if(yv>0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv;
                yv=yv*-1;
            }
        }
    });

    function updatePositions(){
        xPosPac+=xv;
        yPosPac+=yv;
        if(yPosPac<=0){
            yv=-yv;
        }
        if((yPosPac+80)>=canvas.height){
            yv=-yv;
        }
        if(xPosPac<0){
            xv=-xv;
        }
        if(xPosPac+80>canvas.width){
            xv=-xv;
        }
        
    }
    
    function  updateCanvas(){
        layout.clearRect(0,0, canvas.width, canvas.height);
        layout.drawImage(ghost, xPosGst1, yPosGst1, 40, 40);
        layout.drawImage(ghost, xPosGst2, yPosGst2, 40, 40);	
        layout.drawImage(apple, xPosPum, yPosPum, 50, 50);
        if(xv>0){
            layout.drawImage(pacman, xPosPac, yPosPac, 80, 80);
        }else{
            layout.drawImage(pacman2, xPosPac, yPosPac, 80, 80);
        }							
        
        layout.fillStyle="white";
        layout.font = "20px Arial";
        layout.fillText("Score: "+score, 870,30);
        layout.fillStyle="white";
        layout.font = "20px Arial";
        layout.fillText("Eat the apple and avoid the Ghosts", 20,30);
    }

    //On Screen Button
    function moveUp(){
        event.preventDefault();
        if(yv<0){
            xv=xv;
            yv=yv;
        }else{
            xv=xv;
            yv=yv*-1;
        }
    }
    function moveLeft(){
        event.preventDefault();
            if(xv<0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv*-1;
                yv=yv;
            }
    }
    function moveRight(){
        event.preventDefault();
            if(xv>0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv*-1;
                yv=yv;
            }
    }
    function moveDown(){
        event.preventDefault();
            if(yv>0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv;
                yv=yv*-1;
            }
    }
    document.getElementById("btn1").addEventListener("click",moveUp);
    document.getElementById("btn2").addEventListener("click",moveLeft);
    document.getElementById("btn3").addEventListener("click",moveRight);
    document.getElementById("btn4").addEventListener("click",moveDown);
}