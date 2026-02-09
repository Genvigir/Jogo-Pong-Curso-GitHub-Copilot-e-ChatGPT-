class Raquete {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.w = 10;
        this.h = 100; 
    }        

    update() {

        //se a raquete for do jogador, seguir o mouse
        if (this.x < width / 2) {
            this.y = mouseY;
        } else { // se a bola esta em cima vai pra cima
            if (bola.y < this.y) {
                this.y -= 5;
            } else
                // se a bola esta em baixo vai pra baixo
                if (bola.y > this.y) {
                    this.y += 5;
                }
            
        }
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

        //se colidir com a raquete do oponente
        if (this.x + this.r > raqueteOponente.x && 
            this.y > raqueteOponente.y - raqueteOponente.h / 2 &&
            this.y < raqueteOponente.y + raqueteOponente.h / 2) {
            this.vx *= -1;
            this.vx *= 1.1; // aumentar velocidade
            this.vy *= 1.1; // aumentar velocidade
            this.x = raqueteOponente.x - this.r; // evitar ficar preso na raquete
        }

        // se colidir com a raquete
        if (this.x - this.r < raquete.x + raquete.w && 
            this.y > raquete.y - raquete.h / 2 && 
            this.y < raquete.y + raquete.h / 2) {
            this.vx *= -1;
            this.vx *= 1.1; // aumentar velocidade
            this.vy *= 1.1; // aumentar velocidade
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
let raqueteOponente;

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    raquete = new Raquete(50);
    raqueteOponente = new Raquete(width - 50);
}

function draw() {class Raquete {
    constructor(x) {
        this.x = x;
        this.y = height / 2;
        this.w = 10;
        this.h = 60;
    }
    update() {

        // se a raquete é o jogador
        if (this.x < width / 2) {
            this.y = mouseY;
        } else {
            // se a bola está em cima vai pra cima
            if (bola.y < this.y) {
                this.y -= 5;
            } else {
                // se a bola está em baixo vai pra baixo
                this.y += 5;
            }
        }

        //limitar dentro da tela
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > height - this.h) {
            this.y = height - this.h;
        }
    }
    desenha() {
        fill(color(255, 255, 255));
        rect(this.x, this.y, this.w, this.h);
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
        const velecidadeMaxima = 5
        this.vx = Math.random() * velecidadeMaxima * 2 - velecidadeMaxima;
        this.vy = Math.random() * velecidadeMaxima * 2 - velecidadeMaxima;
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

        if (colideRetanguloCirculo(this.x, this.y, this.r, jogador.x, jogador.y, jogador.w, jogador.h) ||
            colideRetanguloCirculo(this.x, this.y, this.r, computador.x, computador.y, computador.w, computador.h)) {
            this.vx *= -1;
            this.vx *= 1.1;
            this.vy *= 1.1;
        }

    }

    desenha() {
        fill(color(255, 0, 0))
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}

// verifica a colisão entre um círculo e retângulo
// onde círculo é raio e cx, cy
// e retângulo é x, y, w, h
function colideRetanguloCirculo(cx, cy, raio, x, y, w, h) {
    // se o círculo está a esquerda ou a direita do retângulo
    if (cx + raio < x || cx - raio > x + w) {
        return false;
    }
    // se o círculo está acima ou abaixo do retângulo
    if (cy + raio < y || cy - raio > y + h) {
        return false;
    }
    return true;
}

let bola;
let jogador;
let computador;

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    jogador = new Raquete(30);
    computador = new Raquete(width - 30 - 10);
}

function draw() {
    background(color(0, 0, 0));
    bola.update();
    bola.desenha();
    jogador.update();
    jogador.desenha();
    computador.update();
    computador.desenha();
}
    background(color(0, 0, 0));
    bola.update();
    bola.desenha();
    raquete.update();
    raquete.desenha();
    raqueteOponente.update();
    raqueteOponente.desenha();
}