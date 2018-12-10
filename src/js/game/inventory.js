function Inventory(){
  this.items = [];
  this.weaponSlots = [];
  this.mainWeaponSlot = -1;
  this.secWeaponSlot = -1;
  this.hatSlot = -1;

  this.currency = 0;

  this.selectedItem = -1;
  this.selectedWeaponSlot = 1;

  this.showing = false;

  this.addItem = function(item){
    this.items.push(item);
    this.updateItems();
  }

  this.selectItem = function(item, id){
    this.selectedItem = item;
    for (var i = 0; i < this.items.length; i++) {
      document.getElementById("item"+i).classList.remove("active");
    }
    if(!document.getElementById(id.id).classList.contains("grid-item")){
      document.getElementById(id.id).classList.add("active");
    }
    this.updateItemInfo();
  }

  this.equipMainWeapon = function(weapon){
    this.mainWeaponSlot = weapon;
  }

  this.equipSecWeapon = function(weapon){
    this.secWeaponSlot = weapon;
  }

  this.equipHat = function(hat){
    this.hatSlot = hat;
    game.player.hat = hat;
  }

  this.selectWeapon = function(weaponSlot){
    if(weaponSlot == 1){
      game.player.currentWeapon = this.mainWeaponSlot;
    }
    if(weaponSlot == 2){
      game.player.currentWeapon = this.secWeaponSlot;
    }
    game.player.timeFromLastShot = 0;
    game.player.inv.selectedWeaponSlot = weaponSlot;
  }

  this.showInventory = function(keycode){
    if(!game.shop.visible){
      var inv = document.getElementById('inventory');
      if(!this.showing && keyCode != 27){
        inv.style.display = "inline";
        canvas.className = "inventoryBgFilter";
        this.showing = true;

        if(this.selectedItem == -1){
          this.selectItem(this.items[0], item0);
        }

        this.updateItems();
        this.updateItemInfo();
        this.updateEquipmentSlots();

        if(!game.waveManager.inWave){
          document.getElementById('nextWaveReminder').style.display = "none";
        }
      }
      else{
        inv.style.display = "none";
        canvas.className = "";
        this.showing = false;

        if(!game.waveManager.inWave){
          document.getElementById('nextWaveReminder').style.display = "inline";
        }
      }
    }

  }

  this.updateItems = function(){
    var items = "";
    for (var i = 0; i < this.items.length; i++) {
      var id = "item" + i + "";
      items +=
        "<li id="+ id +" onclick='game.player.inv.selectItem(game.player.inv.items["+ i +"], "+ id +")'";
        if(document.getElementById(id) != null){
          if(document.getElementById(id).classList.contains("active") || this.items[i] == this.mainWeaponSlot || this.items[i] == this.secWeaponSlot || this.items[i] == this.hatSlot){
            items += "class='"
            if(document.getElementById(id).classList.contains("active")){
              items +=" active";
            }
            if(this.items[i] == this.mainWeaponSlot || this.items[i] == this.secWeaponSlot || this.items[i] == this.hatSlot){
              items+= " equipped"
            }
            items += "'>"
          }

          else{
            items += ">";
          }
        }
        else{
          items += ">";
        }
        items +=
          "<img src='" + this.items[i].img.src + "'>"+
          "<h3>" + this.items[i].name + "</h3>"+
          "<p>" + this.items[i].type + "</p>"+
        "</li>";
    }
    document.getElementById('invList').innerHTML = items;
  }

  this.updateItemInfo = function(){
    var itemInfo = "";
    itemInfo +=
    "<ul>"+
      "<li>"+
        "<div class='imgBack'>"+
          "<img src='" + this.selectedItem.img.src + "'>"+
        "</div>"+
      "</li>"+
      "<li><h3>"+ this.selectedItem.name +"<h3></li>"

      if(this.selectedItem.type == "Weapon"){
        itemInfo +=
        "<li>"+
          "<p>"+
            "damage: "+ this.selectedItem.dmg +" <br>"+
            "fire rate: "+ this.selectedItem.fireRate +" <br>"+
            "precision: "+ this.selectedItem.prec +""+
          "</p>"+
        "</li>"
      }

      itemInfo +=
      "<li>"+
        "<p>"+
          this.selectedItem.description +
        "</p>"+
      "</li>"+
      "<li>"
      if(this.selectedItem.type == "hat" || this.selectedItem.type == "Main Weapon" || this.selectedItem.type == "Secondary Weapon"){
          if(this.selectedItem === game.player.hat || this.selectedItem === game.player.inv.mainWeaponSlot || this.selectedItem === game.player.inv.secWeaponSlot){
            itemInfo +=
            "<button id='equiptButton'>unequip</button>"
          }
          else{
            itemInfo +=
            "<button id='equiptButton'>equip</button>"
          }
      }

      itemInfo +=
      "</li>"+
    "</ul>"

    document.getElementById('itemInfo').innerHTML = itemInfo;

    if(this.selectedItem.type == "hat" || this.selectedItem.type == "Main Weapon" || this.selectedItem.type == "Secondary Weapon"){
      if(this.selectedItem.type == "hat"){
        document.getElementById('equiptButton').addEventListener("click", function(){
          if(game.player.inv.selectedItem === game.player.hat){
            game.player.inv.equipHat(-1);
          }
          else{
            game.player.inv.equipHat(game.player.inv.selectedItem);
          }
          game.player.inv.updateItems();
          game.player.inv.updateItemInfo();
          game.player.inv.updateEquipmentSlots();
        });
      }
      if(this.selectedItem.type == "Main Weapon"){
        document.getElementById('equiptButton').addEventListener("click", function(){
          if(game.player.inv.selectedItem === game.player.inv.mainWeaponSlot){
            game.player.inv.equipMainWeapon(-1);
          }
          else{
            game.player.inv.equipMainWeapon(game.player.inv.selectedItem);
          }
          game.player.inv.selectWeapon(game.player.inv.selectedWeaponSlot);
          game.player.inv.updateItems();
          game.player.inv.updateItemInfo();
          game.player.inv.updateEquipmentSlots();
        });
      }
      if(this.selectedItem.type == "Secondary Weapon"){
        document.getElementById('equiptButton').addEventListener("click", function(){
          if(game.player.inv.selectedItem === game.player.inv.secWeaponSlot){
            game.player.inv.equipSecWeapon(-1);
          }
          else{
            game.player.inv.equipSecWeapon(game.player.inv.selectedItem);
          }
          game.player.inv.selectWeapon(game.player.inv.selectedWeaponSlot);
          game.player.inv.updateItems();
          game.player.inv.updateItemInfo();
          game.player.inv.updateEquipmentSlots();
        });
      }
    }
  }

  this.updateEquipmentSlots = function(){
    var hatSlot, mainWeaponSlot, secWeaponSlot;
    hatSlot = mainWeaponSlot = secWeaponSlot = "";
    hatSlot +=
    "<p>Vanity</p>"
    if(this.hatSlot != -1){
      hatSlot += "<img src='" + this.hatSlot.img.src + "'>"
      document.getElementById("skin").setAttribute("onclick", "game.player.inv.selectItem(game.player.inv.hatSlot, skin)");
    }
    else{
      document.getElementById("skin").setAttribute("onclick", "");
    }
    document.getElementById('skin').innerHTML = hatSlot;

    mainWeaponSlot +=
    "<p>Main Weapon</p>"
    if(this.mainWeaponSlot != -1){
      mainWeaponSlot += "<img src='" + this.mainWeaponSlot.img.src + "'>"
      document.getElementById("mainWeapon").setAttribute("onclick", "game.player.inv.selectItem(game.player.inv.mainWeaponSlot, mainWeapon)");
    }
    else{
      document.getElementById("mainWeapon").setAttribute("onclick", "");
    }
    document.getElementById('mainWeapon').innerHTML = mainWeaponSlot;

    secWeaponSlot +=
    "<p>Secondary Weapon</p>"
    if(this.secWeaponSlot != -1){
      secWeaponSlot += "<img src='" + this.secWeaponSlot.img.src + "'>"
      document.getElementById("secWeapon").setAttribute("onclick", "game.player.inv.selectItem(game.player.inv.secWeaponSlot, secWeapon)");
    }
    else{
      document.getElementById("secWeapon").setAttribute("onclick", "");
    }
    document.getElementById('secWeapon').innerHTML = secWeaponSlot;

    game.saveManager.save();
  }
}
