// Variáveis globais
var timer;
var contador = 1;
var dt = 0.07;
var x1 = 0;
var x2 = 0;
var y = 0;
var vx, vx1, vx2;
var ax1 = 0;
var ax2 = 0;
var elapsedTime = 0;


// Inputs
var gridSelector = document.getElementById("boolGrid");

// Importações do canvas
var scenario = document.getElementById("scenario");
var trailCanvas = document.getElementById("trailCanvas");
var trailContext = trailCanvas.getContext("2d");
var theCanvas = document.getElementById("theCanvas");
var theContext = theCanvas.getContext("2d");

// Funções para exibir valores nos mostradores dos novos sliders
function showBlackBallSpeed() {
  document.getElementById("blackBallSpeedReadout").innerHTML = document.getElementById("blackBallSpeedSlider").value;
}

function showGrayBallSpeed() {
  document.getElementById("grayBallSpeedReadout").innerHTML = document.getElementById("grayBallSpeedSlider").value;
}

function showBlackBallAccel() {
  document.getElementById("blackBallAccelReadout").innerHTML = document.getElementById("blackBallAccelSlider").value;
}

// Função para disparar o projétil
function fireProjectile() {
  window.clearTimeout(timer); // Limpa qualquer timer anterior
  contador = 0;
  x1 = 0; // Resetando a posição inicial
  x2 = 0; // Resetando a posição inicial
  elapsedTime = 0;
  y = 85;  // Resetando a posição inicial
  vx1 = Number(document.getElementById("blackBallSpeedSlider").value);
  vx2 = Number(document.getElementById("grayBallSpeedSlider").value);
  ax1 = Number(document.getElementById("blackBallAccelSlider").value);
  moveProjectile();
}



// Função para mover o projétil
function moveProjectile() {
  if (x1 < 525 && x2 < 525) {  // Verifica a posição de ambas as bolas
      contador += 1;
      vx1 += ax1 * dt;
      x1 += vx1 * dt + 0.5 * ax1 * dt * dt ;
      vx2 += ax2 * dt;
      x2 += vx2 * dt + 0.5 * ax2 * dt * dt ;
      elapsedTime += dt;
      document.getElementById("timerReadout").innerHTML = elapsedTime.toFixed(2);
      document.getElementById("blackBallDistanceReadout").innerHTML = x1.toFixed(2);
      document.getElementById("grayBallDistanceReadout").innerHTML = x2.toFixed(2);
      drawProjectile(x1, x2, y);
      timer = window.setTimeout(moveProjectile, 10);
  }
}



// Função para desenhar o projétil
function drawProjectile(x1, x2, y) {
  var metersPerPixel = 1;
  var pixelX1 = 35 + x1 / metersPerPixel;
  var pixelY1 = 220 - y / metersPerPixel;
  var pixelX2 = 35 + x2 / metersPerPixel;
  var pixelY2 = 220 - (y + 60) / metersPerPixel;

  var selectedColor = document.getElementById("trailColors").value;

  theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
  theContext.beginPath();
  theContext.arc(pixelX1, pixelY1, 10, 0, 2 * Math.PI); // Raio aumentado para 10
  theContext.fillStyle = selectedColor; // Usando a cor selecionada
  theContext.fill();

  theContext.beginPath();
  theContext.arc(pixelX2, pixelY2, 10, 0, 2 * Math.PI); // Raio aumentado para 10
  var theGradient = theContext.createRadialGradient(pixelX2 - 1, pixelY2 - 2, 1, pixelX2, pixelY2, 10); // Raio ajustado para 10
  theGradient.addColorStop(0, "#d0d0d0");
  theGradient.addColorStop(1, "#000000");
  theContext.fillStyle = theGradient;
  theContext.fill();
}


// Função para desenhar a grade
function drawGrid() {
  var drawBool = gridSelector.checked;
  if (drawBool) {
      document.getElementById("scenario-grid").style.zIndex = 1; // Ajustando a ordem de renderização
      document.getElementById("scenario").style.zIndex = 0;
  } else {
      document.getElementById("scenario-grid").style.zIndex = 0;
      document.getElementById("scenario").style.zIndex = 1;
  }
}

// Função para limpar o rastro
function clearTrail() {
    trailContext.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    theContext.clearRect(0, 0, theCanvas.width, theCanvas.height);
    document.getElementById("timerReadout").innerHTML = "0";
    document.getElementById("blackBallDistanceReadout").innerHTML = "0";
    document.getElementById("grayBallDistanceReadout").innerHTML = "0";

}

// Função para mudar a cor
function changeColor() {
    trailContext.fillStyle = document.getElementById("trailColors").value;
}
