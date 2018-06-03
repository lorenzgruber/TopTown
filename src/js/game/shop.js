function Shop(){
  this.items = [];

  var i = 0;
  for(key in shopItems){
    this.items[i] = shopItems[key];
    i++;
  }

  this.currentTab = 1;

  this.visible = false;

  this.showShop = function(keyCode){
    var shop = document.getElementById("shop");
    if(!game.player.inv.showing){
      if(!this.visible && keyCode != 27){
        shop.style.display = "inline";
        canvas.className = "inventoryBgFilter";
        this.visible = true;

        this.updateItems();
      }
      else{
        shop.style.display = "none";
        canvas.className = "";
        this.visible = false;
      }
    }
  }

  this.updateItems = function(){
    var items = "";
    for (var i = 0; i < this.items.length; i++) {
      if(!this.items[i].type.includes("Upgrade")){
        var id = "shopItem" + i + "";
        items +=
          "<li id="+ id +" onclick='game.shop.selectItem(game.shop.items["+ i +"], "+ id +")'>";
          items +=
            "<img src='" + this.items[i].img.src + "'>"+
            "<h3>" + this.items[i].name + "</h3>"+
            "<p>" + this.items[i].type + "</p>"+
          "</li>";
      }
    }
    document.getElementById('shopList').innerHTML = items;
  }

  this.selectItem = function(item,id){
    this.selectedItem = item;
    for (var i = 0; i < this.items.length; i++) {
      if( document.getElementById("shopItem"+i) != null){
        console.log("shopItem"+i);
        document.getElementById("shopItem"+i).classList.remove("active");
      }
    }
    document.getElementById(id.id).classList.add("active");
  }

  this.switchTabs = function(tab){
    this.currentTab = tab;
  }

  this.buyItem = function(item){
    var index;
    for (var i = 0; i < this.items.length; i++) {
      if(this.items[i] === item){
        index = i;
        break;
      }
    }
    if(game.player.inv.currency >= item.price){
      if(!item.rebuyable){
        this.items.splice(index,1);
      }
      game.player.currency -= item.price;
      game.player.inv.addItem(item);
    }
  }

  this.upgradeItem = function(){

  }

}
