function Nexus(x,y){
  this.pos = createVector(x,y);
  this.size = 200;
  this.initalHealth = 4000;
  this.health = this.initalHealth;

  this.col = color(180,100,255);
  this.currentCol = this.col;

  this.update = function(){

  }

  this.render = function(){
    push();

    this.currentCol = lerpColor(this.currentCol, this.col, 0.3);
    fill(this.currentCol);
    //rectMode(CENTER);
    //rect(this.pos.x, this.pos.y, this.size, this.size);

    // translate(-this.size/2, -this.size/2);
    // push();
    //   fill(247,141,184);
    //   rect(this.size*1/5,this.size*1/5, this.size*3/5,this.size*3/5);
    // pop();
    // push();
    //   fill(178,66,122);
    //   rect(0,this.size*1/5, this.size*1/5,this.size*3/5);
    // pop();
    // push();
    //   fill(219,119,167);
    //   rect(this.size*1/5,0, this.size*3/5,  this.size*1/5);
    //   rect(this.size*1/5,this.size*4/5, this.size*3/5,  this.size*1/5);
    // pop();
    // push();
    //   fill(242,160,201);
    //   rect(this.size*4/5,this.size*1/5, this.size*1/5,this.size*3/5);
    // pop();
    // push();
    //   fill(198,84,141);
    //   triangle(0,this.size*1/5, this.size*1/5,this.size*1/5, this.size*1/5,0, this.size*3/5);
    //   triangle(0,this.size*4/5, this.size*1/5,this.size*4/5, this.size*1/5,this.size*5/5);
    // pop();
    // push();
    //   fill(249,167,204);
    //   triangle(this.size*5/5,this.size*4/5, this.size*4/5,this.size*4/5, this.size*4/5,this.size*5/5);
    //   triangle(this.size*5/5,this.size*1/5, this.size*4/5,this.size*1/5, this.size*4/5,0);
    // pop();

    ctx.drawImage(nexusImg, this.pos.x - this.size * 1.3 / 2, this.pos.y - this.size * 1.3 / 2, this.size * 1.3, this.size * 1.3);

    pop();

    //this.drawHealthBar();
  }

  this.inflictDamage = function(dmg){
    this.health -= dmg;
    this.currentCol = color(255,0,0);
  }

  this.aplyForce = function(force){

  }

  this.drawHealthBar = function(){
    var healthBarLength = map(this.health, 0, this.initalHealth, 1, this.size);

    push();

    fill(0, 200, 0);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y + this.size / 1.7, healthBarLength, 10);

    pop();
  }
}
