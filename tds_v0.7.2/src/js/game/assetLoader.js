var nexusImg;
var turretImg;
var playerImg = [];
var enemyImg = [];
var weapons = [];
var hats = [];

function loadImages(){
  nexusImg = new Image();
  nexusImg.src = "../res/nexus2.png";

  turretImg = new Image();
  turretImg.src = "../res/turret.png"

  for(var i = 0; i < 3; i++){
    playerImg.push(new Image);
    playerImg[i].src = "../res/player_"+(i+1)+".png";
  }

  for (var i = 0; i < 4; i++) {
    enemyImg.push(new Image);
    enemyImg[i].src = "../res/normal_zombie_"+(i+1)+".png";
  }
}

function loadData(){
  for (var i = 0; i < data.weapons.length; i++) {
    var img = new Image();
    img.src = data.weapons[i].img;
    weapons[data.weapons[i].name.replace(/ /g,'')] =
      new Weapon(
        data.weapons[i].name,
        data.weapons[i].fireRate,
        data.weapons[i].precision,
        data.weapons[i].damage,
        data.weapons[i].knockback,
        data.weapons[i].fireMode,
        data.weapons[i].bulletsPerShot,
        data.weapons[i].bulletVelocity,
        data.weapons[i].bulletLifeTime,
        data.weapons[i].magazinSize,
        data.weapons[i].reloadTime,
        data.weapons[i].type,
        data.weapons[i].description,
        img);
  }
  for (var i = 0; i < Object.keys(data.hats).length; i++) {
    var img = new Image();
    var ingameImg = new Image();
    img.src = data.hats[i].img;
    ingameImg.src = data.hats[i].ingameImg;
    hats[data.hats[i].name.replace(/ /g,'')] =
      new Hat(
        data.hats[i].name,
        data.hats[i].type,
        data.hats[i].description,
        img,
        ingameImg);
  }
}
