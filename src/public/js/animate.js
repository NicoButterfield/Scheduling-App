//p5.js animation at the bottom of the page
let canvas;
let mound = [];

function setup(){
    // Creates a canvas with 800px width and 600px height
    canvas = createCanvas(windowWidth, windowHeight);

    canvas.style('z-index', -1);
    canvas.position(0,0);

    for (let i = 0; i < 50; i++) {
        mound.push(new Sand());
    }
  }
  function windowResized()
  {
      resizeCanvas(windowWidth, windowHeight);
  }

function draw()
{ 
    clear();
    for (let i = 0; i < mound.length; i++) 
    {
        mound[i].move();
        mound[i].display();
    }
}


class Sand 
  {
    constructor() 
    {
      
      this.x = random(width);
      this.y = 0;
      this.speedX = random(-2, 2);
      this.speedY = random(1, 3);
      
      if(this.speedX === 0)
      {
        this.speedX = 1;
      }
    }
  
    move() 
    {
      if(this.x >= width || this.x <= 0)
      {
        this.x = random(width);
        this.y = 0;
        this.speedX = random(-2, 2);
        this.speedY = random(1, 3);
      }

      if(this.y >= height)
      {
        this.x = random(width);
        this.y = 0;
        this.speedX = random(-2, 2);
        this.speedY = random(1, 3);
      }

      this.x += this.speedX;
      this.y += this.speedY;
    }
    
  
    display() 
    {
      strokeWeight(5);
      stroke(255,255,255);
      line(this.x, this.y, this.x, this.y);
    }
}

