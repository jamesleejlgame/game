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
    SanFranciscoScene,
    DialogueScene,
    MiriamHouseScene,
    ChristinaHouseScene,
    DrMarioSetupScene
  ]
};

let game = new Phaser.Game(config);
