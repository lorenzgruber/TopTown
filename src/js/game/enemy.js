// # REGULAR ENEMY #

function Enemy(x, y, img, power, type) {
  this.strength = random(4, 8);
  this.power = power;
  this.pos = createVector(x, y);
  this.size = 11 * this.strength;
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.range = 700;
  this.dir = createVector(0, 0);

  this.col = color(random(45, 85), random(90, 130), random(10, 50));
  this.currentCol = this.col;

  this.seesPlayer = false;
  this.currentTarget = 0;

  this.dmg = 4 * this.strength * this.power;
  this.initalHealth = 20 * this.strength * this.power;
  this.health = this.initalHealth;
  this.dead = false;

  this.hitSpeed = 30;
  this.timeFromLastHit = this.hitSpeed;

  this.hat = -1;
  if(random(0,10) < 5){
    var keys = Object.keys(hats);
    this.hat = hats[keys[Math.floor(keys.length * Math.random())]];
  }

  this.type = type;

  this.update = function() {
    this.checkIfDead();
    this.getTarget();
    this.move();

    if (this.timeFromLastHit < this.hitSpeed) {
        this.timeFromLastHit++;
    }
  }

  this.render = function() {
    push();

    this.currentCol = lerpColor(this.currentCol, this.col, 0.3);

    fill(this.currentCol);
    translate(this.pos.x, this.pos.y)
    rotate(this.dir.heading());
    rectMode(CENTER);
    rect(0, 0, this.size * 0.98, this.size * 0.98, this.size * 0.1);

    pop();

    push();

    translate(this.pos.x, this.pos.y)

    if(this.dir.heading() >= -PI/2 && this.dir.heading() <= PI/2){
      rotate(this.dir.heading());
    }
    else{
      rotate(this.dir.heading() + PI );
    }
    ctx.drawImage(img, -this.size/2, -this.size/2, this.size, this.size);

    if(this.hat != -1){
      if(this.dir.heading() >= -PI/2 && this.dir.heading() <= PI/2){
        push();
        scale(-1,1);
        ctx.drawImage(this.hat.ingameImg, -this.size * 3/2, -this.size * 3/2, this.size * 3, this.size * 3);
        pop();
      }
      else{
        ctx.drawImage(this.hat.ingameImg, -this.size * 3/2, -this.size * 3/2, this.size * 3, this.size * 3);
      }
    }

    pop();
    this.drawHealthBar();
  }

  this.getTarget = function() {
    var distanceP = dist(this.pos.x, this.pos.y, game.player.pos.x, game.player.pos.y);
    var distanceN = dist(this.pos.x, this.pos.y, game.nexus.pos.x, game.nexus.pos.y);
    if (distanceP < this.range) {
      if(distanceP < distanceN){
        this.currentTarget = game.player;
      }
      else{
        this.currentTarget = game.nexus;
      }
    } else {
      this.currentTarget = game.nexus;
    }
  }

  this.move = function() {
    var newVel = createVector(this.currentTarget.pos.x - this.pos.x, this.currentTarget.pos.y - this.pos.y);
    newVel.setMag(20 / this.strength);
    newVel.add(this.acc);
    if(newVel.mag() > 20 / this.strength){
      newVel.setMag(20 / this.strength);
    }
    this.dir.set(this.currentTarget.pos.x - this.pos.x, this.currentTarget.pos.y - this.pos.y);


    this.vel.lerp(newVel, 0.5);
    this.pos.add(this.vel);
    this.acc.setMag(0);

    if (this.pos.x < -game.worldSize.x + this.size / 2) {
      this.pos.x = -game.worldSize.x + this.size / 2;
    }
    if (this.pos.y < -game.worldSize.y + this.size / 2) {
      this.pos.y = -game.worldSize.y + this.size / 2;
    }
    if (this.pos.x > game.worldSize.x - this.size / 2) {
      this.pos.x = game.worldSize.x - this.size / 2;
    }
    if (this.pos.y > game.worldSize.y - this.size / 2) {
      this.pos.y = game.worldSize.y - this.size / 2;
    }
  }

  this.checkIfDead = function() {
    if (this.health <= 0) {
      this.dead = true;

    }
  }

  this.drawHealthBar = function() {
    var healthBarLength = map(this.health, 0, this.initalHealth, 1, this.size);

    push();

    var cb = color('#459979')
    fill(cb);
    rectMode(CENTER);
    rect(this.pos.x + 5, this.pos.y + this.size / 2 + 5, healthBarLength, 10);

    pop();

    push();

    var c = color('#F2FF78')
    fill(c);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y + this.size / 2, healthBarLength, 10);

    pop();
  }

  this.hit = function(entety) {
    this.dir.setMag(100);
    entety.aplyForce(this.dir);
    entety.inflictDamage(this.dmg);
  }

  this.inflictDamage = function(dmg) {
    this.health -= dmg;
    this.currentCol = color(255, 0, 0);
  }

  this.aplyForce = function(force) {
    this.acc.set(force);
  }
}




