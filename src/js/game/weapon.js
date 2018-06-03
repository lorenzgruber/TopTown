function Weapon(name, fireRate, precision, damage, knockback, fireMode, bulletsPerShot, bulletVelocity, bulletLifeTime, magazinSize, reloadTime, type, description, img) {
  this.name = name;
  this.fireRate = fireRate;
  this.prec = precision;
  this.dmg = damage;
  this.knockback = knockback;
  this.bps = bulletsPerShot;
  this.bVel = bulletVelocity;
  this.bLifeTime = bulletLifeTime;

  this.magSize = magazinSize;
  this.bulletsinMag = this.magSize;
  this.reloadTime = reloadTime;
  this.timeFromLastReload = this.reloadTime;
  this.reloading = false;

  this.fireMode = fireMode;
  this.mouseReleased = true;

  this.type = type;
  this.description = description;

  this.img = img;

  this.fire = function(playerX, playerY, cursorX, cursorY) {
  if(this.mouseReleased){
    if(!this.reloading){
      for (i = 0; i < this.bps; i++) {
        var dir = createVector(mouseX - width / 2, mouseY - height / 2);
        var col = color(random(200, 255), random(130, 200), 0);
        game.bullets.push(new Bullet(playerX, playerY, dir, random(this.bVel-2, this.bVel+2), this.prec, this.bLifeTime, this.dmg, col));
        if(this.fireMode == "semi"){
          this.mouseReleased = false;
        }
      }
      this.bulletsinMag --;
      var force = p5.Vector.fromAngle(dir.heading());
      force.setMag(-this.knockback);
      game.player.aplyForce(force);
    }
    if(this.bulletsinMag <= 0 && !this.reloading){
      this.startReload();
    }
  }
}

this.startReload = function(){
  if(!this.reloading){
    this.timeFromLastReload = 0;
    this.reloading = true;
  }  
}

this.reload = function(){
  this.bulletsinMag = this.magSize;
  game.player.inv.bullets -= this.magSize;
  this.reloading = false;
}
}
