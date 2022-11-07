const obstacleArray = [];

class Obstacle{
       constructor(){
              this.ylocation = (Math.random()* canvas.height) ;
              this.x = canvas.width;
              this.width = 80;
              this.height = 70;
              this.counted = false; 
       }
       draw(){
              const asteroid = new Image();
              asteroid.src = 'svgs/astroid.svg';
              ctx.drawImage(asteroid, this.x, this.ylocation, this.width, this.height);
       }
       update(){
              this.x -= gamespeed;
              this.draw();
       }
}

function handleObstacle(){
       if(frame%40  === 0 ){
              obstacleArray.unshift(new Obstacle);
       }
       for (let i = 0; i < obstacleArray.length; i++){
              obstacleArray[i].update();
       }
       if (obstacleArray > 20){
              obstacleArray.pop(obstacleArray[0]);
       }
}