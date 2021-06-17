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
        var pumpkin = new Image();
        pumpkin.src = "img/pumpkin.png";

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
                    layout.fillRect(440,90,620,520);
                    layout.fillStyle="white";
                    layout.fillRect(450,100,600,500);
                    layout.fillStyle ="black";
                    layout.font = "50px Arial";
                    layout.fillText("Oppsss..", 655, 250);
                    layout.fillStyle ="black";
                    layout.font = "90px Arial";
                    layout.fillText("Game Over", 520, 350);
                    layout.fillStyle ="black";
                    layout.font = "40px Arial";
                    layout.fillText("Scored: "+score, 660, 430);
                    layout.fillStyle ="black";
                    layout.font = "20px Arial";
                    layout.fillText("Press 'F5' or Refresh the page to play again", 555, 580);
                }
            }, 1000/fps);
            }
    }
    
    function pointEaten(){
        if(xPosPac < xPosPum + 40 &&
            xPosPac + 100 > xPosPum &&
            yPosPac < yPosPum + 40 &&
            yPosPac + 100 > yPosPum)
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
        if(code==37){
            event.preventDefault();
            if(xv<0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv*-1;
                yv=yv;
            }
        }else if(code==38){
            event.preventDefault();
            if(yv<0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv;
                yv=yv*-1;
            }
        }else if(code==39){
            event.preventDefault();
            if(xv>0){
                xv=xv;
                yv=yv;
            }else{
                xv=xv*-1;
                yv=yv;
            }
        }else if(code==40){
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
        if((yPosPac+100)>=canvas.height){
            yv=-yv;
        }
        if(xPosPac<0){
            xv=-xv;
        }
        if(xPosPac+100>canvas.width){
            xv=-xv;
        }
        
    }
    
    function  updateCanvas(){
        layout.clearRect(0,0, canvas.width, canvas.height);
        layout.drawImage(ghost, xPosGst1, yPosGst1, 40, 40);
        layout.drawImage(ghost, xPosGst2, yPosGst2, 40, 40);	
        layout.drawImage(pumpkin, xPosPum, yPosPum, 40, 40);
        if(xv>0){
            layout.drawImage(pacman, xPosPac, yPosPac, 100, 100);
        }else{
            layout.drawImage(pacman2, xPosPac, yPosPac, 100, 100);
        }							
        
        layout.fillStyle="white";
        layout.font = "20px Arial";
        layout.fillText("Score: "+score, 1350,30);
        layout.fillStyle="white";
        layout.font = "20px Arial";
        layout.fillText("Eat the pumpkin and avoid the Ghosts", 20,30);
    }

}