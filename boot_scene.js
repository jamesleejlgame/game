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
      this.load.tilemapTiledJSON('christina_house_tilemap', 'assets/christina_house.json');
      this.load.tilemapTiledJSON('miriam_house_tilemap', 'assets/miriam_house.json');
      this.load.image('town_and_city_tileset', 'assets/town_and_city_tileset.png');
      this.load.image('dr_mario_background', 'assets/dr_mario_background2.png');
      this.load.spritesheet('dr_mario_sprites', 'assets/dr_mario_sprites2.png', { frameWidth: 19, frameHeight: 19, spacing: 1 });
      this.load.spritesheet('dr_mario_yellow_virus', 'assets/dr_mario_yellow_virus.png', { frameWidth: 20, frameHeight: 20 });
      this.load.spritesheet('dr_mario_blue_virus', 'assets/dr_mario_blue_virus.png', { frameWidth: 20, frameHeight: 20 });
      this.load.spritesheet('dr_mario_red_virus', 'assets/dr_mario_red_virus.png', { frameWidth: 20, frameHeight: 20 });
      this.load.spritesheet('miriam_up', 'assets/miriam_up.png', { frameWidth: 28, frameHeight: 48 });
      this.load.spritesheet('miriam_left', 'assets/miriam_left.png', { frameWidth: 30, frameHeight: 48 });
      this.load.spritesheet('miriam_down', 'assets/miriam_down.png', { frameWidth: 30, frameHeight: 48 });
      this.load.spritesheet('christina_down', 'assets/christina_down.gif', { frameWidth: 30, frameHeight: 48 });
      this.load.spritesheet('james_down', 'assets/james_down.gif', { frameWidth: 30, frameHeight: 48 });
      this.load.spritesheet('karen_up', 'assets/karen_up.gif', { frameWidth: 30, frameHeight: 48 });
    },

  create: function () {
    //this.scene.start('MiriamHouseScene', {startingLocation: MiriamHouseSceneVars.startingLocationEnum.START_GAME});
    this.scene.start('ChristinaHouseScene');
  }
});
