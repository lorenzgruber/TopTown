function WaveMangaer(){
  this.wave = 0;
  this.inWave = false;

  this.enemiesInTotal = 20;
  this.enemiesRemaining = this.enemiesInTotal;
  this.enemiesAtATime = 3;
  this.enemiePowerMultiplyer = 1;

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
            game.enemies.push(new EnemySpitter(spawnPoint.x, spawnPoint.y, enemyImg[round(random(0,3))], this.enemiePowerMultiplyer, "Spitter"));
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
    this.showNextWaveReminder();
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
