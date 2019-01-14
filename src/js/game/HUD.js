function drawHUD() {
  drawHealthBar();
}

function drawHealthBar() {
  var col = color(255);
  var healthBarLength = map(game.player.health, 0, game.player.initalHealth, 1, width / 4 - 10);
  if (healthBarLength < 0) {
    healthBarLength = 0;
  }

  if (healthBarLength < width / 4 * 0.5) {
    col = color(255, 159, 64);
  }
  if (healthBarLength < width / 4 * 0.25) {
    col = color(180, 22, 50);
  }

  push();

  fill(color("rgba(0,0,0,0.5)"));
  stroke(93, 74, 106);
  strokeWeight(10);
  rect(game.camera.hudPos.x - width / 8, game.camera.hudPos.y + height / 2 - 80, width / 4, 50);


  pop();

  push();

  fill(col)
  rect(game.camera.hudPos.x - width / 8 + 5, game.camera.hudPos.y + height / 2 - 80, healthBarLength, 45);

  pop();
}

function drawNexusHealthBar() {
  var healthBarLength = map(game.nexus.health, 0, game.nexus.initalHealth, 1, width / 4 - 10);
  var col = color(241, 58, 104);

  if (healthBarLength < 0) {
    healthBarLength = 0;
  }

  if (healthBarLength < width / 4 * 0.5) {
    col = color(255, 159, 64);
  }
  if (healthBarLength < width / 4 * 0.25) {
    col = color(180, 22, 50);
  }

  push();

  fill(color("rgba(0,0,0,0.5)"));
  stroke(93, 74, 106);
  strokeWeight(10);
  rect(game.camera.hudPos.x - width / 8, game.camera.hudPos.y + height / 2 - 100, width / 4, 20);


  pop();

  push();

  fill(col)
  rect(game.camera.hudPos.x - width / 8 + 5, game.camera.hudPos.y + height / 2 - 95, healthBarLength, 10);

  pop();

}

function drawDodgeMeter() {
  var col = color(255);
  var dodgeMeterLength = map(game.player.timeFromLastDodge, 0, game.player.dodgeDelay, -1, -60);

  if (game.player.timeFromLastDodge == game.player.dodgeDelay) {
    col = color(110, 230, 255);
  }

  push();

  fill(color("rgba(0,0,0,0.5)"));
  stroke(93, 74, 106);
  strokeWeight(10);
  rect(game.camera.hudPos.x - width / 8 - 40, game.camera.hudPos.y + height / 2 - 30, 20, -70);


  pop();

  push();

  fill(col)
  rect(game.camera.hudPos.x - width / 8 - 35, game.camera.hudPos.y + height / 2 - 35, 10, dodgeMeterLength);

  pop();
}

function drawGameOverScreen() {
  push();

  fill(20)
  rectMode(CENTER);
  rect(game.camera.hudPos.x, game.camera.hudPos.y, width * 2 / 3, height * 2 / 3);

  textSize(100);
  textAlign(CENTER, CENTER);
  fill(255);
  text('GAME OVER', game.camera.hudPos.x, game.camera.hudPos.y);
  textSize(40);
  text('YOUR SCORE WAS', game.camera.hudPos.x, game.camera.hudPos.y + 100);
  text(game.score, game.camera.hudPos.x, game.camera.hudPos.y + 150);

  pop();
}

function drawFireRateMeter() {
  var col = color(255);
  var fireRateMeterLength = map(game.player.timeFromLastShot, 0, game.player.currentWeapon.fireRate, -1, -60);

  if (game.player.timeFromLastShot == game.player.currentWeapon.fireRate) {
    col = color(255, 159, 64);
  }

  push();

  fill(color("rgba(0,0,0,0.5)"));
  stroke(93, 74, 106);
  strokeWeight(10);
  rect(game.camera.hudPos.x + width / 8 + 20, game.camera.hudPos.y + height / 2 - 30, 20, -70);


  pop();

  push();

  fill(col)
  rect(game.camera.hudPos.x + width / 8 + 25, game.camera.hudPos.y + height / 2 - 35, 10, fireRateMeterLength);

  pop();

}

function drawGameOverScreen() {
  push();

  fill(20)
  rectMode(CENTER);
  rect(game.camera.hudPos.x, game.camera.hudPos.y, width * 2 / 3, height * 2 / 3);

  textSize(100);
  textAlign(CENTER, CENTER);
  fill(255);
  text('GAME OVER', game.camera.hudPos.x, game.camera.hudPos.y);
  textSize(40);
  text('Press Any Key to Restart', game.camera.hudPos.x, game.camera.hudPos.y + 100);
  pop();
}

