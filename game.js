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
    Rpg.CommonScenes.DialogueScene,
    Rpg.Scenes.MiriamHouseScene,
    Rpg.Scenes.SanFranciscoScene,
    Rpg.Scenes.ChristinaHouseScene
  ]
};

let game = new Phaser.Game(config);