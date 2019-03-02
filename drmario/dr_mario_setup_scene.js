let DrMarioSetupScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:
    function DrMarioSetupScene () {
      Phaser.Scene.call(this, { key: 'DrMarioSetupScene' });
    },

  create: function () {
    drMarioInitializeForPuzzle();
    this.add.image(400, 300, 'dr_mario_background');
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.physics.world.setBounds(0, 0, 800, 600);
    this.cameras.main.roundPixels = true; // avoid tile bleed
    this.cursors = this.input.keyboard.createCursorKeys();
    this.populatePlayerNumber(0);
    this.populatePlayerNumber(1);
  },

  update: function (time, delta) {
  },

  populatePlayerNumber: function (playerNum) {
    for (let w = 0; w < DR_MARIO_WIDTH; ++w) {
      for (let l = 0; l < DR_MARIO_HEIGHT; ++l) {
        let spriteIndex = drMarioPlayers[playerNum].field[w][l].getSpriteIndex();
        if (spriteIndex == null) {
          continue;
        } else if (spriteIndex == 100) {
          this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_yellow_virus', 0); 
        } else if (spriteIndex == 200) {
          this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_red_virus', 0); 
        } else if (spriteIndex == 300) {
          this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_blue_virus', 0); 
        } else {
          this.physics.add.sprite(playerNum * 320 + 170 + w * 20, 510 - l * 20, 'dr_mario_sprites', spriteIndex);
        }
      }
    }
  }
});
