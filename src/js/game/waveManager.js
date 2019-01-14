function WaveMangaer(){
  this.wave = 0;
  this.inWave = false;

  this.enemiesInTotal = 20;
  this.enemiesRemaining = this.enemiesInTotal;
  this.enemiesAtATime = 3;
  this.enemiePowerMultiplyer = 1;

  this.weaponUpgrade1 = false;
  this.weaponUpgrade2 = false;
  this.weaponUpgrade3 = false;
  this.weaponUpgrade4 = false;
  this.weaponUpgrade5 = false;

  this.healthUpgrade1 = false;
  this.healthUpgrade2 = false;
  this.healthUpgrade3 = false;
  this.healthUpgrade4 = false;
  this.healthUpgrade5 = false;

  this.turrets = false;
  this.turretUpgrade1 = false;
  this.turretUpgrade1 = false;

  this.prevWavePlayer = -1;

  this.update = function(){
    if(game.enemies.length < round(this.enemiesAtATime) && this.inWave){
      for (var i = 0; i < round(this.enemiesAtATime) - game.enemies.length; i++) {
        if(round(this.enemiesAtATime) <= this.enemiesRemaining){
          var spawnPoint = this.generateEnemySpawnPoint();
          var percentage = random(0,100);

          if(percentage <= 15 && this.wave >= 10){
            game.enemies.push(new EnemyGiant(spawnPoint.x, spawnPoint.y, giantEnemyImg[round(random(0,3))], this.enemiePowerMultiplyer, "Giant"));
          }
          else if(percentage > 15 && percentage <= 50 && this.wave >= 5){
            game.enemies.push(new EnemySpitter(spawnPoint.x, spawnPoint.y, spitterEnemyImg[0], this.enemiePowerMultiplyer, "Spitter"));
          }
          else{
            game.enemies.push(new Enemy(spawnPoint.x, spawnPoint.y, enemyImg[round(random(0,3))], this.enemiePowerMultiplyer, "Regular"));
          }
        }
      }
    }

    if(this.enemiesRemaining <= 0 && this.inWave){
      this.endWave();
    }
  }

  this.startNextWave = function(){
    this.wave ++;
    this.inWave = true;
    this.enemiesInTotal = 20 + (this.wave - 1) * 4;
    this.enemiesRemaining = this.enemiesInTotal;
    this.enemiesAtATime = 3 + (this.wave - 1) * 0.6;
    this.enemiePowerMultiplyer = 1 + (this.wave - 1) * 0.1;
    this.showNextWaveReminder();
  }

  this.endWave = function(){
    this.inWave = false;
    this.waveEvents();
    game.player.newHealth = game.player.initalHealth;
    game.player.health = game.player.initalHealth;
    game.nexus.health = game.nexus.initalHealth;
    this.prevWavePlayer = game.player;
    this.showNextWaveReminder();

    game.saveManager.save();
  }

  this.waveEvents = function(){
    if(this.wave >= 3 && !this.healthUpgrade1){
      this.healthUpgrade1 = true;
      game.player.initalHealth = 250;
      game.nexus.initalHealth = 4500;
      popUpMessage("Health Increased!")
    }

    if(this.wave >= 4 && !this.weaponUpgrade1){
      this.weaponUpgrade1 = true;
      game.player.inv.items[0] = weapons["Shotgun+1"];
      game.player.inv.items[1] = weapons["Pistol+1"];
      game.player.inv.items[2] = weapons["AssaultRifle+1"];
      game.player.inv.items[3] = weapons["Sniper+1"];
      game.player.inv.items[4] = weapons["Minigun+1"];

      if(game.player.inv.mainWeaponSlot === weapons["Shotgun"]){
        game.player.inv.mainWeaponSlot = weapons["Shotgun+1"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["AssaultRifle"]){
        game.player.inv.mainWeaponSlot = weapons["AssaultRifle+1"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Sniper"]){
        game.player.inv.mainWeaponSlot = weapons["Sniper+1"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Minigun"]){
        game.player.inv.mainWeaponSlot = weapons["Minigun+1"];
      }
      if(game.player.inv.secWeaponSlot === weapons["Pistol"]){
        game.player.inv.secWeaponSlot = weapons["Pistol+1"];
      }

      if(game.player.inv.selectedItem === weapons["Shotgun"]){
        game.player.inv.selectedItem = weapons["Shotgun+1"];
      }
      if(game.player.inv.selectedItem === weapons["AssaultRifle"]){
        game.player.inv.selectedItem = weapons["AssaultRifle+1"];
      }
      if(game.player.inv.selectedItem === weapons["Sniper"]){
        game.player.inv.selectedItem = weapons["Sniper+1"];
      }
      if(game.player.inv.selectedItem === weapons["Minigun"]){
        game.player.inv.selectedItem = weapons["Minigun+1"];
      }
      if(game.player.inv.selectedItem === weapons["Pistol"]){
        game.player.inv.selectedItem = weapons["Pistol+1"];
      }

      if(game.player.inv.selectedWeaponSlot == 1){
        game.player.currentWeapon = game.player.inv.mainWeaponSlot;
      }
      else{
        game.player.currentWeapon = game.player.inv.secWeaponSlot;
      }

      popUpMessage("Weapons Upgraded!")
    }

    if(this.wave >= 5 && !this.turrets){
      this.turrets = true;
      game.turrets.push(new Turret(300,300));
      game.turrets.push(new Turret(-300,300));
      game.turrets.push(new Turret(300,-300));
      game.turrets.push(new Turret(-300,-300));
      popUpMessage("Turrets added!")
    }

    if(this.wave >= 7 && !this.healthUpgrade2){
      this.healthUpgrade2 = true;
      game.player.initalHealth = 300;
      game.nexus.initalHealth = 5000;
      popUpMessage("Health Increased!")
    }

    if(this.wave >= 8 && !this.weaponUpgrade2){
      this.weaponUpgrade2 = true;
      game.player.inv.items[0] = weapons["Shotgun+2"];
      game.player.inv.items[1] = weapons["Pistol+2"];
      game.player.inv.items[2] = weapons["AssaultRifle+2"];
      game.player.inv.items[3] = weapons["Sniper+2"];
      game.player.inv.items[4] = weapons["Minigun+2"];

      if(game.player.inv.mainWeaponSlot === weapons["Shotgun+1"]){
        game.player.inv.mainWeaponSlot = weapons["Shotgun+2"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["AssaultRifle+1"]){
        game.player.inv.mainWeaponSlot = weapons["AssaultRifle+2"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Sniper+1"]){
        game.player.inv.mainWeaponSlot = weapons["Sniper+2"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Minigun+1"]){
        game.player.inv.mainWeaponSlot = weapons["Minigun+2"];
      }
      if(game.player.inv.secWeaponSlot === weapons["Pistol+1"]){
        game.player.inv.secWeaponSlot = weapons["Pistol+2"];
      }

      if(game.player.inv.selectedItem === weapons["Shotgun+1"]){
        game.player.inv.selectedItem = weapons["Shotgun+2"];
      }
      if(game.player.inv.selectedItem === weapons["AssaultRifle+1"]){
        game.player.inv.selectedItem = weapons["AssaultRifle+2"];
      }
      if(game.player.inv.selectedItem === weapons["Sniper+1"]){
        game.player.inv.selectedItem = weapons["Sniper+2"];
      }
      if(game.player.inv.selectedItem === weapons["Minigun+1"]){
        game.player.inv.selectedItem = weapons["Minigun+2"];
      }
      if(game.player.inv.selectedItem === weapons["Pistol+1"]){
        game.player.inv.selectedItem = weapons["Pistol+2"];
      }

      if(game.player.inv.selectedWeaponSlot == 1){
        game.player.currentWeapon = game.player.inv.mainWeaponSlot;
      }
      else{
        game.player.currentWeapon = game.player.inv.secWeaponSlot;
      }

      popUpMessage("Weapons Upgraded!")
    }

    if(this.wave >= 10 && !this.turretUpgrade1){
      this.turretUpgrade1 = true;
      for (var i = 0; i < game.turrets.length; i++) {
        game.turrets[i].dmg = 18;
        game.turrets[i].fireRate = 7;
        game.turrets[i].range = 120;
      }
      popUpMessage("Turrets Upgraded!")
    }

    if(this.wave >= 11 && !this.healthUpgrade3){
      this.healthUpgrade3 = true;
      game.player.initalHealth = 350;
      game.nexus.initalHealth = 5500;
      popUpMessage("Health Increased!")
    }

    if(this.wave >= 12 && !this.weaponUpgrade3){
      this.weaponUpgrade3 = true;
      game.player.inv.items[0] = weapons["Shotgun+3"];
      game.player.inv.items[1] = weapons["Pistol+3"];
      game.player.inv.items[2] = weapons["AssaultRifle+3"];
      game.player.inv.items[3] = weapons["Sniper+3"];
      game.player.inv.items[4] = weapons["Minigun+3"];

      if(game.player.inv.mainWeaponSlot === weapons["Shotgun+2"]){
        game.player.inv.mainWeaponSlot = weapons["Shotgun+3"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["AssaultRifle+2"]){
        game.player.inv.mainWeaponSlot = weapons["AssaultRifle+3"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Sniper+2"]){
        game.player.inv.mainWeaponSlot = weapons["Sniper+3"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Minigun+2"]){
        game.player.inv.mainWeaponSlot = weapons["Minigun+3"];
      }
      if(game.player.inv.secWeaponSlot === weapons["Pistol+2"]){
        game.player.inv.secWeaponSlot = weapons["Pistol+3"];
      }

      if(game.player.inv.selectedItem === weapons["Shotgun+2"]){
        game.player.inv.selectedItem = weapons["Shotgun+3"];
      }
      if(game.player.inv.selectedItem === weapons["AssaultRifle+2"]){
        game.player.inv.selectedItem = weapons["AssaultRifle+3"];
      }
      if(game.player.inv.selectedItem === weapons["Sniper+2"]){
        game.player.inv.selectedItem = weapons["Sniper+3"];
      }
      if(game.player.inv.selectedItem === weapons["Minigun+2"]){
        game.player.inv.selectedItem = weapons["Minigun+3"];
      }
      if(game.player.inv.selectedItem === weapons["Pistol+2"]){
        game.player.inv.selectedItem = weapons["Pistol+3"];
      }

      if(game.player.inv.selectedWeaponSlot == 1){
        game.player.currentWeapon = game.player.inv.mainWeaponSlot;
      }
      else{
        game.player.currentWeapon = game.player.inv.secWeaponSlot;
      }

      popUpMessage("Weapons Upgraded!")
    }

    if(this.wave >= 15 && !this.turretUpgrade2 && !this.healthUpgrade4){
      this.turretUpgrade2 = true;
      this.healthUpgrade4 = true;
      game.player.initalHealth = 400;
      game.nexus.initalHealth = 6000;
      for (var i = 0; i < game.turrets.length; i++) {
        game.turrets[i].dmg = 25;
        game.turrets[i].fireRate = 5;
        game.turrets[i].range = 130;
        game.turrets[i].bulletVel = 40;
      }
      popUpMessage("Turrets Upgraded!\nHealht Upgraded!")
    }


    if(this.wave >= 16 && !this.weaponUpgrade4){
      this.weaponUpgrade4 = true;
      game.player.inv.items[0] = weapons["Shotgun+4"];
      game.player.inv.items[1] = weapons["Pistol+4"];
      game.player.inv.items[2] = weapons["AssaultRifle+4"];
      game.player.inv.items[3] = weapons["Sniper+4"];
      game.player.inv.items[4] = weapons["Minigun+4"];

      if(game.player.inv.mainWeaponSlot === weapons["Shotgun+3"]){
        game.player.inv.mainWeaponSlot = weapons["Shotgun+4"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["AssaultRifle+3"]){
        game.player.inv.mainWeaponSlot = weapons["AssaultRifle+4"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Sniper+3"]){
        game.player.inv.mainWeaponSlot = weapons["Sniper+4"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Minigun+3"]){
        game.player.inv.mainWeaponSlot = weapons["Minigun+4"];
      }
      if(game.player.inv.secWeaponSlot === weapons["Pistol+3"]){
        game.player.inv.secWeaponSlot = weapons["Pistol+4"];
      }

      if(game.player.inv.selectedItem === weapons["Shotgun+3"]){
        game.player.inv.selectedItem = weapons["Shotgun+4"];
      }
      if(game.player.inv.selectedItem === weapons["AssaultRifle+3"]){
        game.player.inv.selectedItem = weapons["AssaultRifle+4"];
      }
      if(game.player.inv.selectedItem === weapons["Sniper+3"]){
        game.player.inv.selectedItem = weapons["Sniper+4"];
      }
      if(game.player.inv.selectedItem === weapons["Minigun+3"]){
        game.player.inv.selectedItem = weapons["Minigun+4"];
      }
      if(game.player.inv.selectedItem === weapons["Pistol+3"]){
        game.player.inv.selectedItem = weapons["Pistol+4"];
      }

      if(game.player.inv.selectedWeaponSlot == 1){
        game.player.currentWeapon = game.player.inv.mainWeaponSlot;
      }
      else{
        game.player.currentWeapon = game.player.inv.secWeaponSlot;
      }

      popUpMessage("Weapons Upgraded!")
    }

    if(this.wave >= 18 && !this.healthUpgrade5){
      this.healthUpgrade5 = true;
      game.player.initalHealth = 500;
      game.nexus.initalHealth = 8000;
      popUpMessage("Health Increased!")
    }

    if(this.wave >= 19 && !this.weaponUpgrade5){
      this.weaponUpgrade5 = true;
      game.player.inv.items[0] = weapons["Shotgun+5"];
      game.player.inv.items[1] = weapons["Pistol+5"];
      game.player.inv.items[2] = weapons["AssaultRifle+5"];
      game.player.inv.items[3] = weapons["Sniper+5"];
      game.player.inv.items[4] = weapons["Minigun+5"];

      if(game.player.inv.mainWeaponSlot === weapons["Shotgun+4"]){
        game.player.inv.mainWeaponSlot = weapons["Shotgun+5"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["AssaultRifle+4"]){
        game.player.inv.mainWeaponSlot = weapons["AssaultRifle+5"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Sniper+4"]){
        game.player.inv.mainWeaponSlot = weapons["Sniper+5"];
      }
      if(game.player.inv.mainWeaponSlot === weapons["Minigun+4"]){
        game.player.inv.mainWeaponSlot = weapons["Minigun+5"];
      }
      if(game.player.inv.secWeaponSlot === weapons["Pistol+4"]){
        game.player.inv.secWeaponSlot = weapons["Pistol+5"];
      }

      if(game.player.inv.selectedItem === weapons["Shotgun+4"]){
        game.player.inv.selectedItem = weapons["Shotgun+5"];
      }
      if(game.player.inv.selectedItem === weapons["AssaultRifle+4"]){
        game.player.inv.selectedItem = weapons["AssaultRifle+5"];
      }
      if(game.player.inv.selectedItem === weapons["Sniper+4"]){
        game.player.inv.selectedItem = weapons["Sniper+5"];
      }
      if(game.player.inv.selectedItem === weapons["Minigun+4"]){
        game.player.inv.selectedItem = weapons["Minigun+5"];
      }
      if(game.player.inv.selectedItem === weapons["Pistol+4"]){
        game.player.inv.selectedItem = weapons["Pistol+5   "];
      }

      if(game.player.inv.selectedWeaponSlot == 1){
        game.player.currentWeapon = game.player.inv.mainWeaponSlot;
      }
      else{
        game.player.currentWeapon = game.player.inv.secWeaponSlot;
      }

      popUpMessage("Weapons Upgraded!")
    }
  }

  this.generateEnemySpawnPoint = function(){
    var spawnPoint = createVector();
    var direction = createVector(game.worldSize.x, game.worldSize.y);
    direction.rotate(random(0,2*PI))
    spawnPoint.add(direction);

    return spawnPoint;
  }

  this.showNextWaveReminder = function(){
    if(this.inWave){
      document.getElementById('nextWaveReminder').style.display = "none";
    }
    else{
      document.getElementById('nextWaveReminder').style.display = "inline";
    }
  }
}
