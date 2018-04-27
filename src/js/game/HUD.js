function drawHUD(){
    drawHealthBar();
}

function drawHealthBar(){
    var col = color(200);
    var healthBarLength = map(game.player.health, 0, game.player.initalHealth, 1, width / 4);
    if (healthBarLength < 0) {
        healthBarLength = 0;
    }

    if(healthBarLength < width / 4* 0.5){
        col = color(200,140,50);
    }
    if(healthBarLength < width / 4* 0.25){
        col = color(200,60,40);
    }

    push();

    fill(col)
    rect(game.camera.pos.x - width / 8, game.camera.pos.y + height / 2 - 80, healthBarLength, 50);

    pop();
    push();

    noFill();
    stroke(100);
    strokeWeight(10);
    rect(game.camera.pos.x - width / 8, game.camera.pos.y + height / 2 - 80, width / 4, 50);


    pop();
}

function drawNexusHealthBar(){
  var healthBarLength = map(game.nexus.health, 0, game.nexus.initalHealth, 1, width/4);
  var col = color('#ef2d6d');

  if(healthBarLength < 0){
    healthBarLength= 0;
  }

  if(healthBarLength < width / 4* 0.5){
      col = color(200,140,50);
  }
  if(healthBarLength < width / 4* 0.25){
      col = color(200,60,40);
  }

  push();

  fill(col)
  rect(game.camera.pos.x - width / 8, game.camera.pos.y + height / 2 - 100, healthBarLength, 20);

  pop();
  push();

  noFill();
  stroke(100);
  strokeWeight(10);
  rect(game.camera.pos.x - width / 8, game.camera.pos.y + height / 2 - 100, width / 4, 20);


  pop();
}

function drawDodgeMeter(){
  var col = color(255);
  var dodgeMeterLength = map(game.player.timeFromLastDodge, 0, game.player.dodgeDelay, -1, -70);

  if(game.player.timeFromLastDodge == game.player.dodgeDelay){
    col = color(110, 230, 255);
  }

  push();

  fill(col)
  rect(game.camera.pos.x - width / 8 - 40, game.camera.pos.y + height / 2 - 30, 20, dodgeMeterLength);

  pop();
  push();

  noFill();
  stroke(100);
  strokeWeight(10);
  rect(game.camera.pos.x - width / 8 - 40, game.camera.pos.y + height / 2 - 30, 20, -70);


  pop();
}

function drawGameOverScreen(){
    push();

    fill(20)
    rectMode(CENTER);
    rect(game.camera.pos.x, game.camera.pos.y, width * 2/3, height* 2/3);

    textSize(100);
    textAlign(CENTER, CENTER);
    fill(255);
    text('GAME OVER', game.camera.pos.x, game.camera.pos.y);
    textSize(40);
    text('YOUR SCORE WAS', game.camera.pos.x, game.camera.pos.y+ 100);
    text(game.score, game.camera.pos.x, game.camera.pos.y+ 150);

    pop();
}

function drawFireRateMeter(){
  var col = color(255);
  var fireRateMeterLength = map(game.player.timeFromLastShot, 0, game.player.currentWeapon.fireRate, -1, -70);

  if(game.player.timeFromLastShot == game.player.currentWeapon.fireRate){
    col = color(255,170,0);
  }

  push();

  fill(col)
  rect(game.camera.pos.x + width / 8 + 20, game.camera.pos.y + height / 2 - 30, 20, fireRateMeterLength);

  pop();
  push();

  noFill();
  stroke(100);
  strokeWeight(10);
  rect(game.camera.pos.x + width / 8 + 20, game.camera.pos.y + height / 2 - 30, 20, -70);


  pop();
}

function drawGameOverScreen(){
    push();

    fill(20)
    rectMode(CENTER);
    rect(game.camera.pos.x, game.camera.pos.y, width * 2/3, height* 2/3);

    textSize(100);
    textAlign(CENTER, CENTER);
    fill(255);
    text('GAME OVER', game.camera.pos.x, game.camera.pos.y);
    textSize(40);
    text('YOUR SCORE WAS', game.camera.pos.x, game.camera.pos.y+ 100);
    text(game.score, game.camera.pos.x, game.camera.pos.y+ 150);

    pop();
}

function drawMinimap(){
  var scale = 1 / 10 * width*0.0005;
  push();
    translate(game.camera.pos.x + width/2 - game.worldSize.x*scale - 50, game.camera.pos.y + height/2 - game.worldSize.y*scale -50);
    rectMode(CENTER);
      push();
        fill(color("rgba(0,0,0,0.5)"));
        rect(0,0, 2*game.worldSize.x*scale, 2*game.worldSize.y*scale);
      pop();
      push();
        noFill();
        stroke(255);
        strokeWeight(5);
        rect(0,0, 2*game.worldSize.x*scale+5, 2*game.worldSize.y*scale+5);
      pop();
      push();
        fill(255,0,0);
        for (var i = 0; i < game.enemies.length; i++) {
          rect(game.enemies[i].pos.x*scale, game.enemies[i].pos.y*scale, game.enemies[i].size*scale*2, game.enemies[i].size*scale*2);
        }
      pop();
      push();
        fill(255);
        rect(game.player.pos.x*scale, game.player.pos.y*scale, game.player.size*scale*2, game.player.size*scale*2);
      pop();
      push();
        fill(180,100,255);
        rect(game.nexus.pos.x*scale, game.nexus.pos.y*scale, game.nexus.size*scale, game.nexus.size*scale);
      pop();
  pop();
}

function drawCursor(){
  if(!game.player.inv.showing){
    var size = 15;
    var pos = createVector(mouseX - width / 2, mouseY - height / 2);

    push();

    if(mouseIsPressed){
      stroke(255);
    }
    else{
      stroke(180);
    }

    noFill();
    strokeWeight(2);

    translate(mouseX - width / 2, mouseY - height / 2);
    line(game.camera.pos.x-size, game.camera.pos.y, game.camera.pos.x+size, game.camera.pos.y);
    line(game.camera.pos.x, game.camera.pos.y-size, game.camera.pos.x, game.camera.pos.y+size);
    rectMode(CENTER);
    rect(game.camera.pos.x, game.camera.pos.y, size, size);

    pop();
  }
}

function drawMag(){
  push();

  textFont('Georgia');
  textSize(30);
  textAlign(CENTER, CENTER);
  fill(255);
  text(game.player.currentWeapon.bulletsinMag + '/' + game.player.inv.bullets, game.camera.pos.x, game.camera.pos.y + height/2 -130);

  pop();
}

function drawReloadBar(){
  if(game.player.currentWeapon.reloading){

    var col = color(255,170,0);
    var reloadBarLength = map(game.player.currentWeapon.timeFromLastReload, 0, game.player.currentWeapon.reloadTime, 1, width/4 + 80);

    push();

    fill(col);
    rect(game.camera.pos.x - width/8 - 40, game.camera.pos.y + height/2 - 135, reloadBarLength, 15);

    pop();
    push();

    stroke(100);
    strokeWeight(10);
    noFill();
    rect(game.camera.pos.x - width/8 - 40, game.camera.pos.y + height/2 - 135, width/4 + 80, 15);

    pop();
  }
}
