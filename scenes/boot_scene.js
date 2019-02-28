var BootScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
    function BootScene ()
    {
      Phaser.Scene.call(this, { key: 'BootScene' });
    },

  preload: 
    function () {
      this.load.image('san_francisco', 'assets/san_francisco.png');  
      this.load.spritesheet('miriam_up', 'assets/miriam_up.png', { frameWidth: 28, frameHeight: 48 });
      this.load.spritesheet('miriam_left', 'assets/miriam_left.png', { frameWidth: 30, frameHeight: 48 });
      this.load.spritesheet('miriam_down', 'assets/miriam_down.png', { frameWidth: 30, frameHeight: 48 });
    },

  create: function () {
    this.scene.start('SanFranciscoScene');
  }
});
