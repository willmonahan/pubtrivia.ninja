let inputX;
let inputY;

const minSize = 1.5;
const maxSize = 10;
const gravity = 0.05;
const shrink = 0.01;

let particles;

function setup() {
  createCanvas(windowWidth, displayHeight);
  background(0,0,0);
  ellipseMode(CENTER);
  noStroke();

  particles = [];
}

function draw() {
  background(color(0, 30));

  for(let i=0; i<particles.length; i++) {
    const shouldRemove = particles[i].do();
    if(shouldRemove) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function mousePressed() {
  handleInput();
}

function touchStarted() {
  handleInput();
}

function handleInput() {
  getInputs();

  const numToAdd = random(40, 60);

  for(i=0; i<numToAdd; i++) {
    particles.push(new Particle(inputX, inputY));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, displayHeight);
}

function getInputs() {
  inputX = touches.length ? touches[0].x : mouseX;
  inputY = touches.length ? touches[0].y : mouseY;
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(minSize, maxSize);
    this.color = color(random(255), random(255), random(255), random(200,255));
    this.vel = {
      x: random(-2.5, 2.5),
      y: random(.5,-5)
    };
  }

  do() {
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);

    this.x += this.vel.x;
    this.vel.y += gravity;
    this.y += this.vel.y;
    this.size -= shrink;

    if (this.size < 0 || this.y > height+this.size) {
      return true;
    }

    return false;
  }
}
