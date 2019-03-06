import { BootScene } from './boot_scene.js'

import { DialogueScene } from './rpg/common_scenes/dialogue_scene.js';

import { ChristinaHouseScene } from './rpg/scenes/christina_house_scene.js';
import { ChristinaHouse2Scene } from './rpg/scenes/christina_house2_scene.js';
import { MiriamHouseScene } from './rpg/scenes/miriam_house_scene.js';
import { PubQuizScene } from './rpg/scenes/pub_quiz_scene.js';
import { SanFranciscoScene } from './rpg/scenes/san_francisco_scene.js';

let config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    impact: { gravity: 0 }
  },
  scene: [
    BootScene,
    DialogueScene,
    MiriamHouseScene,
    SanFranciscoScene,
    ChristinaHouseScene,
    ChristinaHouse2Scene,
    PubQuizScene
  ]
};

let game = new Phaser.Game(config);