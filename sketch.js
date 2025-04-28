// particles
let particles = [];
let numParticles = 2000;

// noise
let noiseScale = 0.01;

// speed
let speed = 1.5;

// stroke weight
let weight = 1;

// colour
let colour = '#ffffff';

// audio visualization
let mic;
let fft;
let audioStarted = false;
let micLevel = 2.0; // amplification factor

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put vectors into list of particles
  for(let i = 0; i < numParticles; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  strokeWeight(weight);
  stroke(colour);

  // setup audio
  mic = new p5.AudioIn();
  fft = new p5.FFT(0.8, 64); // increased smoothing and bins
  fft.setInput(mic);

  // accessible menu toggle
  const menuButton = document.getElementById('menuButton');
  const menu = document.getElementById('menu');
  const overlay = document.querySelector('.menu-overlay');

  function openMenu() {
    menu.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    menuButton.setAttribute('aria-expanded', 'true');
    // focus first input in menu
    const firstInput = menu.querySelector('input, button');
    if (firstInput) firstInput.focus();
  }
  function closeMenu() {
    menu.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
  menuButton.addEventListener('click', function() {
    if (menu.getAttribute('aria-hidden') === 'true') {
      openMenu();
    } else {
      closeMenu();
    }
  });
  // close menu when clicking overlay
  overlay.addEventListener('click', closeMenu);
  // keyboard accessibility: escape closes menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.getAttribute('aria-hidden') === 'false') {
      closeMenu();
    }
  });
  // start with menu closed
  closeMenu();

  // audio button event listener
  document.getElementById('audioButton').addEventListener('click', function() {
    if (!audioStarted) {
      mic.start(function() {
        console.log('Microphone started');
        audioStarted = true;
        this.textContent = '🎵 Stop audio';
      }.bind(this), function(err) {
        console.error('Error starting microphone:', err);
      });
    } else {
      mic.stop();
      audioStarted = false;
      this.textContent = '🎵 Start audio';
    }
  });

  // event listeners for the sliders
  document.getElementById('particleNumber').addEventListener('input', function(e) {
    numParticles = Number(e.target.value);
    particles = particles.slice(0, numParticles);
    while(particles.length < numParticles) {
      particles.push(createVector(random(width), random(height)));
    }
    // redraw the particles
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

  // color picker event listener
  document.getElementById('colour').addEventListener('input', function(e) {
    colour = e.target.value;
    stroke(colour);
  });

  // event listener to save jpg
  document.getElementById('saveButton').addEventListener('click', function() {
    save("myFlowField.jpg");
  });

  document.getElementById('resetButton').addEventListener('click', function() {
    // reload the page to reset all values
    location.reload();
  });
}

function draw() {
  background(0, 10);
  
  // analyze audio if started
  if (audioStarted) {
    let spectrum = fft.analyze();
    
    // get energy from different frequency ranges
    let bass = fft.getEnergy(20, 140);    // low frequencies
    let mid = fft.getEnergy(140, 400);    // mid frequencies
    let high = fft.getEnergy(400, 2000);  // high frequencies
    
    // amplify and constrain
    bass = constrain(bass * micLevel, 0, 255);
    mid = constrain(mid * micLevel, 0, 255);
    high = constrain(high * micLevel, 0, 255);
    
    // map different frequency ranges to different effects
    speed = map(bass, 0, 255, 1, 4);      // bass controls speed
    noiseScale = map(mid, 0, 255, 0.005, 0.03); // mid controls noise pattern
    weight = map(high, 0, 255, 1, 4);     // high frequencies control thickness
  }

  // display the particles
  for (let i = 0; i < numParticles; i ++){
    let p = particles[i];
    stroke(colour);
    point(p.x, p.y);
    move(p);
  }
}

function move(p) {
  let generateNoise = noise(p.x * noiseScale, p.y * noiseScale);
  let angle = TAU * generateNoise;
  
  p.x += cos(angle) * speed;
  p.y += sin(angle) * speed;
  
  // check if vector is on the screen or not
  if (!onCanvas(p)) {
    p.x = random(width);
    p.y = random(height);
  }
}

function mousePressed() {
  // to change noise values that we get, shifts to new noise pattern
  noiseSeed(random(10000));
}

function onCanvas(vector) {
  return vector.x >= 0 && vector.x <= width &&
    vector.y >= 0 && vector.y <= height;
}