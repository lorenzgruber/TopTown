function keyPressed(){
  if(keyCode === 49 || keyCode === 50 || keyCode === 51 || keyCode === 52 || keyCode === 53){
    game.player.inv.selectWeapon(keyCode - 49);
  }

  if(keyCode === 84){
    devTools.showDevTools();
  }

  if(keyCode === 73 || keyCode === 27){
    game.player.inv.showInventory(keyCode);
  }

  if(keyCode === 82 && game.player.currentWeapon.bulletsinMag < game.player.currentWeapon.magSize){
    game.player.currentWeapon.startReload();
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
