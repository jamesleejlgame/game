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

let drMarioPlayers;
let drMarioGameOver;
let game = new Phaser.Game(config);
