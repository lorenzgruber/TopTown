function Player(x, y) {
    this.pos = createVector(x, y);
    this.arrowPos = createVector(this.pos.x, this.pos.y);
    this.dir = createVector(mouseX - width / 2, mouseY - height / 2);
    this.size = 80;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.initalHealth = 200;
    this.health = this.initalHealth;
    this.newHealth = this.health;

    this.inv = new Inventory();

    for(key in weapons){
      this.inv.addItem(weapons[key]);
    }

    for(key in hats){
      this.inv.addItem(hats[key]);
    }

    this.inv.equipMainWeapon(this.inv.items[0]);
    this.inv.equipSecWeapon(this.inv.items[1]);
    this.currentWeapon = this.inv.mainWeaponSlot;
    this.timeFromLastShot = 0;

    this.dodgeDelay = 120;
    this.timeFromLastDodge = this.dodgeDelay;

    this.col = color("#BCB9C6")
    this.currentCol = this.col;

    this.hitDelay = 10;
    this.timeFromLastHit = this.hitDelay;

    this.timeFromLastShotFace = 60;
    this.timeFromLastHitFace = 60;

    this.hat = -1;

    this.update = function () {
        if(!this.inv.showing && !game.shop.visible){
          this.move();
          this.shoot();
          this.dodge();
        }
        this.checkWorldbounds();

        if(this.currentWeapon != 0){
          if(this.currentWeapon.reloading && this.currentWeapon.timeFromLastReload >= this.currentWeapon.reloadTime){
            this.currentWeapon.reload();
          }
          if (this.currentWeapon.timeFromLastReload < this.currentWeapon.reloadTime) {
            this.currentWeapon.timeFromLastReload++;
          }
          if (this.timeFromLastShot <  this.currentWeapon.fireRate) {
              this.timeFromLastShot++;
          }
        }
        if (this.timeFromLastHit < this.hitDelay) {
            this.timeFromLastHit++;
        }
        if (this.timeFromLastShotFace <  60) {
            this.timeFromLastShotFace++;
        }
        if (this.timeFromLastHitFace <  60) {
            this.timeFromLastHitFace++;
        }

        this.health = round(lerp(this.health, this.newHealth, 0.1));
    }

    this.render = function () {

        var newDir = createVector(mouseX - width / 2, mouseY - height / 2);
        this.dir.lerp(newDir, 0.1);

        push();

        this.currentCol = lerpColor(this.currentCol, this.col, 0.3);
        fill(this.currentCol);
        translate(this.pos.x, this.pos.y);
        rotate(this.dir.heading());
        rectMode(CENTER);
        rect(0, 0, this.size * 0.98, this.size * 0.98, this.size * 0.1)

        pop();

        push();

        translate(this.pos.x, this.pos.y)

        if(this.dir.heading() >= -PI/2 && this.dir.heading() <= PI/2){
          rotate(this.dir.heading());
        }
        else{
          rotate(this.dir.heading() + PI );
        }

        if(this.timeFromLastHitFace < 60){
          ctx.drawImage(playerImg[2], -this.size/2, -this.size/2, this.size, this.size);
        }
        else if(this.timeFromLastShotFace < 60 || this.timeFromLastDodge < 30){
          ctx.drawImage(playerImg[1], -this.size/2, -this.size/2, this.size, this.size);
        }
        else{
            ctx.drawImage(playerImg[0], -this.size/2, -this.size/2, this.size, this.size);
        }

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

        this.drawArrow();

    }

    this.move = function (key) {
        var newVel = createVector(0, 0);

        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            newVel.y -= 5;
        }
        if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
            newVel.y += 5;
        }
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            newVel.x -= 5;
        }
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            newVel.x += 5;
        }

        newVel.add(this.acc);
        this.vel.lerp(newVel, 0.1);
        this.pos.add(this.vel);
        this.acc.set(0, 0);


    }

    this.shoot = function () {
      if(this.currentWeapon != -1){
        if (mouseIsPressed && this.timeFromLastShot >= this.currentWeapon.fireRate && this.currentWeapon.mouseReleased && !this.currentWeapon.reloading) {
            this.timeFromLastShot = 0;
            this.timeFromLastShotFace = 0;
            this.currentWeapon.fire(this.arrowPos.x, this.arrowPos.y, mouseX, mouseY);
        }
      }
    }

    this.dodge = function(){
      if (this.timeFromLastDodge < this.dodgeDelay) {
          this.timeFromLastDodge++;
      }

      if(keyIsDown(32) && this.timeFromLastDodge >= this.dodgeDelay){
        this.timeFromLastDodge = 0;
      }
      if(this.timeFromLastDodge < 10){
        var force = createVector(mouseX - width / 2, mouseY - height / 2);
        force.setMag(25);
        this.aplyForce(force);
        this.currentCol = color('#bee4ee');
      }
    }

    this.drawArrow = function(){
      var dir = createVector(mouseX - width / 2, mouseY - height/2);
      this.arrowPos.set(this.pos.x, this.pos.y);
      var size = this.size * 0.2;

      dir.setMag(this.size);
      this.arrowPos.add(dir);

      var sCol = color('#100E14');

      push();

      fill(200);
      stroke(sCol);
      strokeWeight(size * 0.25);
      translate(this.arrowPos.x, this.arrowPos.y);
      rotate(dir.heading() - PI/2);
      triangle(0, 0, -size, -size, size, -size);

      pop();
    }

    this.checkWorldbounds = function(){
      if(this.pos.x < -game.worldSize.x + this.size/2){
          this.pos.x = -game.worldSize.x + this.size/2;
        }
        if(this.pos.y < -game.worldSize.y + this.size/2){
          this.pos.y = -game.worldSize.y + this.size/2;
        }
        if(this.pos.x > game.worldSize.x - this.size/2){
          this.pos.x = game.worldSize.x - this.size/2;
        }
        if(this.pos.y > game.worldSize.y - this.size/2){
          this.pos.y = game.worldSize.y - this.size/2;
      }
    }

    this.aplyForce = function (force) {
        this.acc.add(force);
    }

    this.inflictDamage = function (dmg) {
        this.newHealth = this.health - dmg;
        this.currentCol = color(255,0,0);
        this.timeFromLastHit = 0;
        this.timeFromLastHitFace = 0;
    }
}
