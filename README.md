# Customizable Flow Field

## Description

The simulation creates a flow field of particles that move around the screen. The behaviour of the particles can be customized by changing the number of particles, noise, speed, thickness, and colour of the particles. You can also save your art.

This is a dynamic flow field simulation using p5.js, where particles move around the screen. The particles’ motion is influenced by Perlin noise, resulting in their fluid and organic movements. The simulation also responds to mouse clicks, shifting to a new noise pattern each time. If a particle moves off the canvas, it is repositioned randomly within the canvas, ensuring a continuous flow. 

The particles also react to audio input from your microphone, creating a dynamic, music-responsive visual experience.

## Current Features

- **Noise**: Adjust the noise to change the randomness of the particle movement.
- **Speed**: Control the speed of the particles.
- **Thickness**: Change the thickness of the particles to create different visual effects.
- **Colour**: Customize the colour of the particles.
- **Save**: The current state of the flow field art can be saved as a `.jpg`.
- **Pattern**: Change the flow and pattern of the particles by clicking the screen.
- **Audio Interaction**: Particles dynamically respond to audio input from your microphone.

## Future Enhancements

- **Advanced Audio Features**: Add more complex audio-reactive behaviours, such as frequency-based particle movement.

## How to Use

1. **Clone the repo**: Use `git clone`.
2. **Run the project**: Open `index.html` in your browser (open with live server).
3. **Interact**: 
   - Click on the screen to change the noise pattern.
   - Enable microphone access to see particles react to audio input.
4. **Customize**: Change the number of particles, noise, speed, thickness, and colour.