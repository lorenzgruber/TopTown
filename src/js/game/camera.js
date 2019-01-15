function Camera(target, speed){
  this.target = target;
  this.pos = createVector(this.target.x, this.target.y);
  this.speed = speed;
  this.hudPos = createVector(this.target.x, this.target.y);
  this.zoom = 1;
  this.timeFromLastZoom = 50;

  this.update = function(){

    this.pos.lerp(this.target.pos, this.speed);
    this.hudPos.lerp(this.target.pos, this.speed * 0.7);
    translate(width / 2 -this.pos.x, height / 2 - this.pos.y);

    if(this.timeFromLastZoom <= 50){
      console.log("lel");
      if(this.timeFromLastZoom < 25){
        this.zoom = lerp(this.zoom, 0.96, 0.3);
      }
      else{
        this.zoom = lerp(this.zoom, 1, 0.2);
      }
      if(this.zoom >= 0.99){
        this.zoom = 1;
      }
      scale(this.zoom);
      this.timeFromLastZoom ++;
    }
  }

  this.dashZoom = function(){
    this.timeFromLastZoom = 0;
  }

  this.shake = function(force){
    this.pos.add(force);
  }
}