// # SPITTER ENEMY #

function EnemySpitter(x, y, img, power, type) {
  this.strength = random(6, 10);
  this.power = power;
  this.pos = createVector(x, y);
  this.size = 11 * this.strength;
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.range = 700;
  this.dir = createVector(0, 0);
  this.img = img;

  this.col = color(random(175, 205), random(125, 155), random(25, 55))
  this.currentCol = this.col;

  this.seesPlayer = false;
  this.currentTarget = 0;

  this.dmg = 4 * this.strength * this.power;
  this.initalHealth = 20 * this.strength * this.power;
  this.health = this.initalHealth;
  this.dead = false;

  this.hitSpeed = 30;
  this.timeFromLastHit = this.hitSpeed;

  this.fireRate = 100;
  this.timeFromLastShot = 0;

  this.hat = -1;
  if(random(0,10) < 5){
    var keys = Object.keys(hats);
    this.hat = hats[keys[Math.floor(keys.length * Math.random())]];
  }

  this.type = type;

  this.update = function() {
    this.checkIfDead();
    this.getTarget();
    this.move();

    if(dist(this.pos.x, this.pos.y, this.currentTarget.pos.x, this.currentTarget.pos.y) <= this.range){
      this.spit();
    }

    if (this.timeFromLastHit < this.hitSpeed) {
        this.timeFromLastHit++;
    }

    if (this.timeFromLastShot < this.fireRate) {
        this.timeFromLastShot++;
    }

    if(this.timeFromLastShot < 35){   
      if(this.dir.heading() >= -PI/2 && this.dir.heading() <= PI/2){
        this.img = spitterEnemyImg[1];
      }else{
        this.img = spitterEnemyImg[2];
      }
    }
    else{
      this.img = spitterEnemyImg[0];
    }
  }

  this.render = function() {
    push();

    this.currentCol = lerpColor(this.currentCol, this.col, 0.3);

    fill(this.currentCol);
    translate(this.pos.x, this.pos.y)
    rotate(this.dir.heading());
    rectMode(CENTER);
    rect(0, 0, this.size * 0.98, this.size * 0.98, this.size * 0.1);

    pop();

    push();

    translate(this.pos.x, this.pos.y)

    if(this.dir.heading() >= -PI/2 && this.dir.heading() <= PI/2){
      rotate(this.dir.heading());
    }
    else{
      rotate(this.dir.heading() + PI );
    }
    ctx.drawImage(this.img, -this.size/2, -this.size/2, this.size, this.size);

    if(this.hat != -1){
      if(this.dir.heading() >= -PI/2 && this.dir.heading() <= PI/2){
        push();
        scale(-1,1);
        ctx.drawImage(this.hat.ingameImg, -this.size * 3/2, -this.size * 3/2, this.size * 3, this.size * 3);
        pop();
      }
      else{
        ctx.drawImage(this.hat.ingameImg, -this.size * 3/2, -this.size * 3/2, this.size * 3, this.size * 3);
      }
    }

    pop();
    this.drawHealthBar();
  }

  this.getTarget = function() {
    var distanceP = dist(this.pos.x, this.pos.y, game.player.pos.x, game.player.pos.y);
    var distanceN = dist(this.pos.x, this.pos.y, game.nexus.pos.x, game.nexus.pos.y);
    if (distanceP < this.range) {
      if(distanceP < distanceN){
        this.currentTarget = game.player;
      }
      else{
        this.currentTarget = game.nexus;
      }
    } else {
      this.currentTarget = game.nexus;
    }
  }

  this.move = function() {
    var newVel = createVector(this.currentTarget.pos.x - this.pos.x, this.currentTarget.pos.y - this.pos.y);
    newVel.setMag(20 / this.strength);
    if(dist(this.pos.x, this.pos.y, this.currentTarget.pos.x, this.currentTarget.pos.y) <= this.range){
        newVel.setMag(0);
    }
    newVel.add(this.acc);
    if(newVel.mag() > 20 / this.strength){
      newVel.setMag(20 / this.strength);
    }
    this.dir.set(this.currentTarget.pos.x - this.pos.x, this.currentTarget.pos.y - this.pos.y);

    this.vel.lerp(newVel, 0.5);
    this.pos.add(this.vel);
    this.acc.setMag(0);


    if (this.pos.x < -game.worldSize.x + this.size / 2) {
      this.pos.x = -game.worldSize.x + this.size / 2;
    }
    if (this.pos.y < -game.worldSize.y + this.size / 2) {
      this.pos.y = -game.worldSize.y + this.size / 2;
    }
    if (this.pos.x > game.worldSize.x - this.size / 2) {
      this.pos.x = game.worldSize.x - this.size / 2;
    }
    if (this.pos.y > game.worldSize.y - this.size / 2) {
      this.pos.y = game.worldSize.y - this.size / 2;
    }
  }

  this.checkIfDead = function() {
    if (this.health <= 0) {
      this.dead = true;

    }
  }

  this.drawHealthBar = function() {
    var healthBarLength = map(this.health, 0, this.initalHealth, 1, this.size);

    push();

    var cb = color('#994444')
    fill(cb);
    rectMode(CENTER);
    rect(this.pos.x + 5, this.pos.y + this.size / 2 + 5, healthBarLength, 10);

    pop();

    push();

    var c = color('#FFAF66')
    fill(c);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y + this.size / 2, healthBarLength, 10);

    pop();
  }

  this.getDirection = function(){
    var dir = createVector(this.currentTarget.pos.x - this.pos.x, this.currentTarget.pos.y - this.pos.y);
    return dir;
  }

  this.spit = function(){
    if(this.target != 0 && this.timeFromLastShot >= this.fireRate){
      var col = color(random(200,255), random(85,125), random(100,150))
      game.enemyBullets.push(new EnemyBullet(this.pos.x, this.pos.y, this.getDirection(), 13, this.dmg/2));
      this.timeFromLastShot = 0;
    }
  }

  this.hit = function(entety) {
    this.dir.setMag(100);
    entety.aplyForce(this.dir);
    entety.inflictDamage(this.dmg);
  }

  this.inflictDamage = function(dmg) {
    this.health -= dmg;
    this.currentCol = color(255, 0, 0);
  }

  this.aplyForce = function(force) {
    this.acc.set(force);
  }
}




