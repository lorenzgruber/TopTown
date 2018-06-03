var game;
var devTools;
var canvas;
var ctx;

function preload(){
  loadImages();
  loadData();
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  canvas = document.getElementById('defaultCanvas0');
  ctx = canvas.getContext("2d");
  noStroke();
  noCursor();

  game = new Game();

  devTools = new DevTools();
  devTools.init();
}

function draw() {
  var c = color('#1d1523');
  background(c);

  game.update();
  game.render();

  devTools.update();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
