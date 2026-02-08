// posicao da bola
var x = 200;
var y = 200;

// velociadades da bola
var vx = 5;
var vy = 5;

//funcao setup do p5js
function setup() {
    createCanvas(400, 400);
}

//funcao de desenho do p5js
function draw() {
    background(0);
    fill(255);
    ellipse(x, y, 50, 50);
    x += vx;
    y += vy;
}