// # GIANT ENEMY #

function EnemyGiant(x, y, img, power, type) {
  this.strength = random(16, 20);
  this.power = power;
  this.pos = createVector(x, y);
  this.size = 13 * this.strength;
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.dir = createVector(0, 0);

  this.col = color(random(90, 130), random(10, 50), random(30, 70))
  this.currentCol = this.col;

  this.currentTarget = game.nexus;

  this.dmg = 4 * this.strength * this.power;
  this.initalHealth = 40 * this.strength * this.power;
  this.health = this.initalHealth;
  this.dead = false;

  this.hitSpeed = 30;
  this.timeFromLastHit = this.hitSpeed;

  this.hat = -1;
  if(random(0,10) < 3){
    var keys = Object.keys(hats);
    this.hat = hats[keys[Math.floor(keys.length * Math.random())]];
  }

  this.type = type;

  this.update = function() {
    this.checkIfDead();
    this.move();

    if (this.timeFromLastHit < this.hitSpeed) {
        this.timeFromLastHit++;
    }
  }

  this.render = function() {
    push();

    this.currentCol = lerpColor(this.currentCol, this.col, 0.3);

    fill(this.currentCol);
    translate(this.pos.x, this.pos.y)
    rotate(this.dir.heading());
    rectMode(CENTER);
    rect(0, 0, this.size * 0.98, this.size * 0.98, this.size * 0.1);

    pop();

    push();

    translate(this.pos.x, this.pos.y)

    if(this.dir.heading() >= -PI/2 && this.dir.heading() <= PI/2){
      rotate(this.dir.heading());
    }
    else{
      rotate(this.dir.heading() + PI );
    }
    ctx.drawImage(img, -this.size/2, -this.size/2, this.size, this.size);

    if(this.hat != -1){
      if(this.dir.heading() >= -PI/2 && this.dir.heading() <= PI/2){
        push();
        scale(-1,1);
        ctx.drawImage(this.hat.ingameImg, -this.size * 3/2, -this.size * 3/2, this.size * 3, this.size * 3);
        pop();
      }
      else{
        ctx.drawImage(this.hat.ingameImg, -this.size * 3/2, -this.size * 3/2, this.size * 3, this.size * 3);
      }
    }

    pop();
    this.drawHealthBar();
  }

  this.move = function() {
    var newVel = createVector(this.currentTarget.pos.x - this.pos.x, this.currentTarget.pos.y - this.pos.y);
    newVel.setMag(20 / this.strength);
    newVel.add(this.acc);
    if(newVel.mag() > 20 / this.strength){
      newVel.setMag(20 / this.strength);
    }
    this.dir.set(this.currentTarget.pos.x - this.pos.x, this.currentTarget.pos.y - this.pos.y);


    this.vel.lerp(newVel, 0.5);
    this.pos.add(this.vel);
    this.acc.setMag(0);

    if (this.pos.x < -game.worldSize.x + this.size / 2) {
      this.pos.x = -game.worldSize.x + this.size / 2;
    }
    if (this.pos.y < -game.worldSize.y + this.size / 2) {
      this.pos.y = -game.worldSize.y + this.size / 2;
    }
    if (this.pos.x > game.worldSize.x - this.size / 2) {
      this.pos.x = game.worldSize.x - this.size / 2;
    }
    if (this.pos.y > game.worldSize.y - this.size / 2) {
      this.pos.y = game.worldSize.y - this.size / 2;
    }
  }

  this.checkIfDead = function() {
    if (this.health <= 0) {
      this.dead = true;

    }
  }

  this.drawHealthBar = function() {
    var healthBarLength = map(this.health, 0, this.initalHealth, 1, this.size);

    push();

    var cb = color('#894599')
    fill(cb);
    rectMode(CENTER);
    rect(this.pos.x + 5, this.pos.y + this.size / 2 + 5, healthBarLength, 10);

    pop();

    push();

    var c = color('#FF66A1')
    fill(c);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y + this.size / 2, healthBarLength, 10);

    pop();
  }

  this.hit = function(entety) {
    this.dir.setMag(100);
    entety.aplyForce(this.dir);
    entety.inflictDamage(this.dmg);
  }

  this.inflictDamage = function(dmg) {
    this.health -= dmg;
    this.currentCol = color(255, 0, 0);
  }

  this.aplyForce = function(force) {
    this.acc.set(force);
  }
}
