var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
    function BootScene ()
    {
      Phaser.Scene.call(this, { key: 'BootScene' });
    },

  preload:
    function () {
      this.load.tilemapTiledJSON('san_francisco_tilemap', 'assets/san_francisco_tiled.json');
      this.load.image('town_and_city_tileset', 'assets/town_and_city_tileset.png');
      this.load.spritesheet('dr_mario_background', 'assets/dr_mario_background.png', { frameWidth: 300, frameHeight: 400, margin: 4 });
      this.load.spritesheet('dr_mario_sprites', 'assets/dr_mario_sprites.png', { frameWidth: 28, frameHeight: 30 });
      this.load.spritesheet('miriam_up', 'assets/miriam_up.png', { frameWidth: 28, frameHeight: 48 });
      this.load.spritesheet('miriam_left', 'assets/miriam_left.png', { frameWidth: 30, frameHeight: 48 });
      this.load.spritesheet('miriam_down', 'assets/miriam_down.png', { frameWidth: 30, frameHeight: 48 });
    },

  create: function () {
    //this.scene.start('DrMarioSetupScene');
    this.scene.start('SanFranciscoScene');
  }
});
