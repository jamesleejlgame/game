var config = {
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
    SanFranciscoScene,
    MiriamHouseScene,
    DrMarioSetupScene
  ]
};

const MIRIAM_SPEED = 150;
let DR_MARIO_NUM_PLAYERS = 2;
let DR_MARIO_WIDTH = 8;
let DR_MARIO_HEIGHT = 16;

let drMarioPlayers;
let drMarioGameOver;
let game = new Phaser.Game(config);
