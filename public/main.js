const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
const name = urlParams.get('name');
const scoreSuit = urlParams.get('suit');

let keyPressed = false;
let frame = 0;
let currentScore = 0;
let gamespeed = 3; 


const background = new Image();
background.src = "svgs/bg.png"
const bg = {
       x1:0,
       x2: canvas.width, 
       y: 0, 
       width: canvas.width, 
       height: canvas.height
}

function resizeCanvas(){
       ctx.imageSmoothingEnabled = false;
       canvas.width = window.innerWidth;
       setTimeout(function() {
              canvas.height = window.innerHeight;
       }, 0);
};
window.onresize = resizeCanvas;
resizeCanvas();

function handleBackground(){
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function animate(){
       ctx.clearRect(0,0, canvas.width, canvas.height);
       handleBackground();
       handleObstacle();
       handleStars();
       astronaut.update();
       astronaut.draw();
       handleCollision();
       handlePoints();
       if (handleCollision()) return;
       requestAnimationFrame(animate);
       frame+=1;
}
animate();

window.addEventListener('keydown', function(e){
       if (e.code === 'Space') keyPressed = true; 
})
window.addEventListener('mousedown', function(e){
       keyPressed = true;
})
window.addEventListener('keyup', function(e){
       if (e.code === 'Space') keyPressed = false; 
})
window.addEventListener('mouseup', function(e){
       keyPressed = false; 
})

const collide = new Image();
collide.src = 'svgs/explosion.png';

function handleCollision(){
       for(let i = 0; i < obstacleArray.length; i++){
              if ((obstacleArray[i].x < astronaut.x + astronaut.width/2) &&
              (obstacleArray[i].x + obstacleArray[i].width/2 > astronaut.x) &&
              (obstacleArray[i].ylocation < astronaut.y + astronaut.height/1.5) &&
              (obstacleArray[i].ylocation + obstacleArray[i].height > astronaut.y))
              {
                     handleGameOver();
                     return true;
              }
       }
}

function handlePoints(){
       for(let i =0; i <starArray.length; i++){
              if ((starArray[i].x < astronaut.x + astronaut.width) &&
              (starArray[i].x + starArray[i].width > astronaut.x) &&
              (starArray[i].ylocation < astronaut.y + astronaut.height) &&
              (starArray[i].ylocation + starArray[i].height > astronaut.y))
              {
                     starArray.pop(starArray[0]);
                     currentScore++;
                     document.getElementById('score').innerText = "Score: " + currentScore;
              }
              
       }
}

function handleGameOver(){
       ctx.drawImage(collide, astronaut.x, astronaut.y, 50, 50);
       document.getElementById('gameOver').style.display = 'flex';
       document.getElementById('finalScore').innerText = "Final Score: " + currentScore;

       return true; 
}

document.getElementById('playAgainButton').addEventListener('click', handleRestart);
function handleRestart(){
              // document.getElementById('gameOver').style.display = 'none';
              // obstacleArray = [];
              // starArray = [];
              // currentScore = 0; 
        
       window.location.href = `/score?name=${name}&suit=${scoreSuit}&score=${currentScore}`;
}

window.addEventListener('keydown', function(e){
       if (e.code === 'R') handleRestart();
} )
function handleHome(){
       //return home 
}

function toggleMute() {
       var myAudio = document.getElementById('audio');
       myAudio.muted = !myAudio.muted;
       console.log(myAudio.muted);
       if (myAudio.muted){
              document.getElementById('mute').style.display = 'none';
              document.getElementById('unmute').style.display = 'block';
       }
       else{
              document.getElementById('mute').style.display = 'block';
              document.getElementById('unmute').style.display = 'none';
       }
    }

    var audio = document.getElementById("audio");
       audio.volume = 0.2;