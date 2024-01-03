//particles
let particles = [];
let numParticles = 2000;

//noise
let noiseScale = 0.01;

//speed
let speed = 1.5;

//stroke weight
let weight = 1;

//colour
let colour = [255]; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  //put vectors into list of particles
  for(let i = 0; i < numParticles; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  strokeWeight(weight);
  stroke(colour);

  //event listener to the menu
  document.getElementById('menuButton').addEventListener('click', function() {
    let menu = document.getElementById('menu');
    if (menu.style.display === 'none') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  });

  //event listeners for the sliders
  document.getElementById('particleNumber').addEventListener('input', function(e) {
    numParticles = Number(e.target.value);
    particles = particles.slice(0, numParticles);
    while(particles.length < numParticles) {
      particles.push(createVector(random(width), random(height)));
    }
    //redraw the particles
    draw();
  });  

  document.getElementById('noise').addEventListener('input', function(e) {
    noiseScale = Number(e.target.value);
    move();
  });
  
  document.getElementById('speed').addEventListener('input', function(e) {
    speed = e.target.value;
  });

  document.getElementById('thickness').addEventListener('input', function(e) {
    strokeWeight(e.target.value);
  });

  document.getElementById('color').addEventListener('input', function(e) {
    colour = e.target.value;
  });

  //event listener to save jpg
  document.getElementById('saveButton').addEventListener('click', function() {
    save("myFlowField.jpg");
  });

  document.getElementById('resetButton').addEventListener('click', function() {
    //reload the page to reset all values
    location.reload();
  });
}

function draw() {
  //2nd parameter to smooth out and see previous iterations
  background(0, 10);
  //display the particles
  for (let i = 0; i < numParticles; i ++){
    let p = particles[i];
    stroke(colour);
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

function mousePressed() {
  //to change noise values that we get, shifts to new noise pattern
  noiseSeed(random(10000));
}

function onCanvas(vector) {
  return vector.x >= 0 && vector.x <= width &&
    vector.y >= 0 && vector.y <= height;
}