function drawMinimap() {
  var scale = 1 / 10 * width * 0.0005;
  push();
  translate(game.camera.hudPos.x + width / 2 - game.worldSize.x * scale - 50, game.camera.hudPos.y + height / 2 - game.worldSize.y * scale - 50);
  rectMode(CENTER);
  push();
  fill(color("rgba(0,0,0,0.5)"));
  rect(0, 0, 2 * game.worldSize.x * scale, 2 * game.worldSize.y * scale);
  pop();
  push();
  noFill();
  stroke(255);
  strokeWeight(5);
  rect(0, 0, 2 * game.worldSize.x * scale + 5, 2 * game.worldSize.y * scale + 5);
  pop();
  for (var i = 0; i < game.enemies.length; i++) {
    if(game.enemies[i].type == "Regular"){
      push();
      fill(color("#FFF35F"));
      // rgb(175, 246, 128)
      rect(game.enemies[i].pos.x * scale, game.enemies[i].pos.y * scale, game.enemies[i].size * scale * 2, game.enemies[i].size * scale * 2);
      pop();
    }
    if(game.enemies[i].type == "Spitter"){
      push();
      fill(color("#FF9166"));
      //rgb(255, 169, 50)
      rect(game.enemies[i].pos.x * scale, game.enemies[i].pos.y * scale, game.enemies[i].size * scale * 2, game.enemies[i].size * scale * 2);
      pop();
    }
    if(game.enemies[i].type == "Giant"){
      push();
      fill(color("#FF4893"));
      // rgb(198, 7, 101)
      rect(game.enemies[i].pos.x * scale, game.enemies[i].pos.y * scale, game.enemies[i].size * scale * 2 * 0.8, game.enemies[i].size * scale * 2 * 0.8);
      pop();
    }
  }
  push();
  fill(255);
  rect(game.player.pos.x * scale, game.player.pos.y * scale, game.player.size * scale * 2, game.player.size * scale * 2);
  pop();
  push();
  strokeWeight(3);
  stroke(255);
  fill(color("#FF6EA9"));
  // rgb(241, 58, 104)
  rect(game.nexus.pos.x * scale, game.nexus.pos.y * scale, game.nexus.size * scale * 1.2, game.nexus.size * scale * 1.2);
  pop();
  pop();
}

function drawCursor() {
  if (!game.player.inv.showing) {
    var size = 15;
    var pos = createVector(mouseX - width / 2, mouseY - height / 2);

    push();

    if (mouseIsPressed) {
      stroke(255);
    } else {
      stroke(180);
    }

    noFill();
    strokeWeight(2);

    translate(mouseX - width / 2, mouseY - height / 2);
    line(game.camera.hudPos.x - size, game.camera.hudPos.y, game.camera.hudPos.x + size, game.camera.hudPos.y);
    line(game.camera.hudPos.x, game.camera.hudPos.y - size, game.camera.hudPos.x, game.camera.hudPos.y + size);
    rectMode(CENTER);
    rect(game.camera.hudPos.x, game.camera.hudPos.y, size, size);

    pop();
  }
}

function drawMag() {
  if (game.player.currentWeapon != -1) {
    push();

    textFont('Anton');
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(255);
    text(game.player.currentWeapon.bulletsinMag, game.camera.hudPos.x, game.camera.hudPos.y + height / 2 - 130);

    pop();
  }
}

function drawReloadBar() {
  if (game.player.currentWeapon.reloading) {

    var col = color(255, 159, 64);
    var reloadBarLength = map(game.player.currentWeapon.timeFromLastReload, 0, game.player.currentWeapon.reloadTime, 1, width / 4 + 70);

    push();

    stroke(72, 58, 82);
    strokeWeight(10);
    fill(color("rgba(0,0,0,0.5)"));
    rect(game.camera.hudPos.x - width / 8 - 40, game.camera.hudPos.y + height / 2 - 135, width / 4 + 80, 15);

    pop();

    push();

    fill(col);
    rect(game.camera.hudPos.x - width / 8 - 35, game.camera.hudPos.y + height / 2 - 130, reloadBarLength, 5);

    pop();
  }
}

