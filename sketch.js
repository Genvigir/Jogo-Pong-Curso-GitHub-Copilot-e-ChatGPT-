class Raquete {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.w = 10;
        this.h = 100; 
    }        

    update() {
        this.y = mouseY;
        // limitar dentro da tela
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);   
    }

    desenha() { 
        fill(color(255, 255, 255))
        rect(this.x, this.y - this.h / 2, this.w, this.h);
    }
}

class Bola {
    constructor() {
        this.r = 25;
        this.reset();
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < this.r || this.x > width - this.r) {
            this.reset();
        }
        if (this.y < this.r || this.y > height - this.r) {
            this.vy *= -1;
        }

        // se colidir com a raquete
        if (this.x - this.r < raquete.x + raquete.w && 
            this.y > raquete.y - raquete.h / 2 && 
            this.y < raquete.y + raquete.h / 2) {
            this.vx *= -1;
            this.x = raquete.x + raquete.w + this.r; // evitar ficar preso na raquete
        }
    }

    desenha() {
        fill(color(255, 0, 0))
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}

let bola;
let raquete;

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    raquete = new Raquete(50);
}

function draw() {
    background(color(0, 0, 0));
    bola.update();
    bola.desenha();
    raquete.update();
    raquete.desenha();
}