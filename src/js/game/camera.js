function Camera(target, speed){
  this.target = target;
  this.pos = createVector(this.target.x, this.target.y);

  this.update = function(){
    this.pos.lerp(this.target.pos, speed);
    translate(width / 2 -this.pos.x, height / 2 - this.pos.y);
  }
}
