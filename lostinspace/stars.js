const starArray = [];

class Star{
       constructor(){
              this.ylocation = (Math.random()* canvas.height);
              this.x = canvas.width;
              this.width = 35;
              this.height = 30;
       }
       draw(){
              const star = new Image();
              star.src = 'svgs/star.svg';
              ctx.drawImage(star, this.x, this.ylocation, this.width, this.height);
       }
       update(){
              this.x -= gamespeed;
              if (this.x < 5 ){
                     starArray.pop(starArray[0]);
              }
              this.draw();
       }
}
function handleStars (){
       //create obstacle every 50 frames
       if(frame%200 === 0 ){
              starArray.unshift(new Star);
       }
       for (let i = 0; i < starArray.length; i++){
              starArray[i].update();
       }
}