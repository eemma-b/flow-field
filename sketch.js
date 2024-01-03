//particles
let particles = [];
const numParticles = 1000;

//noise
const noiseScale = 0.01;

//speed
const speed = 1.5;

//stroke weight
const weight = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //put vectors into list of particles
  for(let i = 0; i < numParticles; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  strokeWeight(weight);
  stroke(255, 0, 0);
}

function draw() {
  //2nd parameter to smooth out and see previous iterations
  background(0, 10);
  //display the particles
  for (let i = 0; i < numParticles; i ++){
    let p = particles[i];
    point(p.x, p.y);
    move(p);
  }
}

function move(p) {
  let generateNoise = noise(p.x * noiseScale, p.y * noiseScale);
  //get value between 0 and 1 using
  let angle = TAU * generateNoise;
  
  //convert angle to x and y
  p.x += cos(angle) * speed;
  p.y += sin(angle) * speed;
  
  //check if vector is on the screen or not
  if (!onCanvas(p)) {
    p.x = random(width);
    p.y = random(height);
  }
}

function mouseReleased() {
  //to change noise values that we get, shifts to new noise pattern
  noiseSeed(millis);
}

function onCanvas(vector) {
  return vector.x >= 0 && vector.x <= width &&
    vector.y >= 0 && vector.y <= height;
}

//save art as jpg
function keyTyped() {
  if (key === "s") {
    save("myFlowField.jpg");
  }
}