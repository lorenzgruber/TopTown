function Particle(x, y, dir, speed, size, color, timeToLive){
    this.pos = createVector(x + random(-10,10), y + random(-10,10));
    this.vel = p5.Vector.fromAngle(dir + PI + random(-0.25,0.25), speed);
    this.size = size + random(-size * 0.5, size * 0.5);
    this.col = color;
    this.timeToLive = timeToLive;
    
    this.dead = false;

    this.update = function(){
        this.pos.add(this.vel);
        this.timeToLive --;

        if(this.timeToLive <= 0){
            this.dead = true;
        }
    }

    this.render = function(){
        var opacity = map(this.timeToLive, 0, 20, 0, 255);
        push();
        translate(this.pos.x, this.pos.y);
        fill(this.col[0], this.col[1], this.col[2], opacity);
        tint(255,opacity);
        ellipse(0, 0, this.size);
        pop();
    }
}

function EnemyHitEffect(x, y, dir, damage){
    this.pos = createVector(x,y);
    this.dir = dir;
    this.damage = map(damage, 0, 200, 2, 5);
    this.col = [random(145, 185), random(190, 230), random(110, 150)];
    //this.col = [random(200, 255), random(10, 50), 0];
    this.particles = [];

    this.dead = false;

    for(i = 0; i < this.damage; i++){
        this.particles.push(new Particle(this.pos.x, this.pos.y, this.dir, this.damage * 2, this.damage * 3, this.col, 20));
    }

    this.update = function(){
        for(i = this.particles.length - 1; i >= 0; i--){
            this.particles[i].update();

            if(this.particles[i].dead){
                this.particles.splice(i, 1);
            }
        }
        if(this.particles.length <= 2){
            this.dead = true;
        }
    }

    this.render = function(){
        for(i = 0; i < this.particles.length; i++){
            this.particles[i].render();
        }
    }
}

function EnemyDeathEffect(x, y, size){
    this.pos = createVector(x,y);
    this.size = size * 0.1;
    this.col = [random(145, 185), random(190, 230), random(110, 150)];
    //this.col = [random(200, 255), random(10, 50), 0];
    this.particles = [];

    this.dead = false;

    for(i = 0; i < 10; i++){
        this.particles.push(new Particle(this.pos.x, this.pos.y, random(-PI, PI), 5, this.size, this.col, 30));
    }

    this.update = function(){
        for(i = this.particles.length - 1; i >= 0; i--){
            this.particles[i].update();

            if(this.particles[i].dead){
                this.particles.splice(i, 1);
            }
        }
        if(this.particles.length <= 2){
            this.dead = true;
        }
    }

    this.render = function(){
        for(i = 0; i < this.particles.length; i++){
            this.particles[i].render();
        }
    }
}

function WeaponFireEffect(x, y, dir, damage){
    this.pos = createVector(x,y);
    this.dir = dir.heading();
    this.damage = map(damage, 0, 200, 1, 5);
    this.col = [random(250, 255), random(200, 255), 0];
    this.particles = [];

    this.dead = false;

    for(i = 0; i < this.damage; i++){
        this.particles.push(new Particle(this.pos.x, this.pos.y, this.dir + PI, 5, 5, this.col, 20));
    }

    this.update = function(){
        for(i = this.particles.length - 1; i >= 0; i--){
            this.particles[i].update();

            if(this.particles[i].dead){
                this.particles.splice(i, 1);
            }
        }
        if(this.particles.length <= 0){
            this.dead = true;
        }
    }

    this.render = function(){
        for(i = 0; i < this.particles.length; i++){
            this.particles[i].render();
        }
    }
}