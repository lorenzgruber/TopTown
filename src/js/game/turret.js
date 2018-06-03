function Turret(x,y){
  this.pos = createVector(x,y);
  this.size = 80;

  this.dmg = 11;
  this.prec = 5;
  this.bulletVel = 30;
  this.target = 0;
  this.range = 100;
  this.detectionRange = 500;

  this.fireRate = 8;
  this.timeFromLastShot = this.fireRate;

  this.dir = createVector(0,0)
  this.head = createVector(0,0);

  this.update = function(){
    if(this.timeFromLastShot < this.fireRate){
      this.timeFromLastShot ++;
    }
    this.findTarget();
    this.shoot();
  }

  this.render = function(){
    this.head.lerp(this.dir,0.1);
    push();

    translate(this.pos.x, this.pos.y);
    rotate(this.head.heading());
    ctx.drawImage(turretImg, -this.size/2, -this.size/2, this.size, this.size);

    pop();
  }

  this.findTarget = function(){
    var shortestDist = 1000000;
    var target = 0;
    for (var i = 0; i < game.enemies.length; i++) {
      var dis = dist(this.pos.x, this.pos.y, game.enemies[i].pos.x, game.enemies[i].pos.y);
      if(dis < this.detectionRange + game.enemies[i].size/2){
        if(dis < shortestDist){
          shortestDist = dis;
          target = game.enemies[i];
        }
      }
      this.target = target;
      if(this.target != 0){
        this.dir = this.getDirection();
      }
    }
    if(game.enemies.length <= 0){
      this.target = target;
    }
  }

  this.getDirection = function(){
    var dir = createVector(this.target.pos.x - this.pos.x, this.target.pos.y - this.pos.y);
    return dir;
  }

  this.shoot = function(){
    if(this.target != 0 && this.timeFromLastShot >= this.fireRate){
      var col = color(random(200,255), random(85,125), random(100,150))
      game.bullets.push(new Bullet(this.pos.x, this.pos.y, this.getDirection(), this.bulletVel, this.prec, this.range, this.dmg, col));
      this.timeFromLastShot = 0;
    }
  }
}
