function Game(){
  this.nexus = new Nexus(0, 0);
  this.player = new Player(0, this.nexus.size);
  this.enemies = [];
  this.turrets = [];
  this.bullets = [];
  this.worldSize = createVector(1500,1500);
  this.camera = new Camera(this.player, 1);
  this.score = 0;
  this.gameOver = false;

  this.generateEnemySpawnPoint = function(){
    var spawnPoint = createVector();
    var direction = createVector(this.worldSize.x, this.worldSize.y);
    direction.rotate(random(0,2*PI))
    spawnPoint.add(direction);

    return spawnPoint;
  }

  for (i = 0; i < 15; i++) {
    var spawnPoint = this.generateEnemySpawnPoint();
    this.enemies.push(new Enemy(spawnPoint.x, spawnPoint.y, enemyImg[round(random(0,3))]));
  }

  this.turrets.push(new Turret(300,300));
  this.turrets.push(new Turret(-300,300));
  this.turrets.push(new Turret(300,-300));
  this.turrets.push(new Turret(-300,-300));

  this.update = function(){
    if (this.player.health < 0 || this.nexus.health < 0) {
      this.gameOver = true;
    }

    for (i = 0; i < this.bullets.length; i++) {
      this.bullets[i].update();

      if (this.bullets[i].lifeTime <= 0 || detectCollisionPointRect(this.bullets[i], this.nexus)) {
        this.bullets.splice(i, 1);
      }
    }

    for (i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();

      for (j = 0; j < this.enemies.length; j++) {
        if (detectCollisionRectRect(this.enemies[i], this.enemies[j]) && i != j) {
          var force = createVector(this.enemies[i].pos.x - this.enemies[j].pos.x, this.enemies[i].pos.y - this.enemies[j].pos.y);
          force.setMag(-2);
          this.enemies[i].aplyForce(force);
          force.setMag(2);
          this.enemies[j].aplyForce(force);
        }
      }

      if (detectCollisionRectRect(this.player, this.enemies[i]) && this.player.timeFromLastHit == this.player.hitDelay && this.enemies[i].timeFromLastHit == this.enemies[i].hitSpeed) {
        this.enemies[i].hit(this.player);
        this.enemies[i].timeFromLastHit = 0;
      }

      if (detectCollisionNexus(this.enemies[i], this.nexus)) {
        if (this.enemies[i].timeFromLastHit == this.enemies[i].hitSpeed) {
          this.enemies[i].hit(this.nexus);
          this.enemies[i].timeFromLastHit = 0;
        }

        pushBack(this.enemies[i], this.nexus);
      }

      for (j = 0; j < this.bullets.length; j++) {
        if (detectCollisionPointRect(this.bullets[j], this.enemies[i])) {
          this.bullets[j].hit(this.enemies[i]);
          this.bullets.splice(j, 1);
        }
      }

      if (this.enemies[i].dead) {
        this.enemies.splice(i, 1);
        var spawnPoint = this.generateEnemySpawnPoint();
        this.enemies.push(new Enemy(spawnPoint.x, spawnPoint.y, enemyImg[round(random(0,3))]));
        this.score += 100;
      }
    }

    for (var i = 0; i < this.turrets.length; i++) {
      this.turrets[i].update();
    }

    if(!this.gameOver){
      this.player.update();
    }

    if (detectCollisionNexus(this.player, this.nexus)) {
      pushBack(this.player, this.nexus);
      if(insideNexus(this.player, this.nexus)){
        var force = createVector(this.nexus.pos.x - this.player.pos.x, this.nexus.pos.y - this.player.pos.y);
        force.setMag(-5);
        this.player.aplyForce(force);
      }
    }

    this.nexus.update();
  }

  this.render = function(){

    this.camera.update();

    drawGrid();
    drawWorldBounds();

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].render();
    }

    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].render();
    }

    for (var i = 0; i < this.turrets.length; i++) {
      this.turrets[i].render();
    }

    this.player.render();

    this.nexus.render();

    if (this.gameOver) {
      drawGameOverScreen();
    }

    drawHealthBar();
    drawNexusHealthBar();
    drawDodgeMeter();
    drawFireRateMeter();
    drawMinimap();
    drawCursor();
    drawReloadBar();
    drawMag();
  }
}
