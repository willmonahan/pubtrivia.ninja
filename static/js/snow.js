const minSize = 3;
const maxSize = 10;
let parallax = 35;
let mouseOffset = 0;
let numOfSnowflakes;

const snowflakes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(217, 30, 30);
  ellipseMode(CENTER);
  noStroke();

  numOfSnowflakes = width/5;
  parallax = width/40;

  for(let i=0; i<numOfSnowflakes; i++) {
    snowflakes.push(new Snowflake());
  }
}

function draw() {
  background(217, 30, 30);
  // for parallax
  const inputX = touches.length ? touches[0].x : mouseX;
  mouseOffset = (inputX - width/2)/(width/2);

  for(let i=0; i<numOfSnowflakes; i++) {
    snowflakes[i].draw();
    snowflakes[i].do();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  parallax = width/40;
}

class Snowflake {
  constructor() {
    this.setup();
  }

  setup() {
    this.size = random(minSize, maxSize);
    this.x = random(width);
    this.originalX = this.x;
    this.y = -1 * random(this.size, height);
    this.opacity = random(255);
    this.speed = random(2, 5);
  }

  do() {
    this.y += this.speed;

    // PARALLAX
    const amount = map(this.size, minSize, maxSize, 0, 1);
    const offset = parallax * amount * mouseOffset;
    this.x = this.originalX + offset;

    if(this.y > height + this.size) {
      this.setup();
      this.y = -1 * this.size;
    }
  }

  draw() {
    fill(255, this.opacity);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
