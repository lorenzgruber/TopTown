function Bullet(x, y, direction, velocity, precision, lifeTime, damage, img) {
    this.pos = createVector(x, y);
    this.originalPos = createVector(x, y);
    this.vel = direction;
    this.vel.normalize();
    this.vel.add(random(-precision, precision) * 0.01, random(-precision, precision) * 0.01);
    this.vel.setMag(velocity);
    this.lifeTime = lifeTime;
    this.initLifeTime = lifeTime;
    this.dmg = damage;
    this.img = img;

    this.update = function () {
        this.move();
        this.lifeTime--;
    }

    this.render = function () {
        push();

        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + PI/2);
        ctx.drawImage(this.img, -this.img.naturalWidth/6, -this.img.naturalHeight/6, this.img.naturalWidth/3, this.img.naturalHeight/3);

        pop();

        push();
        var opacity = map(this.lifeTime, this.initLifeTime, 0, 0.1, 0);
        stroke(color("rgba(255,255,255,"+opacity+")"));
        strokeWeight(5);

        if(dist(this.originalPos.x, this.originalPos.y, this.pos.x, this.pos.y) < 200){
            line(this.originalPos.x, this.originalPos.y, this.pos.x, this.pos.y);
        }else{
            var trail = createVector(this.vel.x, this.vel.y);
            trail.setMag(-200);
            var trailPoint = createVector(this.pos.x, this.pos.y);
            trailPoint.add(trail);
            line(trailPoint.x, trailPoint.y, this.pos.x, this.pos.y);
        }
        

        pop();
    }

    this.move = function () {
        this.pos.add(this.vel);
    }

    this.hit = function (entety) {
        var knockBack = this.vel;
        knockBack.setMag(this.dmg);
        entety.aplyForce(knockBack);
        entety.inflictDamage(this.dmg);
    }
}

// # ENEMY BULLET #

function EnemyBullet(x,y,direction,velocity,damage){
  this.pos = createVector(x,y);
  this.vel = direction;
  this.vel.setMag(velocity);
  this.dmg = damage;
  this.lifeTime = 500;

  this.size = 70;

  this.update = function(){
      this.move();
      this.lifeTime --;
  }

  this.render = function(){
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.vel.heading());
      ctx.drawImage(slimeSpit, -this.size/2, -this.size/2, this.size, this.size);
      pop();  
  }

  this.move = function(){
    this.pos.add(this.vel);
  }

  this.hit = function (entety) {
    if(entety === game.player){
      var knockBack = this.vel;
      knockBack.setMag(this.dmg);
      entety.aplyForce(knockBack);
    }
    entety.inflictDamage(this.dmg);
  }
}
