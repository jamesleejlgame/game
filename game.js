var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'impact',
    impact: { gravity: 0 }
},
scene: [
    BootScene,
    SanFranciscoScene,
    DrMarioSetupScene
  ]
};

let drMarioPlayers;
let drMarioGameOver;
let game = new Phaser.Game(config);
