let rippleShader;

let raindrop_cooldown = 1;  // Cooldown after raindrop, must be integer and >= 1
let raindrop_cooldown_count = 0;

let number_droplets_per_freq = 1;  // How many droplets in each raindrop

let allow_mouse = true;

let ripple_color = "rgb(255,255,255)";  //  Ripple Color
let random_color = false;    //  Random Ripple Color
const damping = 0.9999999;

// need two buffers
let currBuff, prevBuff;

// Create canvas
var Canvas;

function preload() {
  rippleShader = loadShader('rain/ripple.vert', 'rain/ripple.frag');
}

// function windowResized() {
//   console.log("window is resized");
//   resizeCanvas(windowWidth, windowHeight);
// }

function setup() {
  // cooldown_slider = createSlider(1, 60, 1);
  // cooldown_slider.position(20, 20);
  // number_droplets_slider = createSlider(0, 10, 0);
  // number_droplets_slider.position(150, 20);
  // random_color_slider = createSlider(0, 1, 0);
  // random_color_slider.position(280, 20);
  // random_color_slider.style('width', '30px');
  // allow_mouse_slider = createSlider(0, 1, 0);
  // allow_mouse_slider.position(320, 20);
  // allow_mouse_slider.style('width', '30px');
  // point_weight_slider = createSlider(1, 10, 1);
  // point_weight_slider.position(370, 20);
  
  Canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  noSmooth();
  // create buffers
  currBuff = createGraphics(windowWidth, windowHeight);
  currBuff.pixelDensity(1);
  currBuff.noSmooth();
  
  prevBuff = createGraphics(windowWidth, windowHeight);
  prevBuff.pixelDensity(1);
  prevBuff.noSmooth();
  
  // set the shader
  shader(rippleShader);
  
  rippleShader.setUniform("damping", damping);
  rippleShader.setUniform("res", [windowWidth, windowHeight]);
}
function draw() {
  // raindrop_cooldown = 61 - cooldown_slider.value();
  // number_droplets_per_freq = number_droplets_slider.value();
  // random_color = random_color_slider.value();
  // allow_mouse = allow_mouse_slider.value();
  // strokeWeight(point_weight_slider.value());
  raindrop_cooldown = 5;
  number_droplets_per_freq = 3;
  random_color = 0;
  allow_mouse = 1;
  strokeWeight(1);

  // add ripple at mouse
  random_color ? stroke(random(256), random(256), random(256)) : stroke(ripple_color);
  if(allow_mouse && mouseIsPressed) {
    point(mouseX - windowWidth/2, mouseY - windowHeight/2);
    // rect(mouseX - width/2, mouseY - height/2, 50, 50);
  }
  
  // add rain drop
  raindrop_cooldown_count = (raindrop_cooldown_count + 1) % raindrop_cooldown;
  if (raindrop_cooldown_count == 0) {
    for (let i = 0; i < number_droplets_per_freq; i++) {
      random_color ? stroke(random(256), random(256), random(256)) : stroke(ripple_color);
      point(random(windowWidth) - windowWidth/2, random(windowHeight) - windowHeight/2);
    }
  }

  // update buffers
  prevBuff.image(currBuff, 0, 0);
  currBuff.image(get(), 0, 0);
  
  // set the buffers inside the shader
  rippleShader.setUniform('currBuff', currBuff);
  rippleShader.setUniform('prevBuff', prevBuff);
  
  // give shader geometry to draw on
  rect(-windowWidth/2, -windowHeight/2, windowWidth, windowHeight);


}