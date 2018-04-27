function Bullet(x, y, direction, velocity, precision, lifeTime, damage, color) {
    this.pos = createVector(x, y);
    this.vel = direction;
    this.vel.normalize();
    this.vel.add(random(-precision, precision) * 0.01, random(-precision, precision) * 0.01);
    this.vel.setMag(velocity);
    this.lifeTime = lifeTime;
    this.dmg = damage;
    this.col = color;

    this.update = function () {
        this.move();
        this.lifeTime--;
    }

    this.render = function () {
        push();

        translate(this.pos.x, this.pos.y);
        stroke(this.col);
        strokeWeight(2);
        rotate(this.vel.heading());
        line(0, 0, 30, 0);

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