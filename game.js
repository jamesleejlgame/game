/**
 * Notes: Tilemap layers must be named 'base_tiles' for the floor, and 'objects' for objects.
 */
import { BootScene } from './boot_scene.js'

import { DialogueScene } from './rpg/common_scenes/dialogue_scene.js';

import { AlcatrazScene } from './rpg/scenes/alcatraz_scene.js';
import { BabysittingScene } from './rpg/scenes/babysitting_scene.js';
import { ChristinaHouseScene } from './rpg/scenes/christina_house_scene.js';
import { ChristinaHouse2Scene } from './rpg/scenes/christina_house2_scene.js';
import { CookingClassScene } from './rpg/scenes/cooking_class_scene.js';
import { EscapeRoomScene } from './rpg/scenes/escape_room_scene.js';
import { HikeScene } from './rpg/scenes/hike_scene.js';
import { JamesCallsMiriamScene } from './rpg/scenes/james_calls_miriam_scene.js';
import { JapanHikeScene } from './rpg/scenes/japan_hike_scene.js';
import { JapanIntroScene } from './rpg/scenes/japan_intro_scene.js';
import { MiriamCallsHomeopathScene } from './rpg/scenes/miriam_calls_homeopath_scene.js';
import { MiriamHouseBootcampScene } from './rpg/scenes/miriam_house_bootcamp_scene.js';
import { MiriamHouseScene } from './rpg/scenes/miriam_house_scene.js';
import { MiriamReceivesPillsScene } from './rpg/scenes/miriam_receives_pills_scene.js';
import { PostAlcatrazScene } from './rpg/scenes/post_alcatraz_scene.js';
import { PostDrMarioScene } from './rpg/scenes/post_dr_mario_scene.js';
import { PreDrMarioScene } from './rpg/scenes/pre_dr_mario_scene.js';
import { PreHarryPotterBattleScene } from './rpg/scenes/pre_harry_potter_battle_scene.js';
import { PreOvercookedScene } from './rpg/scenes/pre_overcooked_scene.js';
import { ProposalScene } from './rpg/scenes/proposal_scene.js';
import { PubQuizScene } from './rpg/scenes/pub_quiz_scene.js';
import { SanFranciscoScene } from './rpg/scenes/san_francisco_scene.js';
import { DrMarioScene } from './drmario/dr_mario_scene.js';

let scenes = [ BootScene ];

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
    PubQuizScene,
    AlcatrazScene,
    JamesCallsMiriamScene,
    PostAlcatrazScene,
    MiriamHouseBootcampScene,
    PreDrMarioScene,
    PostDrMarioScene,
    CookingClassScene,
    JapanIntroScene,
    JapanHikeScene,
    PreOvercookedScene,
    MiriamCallsHomeopathScene,
    MiriamReceivesPillsScene,
    HikeScene,
    BabysittingScene,
    EscapeRoomScene,
    ProposalScene,
    PreHarryPotterBattleScene,
    DrMarioScene
  ]
};

let game = new Phaser.Game(config);
