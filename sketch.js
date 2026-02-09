let bolaImagem;
let raqueteImagem;
let raqueteOponenteImagem;
let fundoImagem;    
let quicarSom;
let somGol;
let pontosJogador = 0;
let pontosOponente = 0;

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
        if (this.x < width / 2) {
            image(raqueteImagem, this.x, this.y - this.h / 2, this.w, this.h);
        } else {
            image(raqueteOponenteImagem, this.x, this.y - this.h / 2, this.w, this.h);
        }
    }
}

class Bola {
    constructor() {
        this.r = 25;
        this.reset();
        // angulo rotacao atual
        this.angle = 0;
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
    }

    update() {
        this.angle += 0.1;  
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < this.r || this.x > width - this.r) {
            if (this.x < this.r) {
                pontosOponente++;
            } else {
                pontosJogador++;
            }
            this.reset();
            somGol.play();
            falaPontos();
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
            quicarSom.play();

        }

        // se colidir com a raquete
        if (this.x - this.r < raquete.x + raquete.w && 
            this.y > raquete.y - raquete.h / 2 && 
            this.y < raquete.y + raquete.h / 2) {
            this.vx *= -1;
            this.vx *= 1.1; // aumentar velocidade
            this.vy *= 1.1; // aumentar velocidade
            this.x = raquete.x + raquete.w + this.r; // evitar ficar preso na raquete
            quicarSom.play();

        }
    }

    desenha() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        image(bolaImagem, -this.r, -this.r, this.r * 2, this.r * 2);
        pop();
    }
}

let bola;
let raquete;
let raqueteOponente;

function preload() {
    bolaImagem = loadImage('bola.png');
    raqueteImagem = loadImage('barra01.png');
    raqueteOponenteImagem = loadImage('barra02.png');
    fundoImagem = loadImage('fundo2.png');
    quicarSom = loadSound('446100__justinvoke__bounce.wav');
    somGol = loadSound('274178__littlerobotsoundfactory__jingle_win_synth_02.wav');
}

function falaPontos() {
    //use speechapi para falar os pontos
    pontuacao = "Pontuação é " + pontosJogador + " a " + pontosOponente;
    const msg = new SpeechSynthesisUtterance(pontuacao);
    msg.lang = 'pt-BR';
    window.speechSynthesis.speak(msg);
}

function setup() {
    createCanvas(800, 400);
    bola = new Bola();
    raquete = new Raquete(50);
    raqueteOponente = new Raquete(width - 50);
}

function draw() {

    // desenha centralizada o fundoImagem, com o aspectRatio do canvas, 
    // e zomm out o máximo possivel
// centralized fundoImagem, with canvas aspectRatio, and zoom out as maximun as possible
    let canvasAspectRatio = width / height;
    let fundoAspectRatio = fundoImagem.width / fundoImagem.height;
    let zoom = 1;
    if (canvasAspectRatio > fundoAspectRatio) {
        zoom = width / fundoImagem.width;
    } else {
        zoom = height / fundoImagem.height;
    }
    let scaledWidth = fundoImagem.width * zoom;
    let scaledHeight = fundoImagem.height * zoom;
    image(fundoImagem, (width - scaledWidth) / 2, (height - scaledHeight) / 2, scaledWidth, scaledHeight);


    bola.update();
    bola.desenha();
    raquete.update();
    raquete.desenha();
    raqueteOponente.update();
    raqueteOponente.desenha();
}