function keyPressed(){
  if(keyCode === 49 || keyCode === 50){
    game.player.inv.selectWeapon(keyCode - 48);
  }

  if(keyCode === 84){
    devTools.showDevTools();
  }

  if(keyCode === 73){
    game.player.inv.showInventory(keyCode);
  }

  if(keyCode === 66){
    game.shop.showShop(keyCode);
  }

  if(keyCode === 27){
    if(game.player.inv.showing){
      game.player.inv.showInventory(keyCode);
    }
    else if(game.shop.visible){
      game.shop.showShop(keyCode);
    }
  }

  if(keyCode === 82 && game.player.currentWeapon.bulletsinMag < game.player.currentWeapon.magSize){
    game.player.currentWeapon.startReload();
  }

  if(keyCode === 78 && !game.waveManager.inWave){
    game.waveManager.startNextWave();
  }
}

function mouseReleased(){
  if(game.player.currentWeapon.fireMode == "semi"){
    game.player.currentWeapon.mouseReleased = true;
  }
}

function mouseWheel(event) {
  if(event.delta < 0){
    game.player.inv.selectedWeaponSlot --;
    if(game.player.inv.selectedWeaponSlot < 0){
      game.player.inv.selectedWeaponSlot = 4;
    }

  }
  else{
    game.player.inv.selectedWeaponSlot ++;
    if(game.player.inv.selectedWeaponSlot > 4){
      game.player.inv.selectedWeaponSlot = 0;
    }
  }
  game.player.inv.selectWeapon(game.player.inv.selectedWeaponSlot);
}
