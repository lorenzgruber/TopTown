function SaveManager(){
  this.currentSaveData = {};

  this.save = function(){
    if(!game.waveManager.inWave){
      this.currentSaveData.wave = game.waveManager.wave;
    }
    if(game.player.inv.mainWeaponSlot != -1){
      this.currentSaveData.mainWeapon = game.player.inv.mainWeaponSlot.name.replace(/\s/g, '');
    }else{
      this.currentSaveData.mainWeapon = -1;
    }
    if(game.player.inv.secWeaponSlot != -1){
      this.currentSaveData.secWeapon = game.player.inv.secWeaponSlot.name.replace(/\s/g, '');
    }else{
      this.currentSaveData.secWeapon = -1;
    }
    if(game.player.inv.hatSlot != -1){
      this.currentSaveData.hat = game.player.inv.hatSlot.name.replace(/\s/g, '');
    }else{
      this.currentSaveData.hat = -1;
    }

    var saveData = JSON.stringify(this.currentSaveData);

    localStorage.setItem("saveData", saveData);
  }

  this.load = function(){
    console.log();
    this.currentSaveData = JSON.parse(localStorage.getItem("saveData"));
  }

  this.setGame = function(){
    game.reset();
    if(this.currentSaveData.wave == null){
      game.waveManager.wave = 0;
    }else{
      game.waveManager.wave = this.currentSaveData.wave;
    }
    if(this.currentSaveData.mainWeapon != -1){
      game.player.inv.mainWeaponSlot = weapons[this.currentSaveData.mainWeapon];
    }else{
      game.player.inv.mainWeaponSlot = -1;
    }
    if(this.currentSaveData.secWeapon != -1){
      game.player.inv.secWeaponSlot = weapons[this.currentSaveData.secWeapon];
    }else{
      game.player.inv.secWeaponSlot = -1;
    }
    if(this.currentSaveData.hat != -1){
      game.player.inv.hatSlot = hats[this.currentSaveData.hat];
      game.player.hat = game.player.inv.hatSlot;
    }else{
      game.player.inv.hatSlot= -1;
      game.player.hat = -1;
    }
    game.waveManager.endWave();
  }
}
