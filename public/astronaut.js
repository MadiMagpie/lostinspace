const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const suit = urlParams.get('suit');

const white = 'svgs/spaceman_w1.svg';
const blue = 'svgs/spaceman_b1.svg';
const red = 'svgs/spaceman_r1.svg';
const green = 'svgs/spaceman_g1.svg';



class Astronaut{
       constructor(){
              this.x = 150;
              this.y = 200;
              this.velocity = 0;
              this.width = 55 ;
              this.height = 50;
              this.weight = 1;
       }
       update(){
              //longer astro falls, faster it falls
              if (this.y > canvas.height - (this.height*1.5) ){
                     this.y = canvas.height - (this.height*1.5); 
                     this.velocity = 0;
              } else {
                     this.velocity += this.weight;
                     this.velocity *=0.9
                     this.y += this.velocity;
              }
              if(this.y < 0 + this.height/3){
                     this.y = this.height/3;
                     this.velocity = 0;
              }
              if (keyPressed)  this.rocket();
              
       }
       
       draw(){
              const astro = new Image();
              // if (suit === 'white'){
              //        astro.src = white;
              // }
              if (suit === 'blue'){
                     astro.src = blue;
              }
              if (suit === 'red'){
                     astro.src = red;
              }
              if (suit === 'green'){
                     astro.src = green;
              }
              else if(suit === 'white') {
                     astro.src = white;
              }
              ctx.drawImage(astro, this.x, this.y, this.width, this.height);
       }
       rocket(){
              this.velocity -= 2;
       }
}
const astronaut = new Astronaut();