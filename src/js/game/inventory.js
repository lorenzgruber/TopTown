function Inventory(){
  this.items = [];
  this.weaponSlots = [];
  this.hatSlot = -1;
  this.skillSlots = [];

  this.selectedItem = 0;
  this.selectedWeaponSlot = 0;

  this.bullets = 500;

  this.showing = false;

  this.addItem = function(item){
    this.items.push(item);
    this.updateItems();
  }

  this.selectItem = function(item, id){
    this.selectedItem = item;
    for (var i = 0; i < this.items.length; i++) {
      document.getElementById("item"+i).className = "";
    }
    document.getElementById(id.id).className = "active";
    this.updateItemInfo();
  }

  this.equipWeapon = function(weapon){
    this.weaponSlots.push(weapon);
  }

  this.equipHat = function(hat){
    this.hatSlot = hat;
    game.player.hat = hat;
  }

  this.equipSkill = function(skill){
    this.skillSlots.push(weapon);
  }

  this.selectWeapon = function(weaponSlot){
    game.player.currentWeapon = this.weaponSlots[weaponSlot];
    game.player.timeFromLastShot = 0;
    game.player.inv.selectedWeaponSlot = weaponSlot;
  }

  this.showInventory = function(){
    var inv = document.getElementById('inventory');
    if(!this.showing){
      inv.style.display = "inline";
      canvas.className = "inventoryBgFilter";
      this.showing = true;
    }
    else{
      inv.style.display = "none";
      canvas.className = "";
      this.showing = false;
    }
  }

  this.updateItems = function(){
    var items = "";
    for (var i = 0; i < this.items.length; i++) {
      var id = "item" + i + "";
      items +=
        "<li id="+ id +" onclick='game.player.inv.selectItem(game.player.inv.items["+ i +"], "+ id +")'>"+
          "<img src='" + this.items[i].img.src + "'>"+
          "<h3>" + this.items[i].name + "</h3>"+
          "<p>" + this.items[i].type + "</p>"+
        "</li>"
    }
    document.getElementById('invList').innerHTML = items;

    this.selectedItem = this.items[0];
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
      if(this.selectedItem.type == "hat"){
        if(this.selectedItem === game.player.hat){
          itemInfo +=
          "<button id='equiptButton'>unequip</button>"
        }
        else{
          itemInfo +=
          "<button id='equiptButton'>equip</button>"
        }
      }


      if(this.selectedItem.type == "Weapon"){
        itemInfo +=
        "<button id='equiptButton'>equip</button>"
        "<button>upgrade</button>"
      }

      itemInfo +=
      "</li>"+
    "</ul>"

    document.getElementById('itemInfo').innerHTML = itemInfo;

    if(this.selectedItem.type == "hat"){
        document.getElementById('equiptButton').addEventListener("click", function(){
          if(game.player.inv.selectedItem === game.player.hat){
            game.player.inv.equipHat(-1);
          }
          else{
            game.player.inv.equipHat(game.player.inv.selectedItem);
          }
        game.player.inv.updateItemInfo();
        })
    }
  }
}
