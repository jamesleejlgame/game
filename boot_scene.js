
import { MiriamHouseScene } from './rpg/scenes/miriam_house_scene.js';

class BootScene extends Phaser.Scene {
  static ANIMATIONS = ['miriam_up', 'miriam_left', 'miriam_down', 'christina_up', 'christina_left', 'christina_down',
    'gaby_down', 'james_up', 'james_left', 'james_down', 'shuriken']

  constructor ()
  {
    super({ key: 'BootScene' });
  }

  preload () {
    this.load.tilemapTiledJSON('alcatraz_tilemap', 'assets/alcatraz.json');
    this.load.tilemapTiledJSON('alcatraz2_tilemap', 'assets/alcatraz2.json');
    this.load.tilemapTiledJSON('babysitting_tilemap', 'assets/babysitting.json');
    this.load.tilemapTiledJSON('christina_house_tilemap', 'assets/christina_house.json');
    this.load.tilemapTiledJSON('christina_house2_tilemap', 'assets/christina_house2.json');
    this.load.tilemapTiledJSON('cooking_class_tilemap', 'assets/cooking_class.json');
    this.load.tilemapTiledJSON('harry_potter_tilemap', 'assets/harry_potter.json');
    this.load.tilemapTiledJSON('hiking_tilemap', 'assets/hiking.json');
    this.load.tilemapTiledJSON('kyoto_tilemap', 'assets/kyoto.json');
    this.load.tilemapTiledJSON('miriam_house_tilemap', 'assets/miriam_house.json');
    this.load.tilemapTiledJSON('miriam_house2_tilemap', 'assets/miriam_house2.json');
    this.load.tilemapTiledJSON('miriam_house3_tilemap', 'assets/miriam_house3.json');
    this.load.tilemapTiledJSON('proposal_tilemap', 'assets/proposal.json');
    this.load.tilemapTiledJSON('pub_quiz_tilemap', 'assets/pub_quiz.json');
    this.load.tilemapTiledJSON('san_francisco_tilemap', 'assets/san_francisco_tiled.json');
    this.load.tilemapTiledJSON('sunnyvale_house_tilemap', 'assets/sunnyvale_house.json');
    this.load.tilemapTiledJSON('tokyo_tilemap', 'assets/tokyo.json');

    this.load.image('town_and_city_tileset', 'assets/town_and_city_tileset.png');
    this.load.image('castle_tileset', 'assets/castle_tileset.png');
    this.load.image('dr_mario_background', 'assets/dr_mario_background2.png');
    this.load.image('jiraiya', 'assets/jiraiya.png');
    this.load.image('adrianna_up', 'assets/adrianna_up.gif');
    this.load.image('homura_down', 'assets/homura_down.gif');
    this.load.image('stitch_down', 'assets/stitch_down.png');
    this.load.image('wimble_down', 'assets/wimble_down.gif');
    this.load.image('hellokitty_down', 'assets/hellokitty_down.png');
    this.load.spritesheet('dr_mario_sprites', 'assets/dr_mario_sprites2.png', { frameWidth: 19, frameHeight: 19, spacing: 1 });
    this.load.spritesheet('dr_mario_yellow_virus', 'assets/dr_mario_yellow_virus.png', { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('dr_mario_blue_virus', 'assets/dr_mario_blue_virus.png', { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('dr_mario_red_virus', 'assets/dr_mario_red_virus.png', { frameWidth: 20, frameHeight: 20 });
    this.load.spritesheet('miriam_up', 'assets/miriam_up.png', { frameWidth: 28, frameHeight: 48 });
    this.load.spritesheet('miriam_left', 'assets/miriam_left.png', { frameWidth: 30, frameHeight: 48 });
    this.load.spritesheet('miriam_down', 'assets/miriam_down.png', { frameWidth: 30, frameHeight: 48 });
    this.load.spritesheet('christina_up', 'assets/christina_up.png', { frameWidth: 28, frameHeight: 48 });
    this.load.spritesheet('christina_left', 'assets/christina_left.png', { frameWidth: 30, frameHeight: 48 });
    this.load.spritesheet('christina_down', 'assets/christina_down.png', { frameWidth: 30, frameHeight: 48 });
    this.load.spritesheet('james_up', 'assets/james_up.png', { frameWidth: 28, frameHeight: 48 });
    this.load.spritesheet('james_left', 'assets/james_left.png', { frameWidth: 30, frameHeight: 48 });
    this.load.spritesheet('james_down', 'assets/james_down.png', { frameWidth: 30, frameHeight: 48 });
    this.load.spritesheet('karen_up', 'assets/karen_up.gif', { frameWidth: 30, frameHeight: 48 });
    this.load.spritesheet('gaby_down', 'assets/gaby_down.png', { frameWidth: 30, frameHeight: 48 });
    this.load.spritesheet('shuriken', 'assets/shuriken.png', { frameWidth: 16, frameHeight: 16 });
  }

  create () {
    this.scene.start('MiriamHouseScene', {startingLocation: MiriamHouseScene.startingLocationEnum.START_GAME, fadeIn: true});
  }
}

export { BootScene }