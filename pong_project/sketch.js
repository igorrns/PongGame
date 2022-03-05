//variaves da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6; 

//variaveis da minha raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variaveis raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//variavel colisão com a raquete
let colidiu = false;

//placar do jogos
let meusPontos = 0;
let pontosOponente = 0;

// chance de errar
let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  bolinha();
  movimentaBolinha();
  verificaBorda();
  raquetes(xRaquete, yRaquete);
  raquetes(xRaqueteOponente, yRaqueteOponente)
  movimentoMinhaRaquete();
  //movimentoRaqueteMP();
  movimentoRaqueteSP();
  colisaoRaquetes(xRaquete, yRaquete);
  colisaoRaquetes(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcarPontos();
  
  calculaChanceDeErrar();
  
}

function bolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha = xBolinha + velocidadeXBolinha;
  yBolinha = yBolinha + velocidadeYBolinha;
}

function verificaBorda() {
  if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;  
  }
}

function raquetes(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function colisaoRaquetes(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if(colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentoMinhaRaquete() {
  if(keyIsDown(UP_ARROW)){
    yRaquete = yRaquete -10;
  }
  if(keyIsDown(DOWN_ARROW))
    yRaquete = yRaquete +10;
}

function movimentoRaqueteMP() {
  if(keyIsDown(87)) {
    yRaqueteOponente = yRaqueteOponente -10;
  }
  if(keyIsDown(83)) {
    yRaqueteOponente = yRaqueteOponente +10;
  }
}

function movimentoRaqueteSP() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0))
  rect(150, 10 ,40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0))
  rect(450, 10, 40, 20 );
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcarPontos() {
  if(xBolinha > 593) {
    meusPontos = meusPonts +1;
    ponto.play();
  }
  if(xBolinha < 10) {
    pontosOponente = pontosOponente +1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if(pontosOponente >= meusPontos) {
    chanceDeErrar += 1;
    if(chanceDeErrar >= 39) {
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1;
    if(chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}  
  
  