function drawWeapon() {
  var size = width / 12;

  if (game.player.inv.selectedWeaponSlot == 1) {
    push();
    stroke(255, 255, 255);
    strokeWeight(5);
    fill(color("rgba(0,0,0,0.5)"));
    rectMode(CENTER);
    rect(game.camera.hudPos.x - width / 2 + size / 2 + 25, game.camera.hudPos.y + height / 2 - size / 2 - 25, size * 3 / 4 +20, size * 3 / 4 +20);
    pop();
    if (game.player.inv.mainWeaponSlot != -1) {
      push();
      ctx.globalAlpha = 1;
      ctx.drawImage(game.player.inv.mainWeaponSlot.img, game.camera.hudPos.x - width / 2 + 25 + size * 1 / 5 -10, game.camera.hudPos.y + height / 2 - size - 25 + size * 1 / 5 -10, size * 3 / 5 +20, size * 3 / 5 +20);
      pop();
    }
  } else {
    push();
    stroke(color("rgba(255,255,255,0.4)"));
    strokeWeight(5);
    fill(color("rgba(0,0,0,0.3)"));
    rectMode(CENTER);
    rect(game.camera.hudPos.x - width / 2 + size / 2 + 25, game.camera.hudPos.y + height / 2 - size / 2 - 25, size * 3 / 4, size * 3 / 4);
    pop();
    if (game.player.inv.mainWeaponSlot != -1) {
      push();
      ctx.globalAlpha = 0.4;
      ctx.drawImage(game.player.inv.mainWeaponSlot.img, game.camera.hudPos.x - width / 2 + 25 + size * 1 / 5, game.camera.hudPos.y + height / 2 - size - 25 + size * 1 / 5, size * 3 / 5, size * 3 / 5);
      pop();
    }
  }

  if (game.player.inv.selectedWeaponSlot == 2) {
    push();
    stroke(255, 255, 255);
    strokeWeight(5);
    fill(color("rgba(0,0,0,0.5)"));
    rectMode(CENTER);
    rect(game.camera.hudPos.x - width / 2 + size / 2 + 25 + size + 25, game.camera.hudPos.y + height / 2 - size / 2 - 25, size * 3 / 4 +20, size * 3 / 4 +20);
    pop();
    if (game.player.inv.secWeaponSlot != -1) {
      push();
      ctx.globalAlpha = 1;
      ctx.drawImage(game.player.inv.secWeaponSlot.img, game.camera.hudPos.x - width / 2 + 25 + size * 1 / 5 + size + 25 -10, game.camera.hudPos.y + height / 2 - size - 25 + size * 1 / 5 -10, size * 3 / 5 +20, size * 3 / 5 +20);
      pop();
    }
  } else {
    push();
    stroke(color("rgba(255,255,255,0.4)"));
    strokeWeight(5);
    fill(color("rgba(0,0,0,0.3)"));
    rectMode(CENTER);
    rect(game.camera.hudPos.x - width / 2 + size / 2 + 25 + size + 25, game.camera.hudPos.y + height / 2 - size / 2 - 25, size * 3 / 4, size * 3 / 4);
    pop();
    if (game.player.inv.secWeaponSlot != -1) {
      push();
      ctx.globalAlpha = 0.4;
      ctx.drawImage(game.player.inv.secWeaponSlot.img, game.camera.hudPos.x - width / 2 + 25 + size * 1 / 5 + size + 25, game.camera.hudPos.y + height / 2 - size - 25 + size * 1 / 5, size * 3 / 5, size * 3 / 5);
      pop();
    }
  }
}

function drawWaveInfo(){
  push();
  stroke(255, 255, 255);
  strokeWeight(3);
  fill(color("rgba(0,0,0,0.5)"));
  rect(game.camera.hudPos.x - width/2 + 25, game.camera.hudPos.y - height/2 + 25, 100, 35);
  pop();
  push();
  textFont('Anton');
  textSize(20);
  textAlign(LEFT, CENTER);
  fill(255,255,255);
  text("Wave " + game.waveManager.wave, game.camera.hudPos.x - width/2 + 33, game.camera.hudPos.y - height/2 + 45);
  pop();
}

function popUpMessage(message){
  document.getElementById("popUp").innerHTML = message;
  document.getElementById("popUp").classList.add("popUpAnimation");
}

function initPopUpReset(){
  document.getElementById("popUp").addEventListener("webkitAnimationEnd", function(){
    document.getElementById("popUp").classList.remove("popUpAnimation");
  });
}
