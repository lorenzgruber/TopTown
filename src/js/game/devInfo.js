function DevTools() {
  this.playerinvincability = false;
  this.nexusInvincability = false;
  this.enemiesSpawn = true;
  this.devToolsVisible = false;
  this.devInfoVisible = false;

  this.devTools = document.getElementById("devTools");
  this.infoDiv = document.getElementById("infoDiv");

  this.init = function() {
    this.devTools.innerHTML =
      "<button id='pI' onclick='devTools.setCheat(\"pI\")'>Player Invincability </button> <br>" +
      "<button id='nI' onclick='devTools.setCheat(\"nI\")'>Nexus Invincability </button> <br>" +
      "<button id='eS' onclick='devTools.setCheat(\"eS\")'>Enemies Spawn </button> <br>" +
      "<button id='kE' onclick='devTools.killEnemies()'>Kill All Enemies </button> <br>" +
      "<button id='hP' onclick='devTools.healPlayer()'>Heal Player </button> <br>" +
      "<button id='hN' onclick='devTools.healNexus()'>Heal Nexus </button> <br>" +
      "<button id='sDI' onclick='devTools.showDevInfo()'>Show DevInfo </button> <br>";
  }

  this.showDevTools = function() {
    if (!this.devToolsVisible) {
      this.devTools.style.display = "table";
      this.devToolsVisible = true;
    } else {
      this.devTools.style.display = "none";
      this.devToolsVisible = false;
    }
  }

  this.showDevInfo = function() {
    if (!this.devInfoVisible) {
      this.infoDiv.style.display = "inline";
      this.devInfoVisible = true;
      document.getElementById('sDI').className = "activeButton";
    } else {
      this.infoDiv.style.display = "none";
      this.devInfoVisible = false;
      document.getElementById('sDI').className = "";
    }
  }

  this.update = function() {
    if (this.devInfoVisible) {
      this.infoDiv.innerHTML =
		    "Bullets rendered: " + game.bullets.length +
		    "<br>X: " + round(game.player.pos.x) +
		    "<br>Y: " + round(game.player.pos.y) +
		    "<br>Vel: " + round(game.player.vel.mag()) +
		    "<br>Player-HP: " + game.player.health +
		    "<br>Nexus-HP: " + round(game.nexus.health) +
		    "<br>Weapon: " + game.player.currentWeapon.name +
        "<br>R: " + game.player.currentWeapon.timeFromLastReload +
		    "<br><br>SCORE: " + game.score;
    }
    if (this.playerinvincability) {
      this.healPlayer();
    }

    if (this.nexusInvincability) {
      this.healNexus();
    }

    if (!this.enemiesSpawn) {
      this.killEnemies();
    }
  }

  this.setCheat = function(cheat) {
    if (cheat == "pI") {
      if (!this.playerinvincability) {
        this.playerinvincability = true;
        console.log("Player Invincability enabled");
        document.getElementById('pI').className = "activeButton";
      } else {
        console.log("Player Invincability disabled");
        this.playerinvincability = false;
        document.getElementById('pI').className = "";
      }
    }
    if (cheat == "nI") {
      if (!this.nexusInvincability) {
        this.nexusInvincability = true;
        console.log("Nexus Invincability enabled");
        document.getElementById('nI').className = "activeButton";
      } else {
        this.nexusInvincability = false;
        console.log("Nexus Invincability disabled");
        document.getElementById('nI').className = "";
      }
    }
    if (cheat == "eS") {
      if (!this.enemiesSpawn) {
        this.enemiesSpawn = true;
        console.log("Enemy Spawns disabled");
        document.getElementById('eS').className = "";
      } else {
        this.enemiesSpawn = false;
        console.log("Enemy Spawns enabled");
        document.getElementById('eS').className = "activeButton";
      }
    }
  }

  this.healPlayer = function() {
    game.player.newHealth = game.player.initalHealth;
    game.player.health = game.player.initalHealth;
  }

  this.healNexus = function() {
    game.nexus.health = game.nexus.initalHealth;
  }

  this.killEnemies = function() {
    for (var i = 0; i < game.enemies.length; i++) {
      game.enemies[i].health = 0;
    }
  }
}

function drawGrid() {
  var gridDencity = 10;
  var c = color('#583a58');

  push();
  translate(-game.worldSize.x, -game.worldSize.y);
  stroke(c);
  for (i = 1; i < gridDencity; i++) {
    line(i * game.worldSize.x * 2 / gridDencity, 0, i * game.worldSize.x * 2 / gridDencity, game.worldSize.y * 2);
    for (j = 1; j < gridDencity; j++) {
      line(0, j * game.worldSize.y * 2 / gridDencity, game.worldSize.x * 2, j * game.worldSize.y * 2 / gridDencity);
    }
  }
  pop();
}

function drawWorldBounds() {
  var c = color('#583a58');
  push();
  stroke(c);
  strokeWeight(5);

  line(-game.worldSize.x, -game.worldSize.y, -game.worldSize.x, game.worldSize.y); //left vertical
  line(game.worldSize.x, -game.worldSize.y, game.worldSize.x, game.worldSize.y); //right vertical
  line(-game.worldSize.x, -game.worldSize.y, game.worldSize.x, -game.worldSize.y); //up horizontal
  line(-game.worldSize.x, game.worldSize.y, game.worldSize.x, game.worldSize.y); //bottom horizontal
  pop();
}
