const MIRIAM_SPEED = 150;

let SanFranciscoScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:
    function SanFranciscoScene () {
      Phaser.Scene.call(this, { key: 'SanFranciscoScene' });
    },

  preload:
    function () {},

  create: function () {
    var map = this.make.tilemap({ key: 'san_francisco_tilemap' });
    var tileset = map.addTilesetImage('town_and_city_tileset');
    var layer = map.createStaticLayer(0, tileset, 0, 0);
    layer.setCollisionByProperty({ collides: true });
    this.impact.world.setCollisionMapFromTilemapLayer(layer, { defaultCollidingSlope: 1 });

    this.anims.create({
      key: 'miriam_left',
      frames: this.anims.generateFrameNumbers('miriam_left'),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'miriam_right',
      frames: this.anims.generateFrameNumbers('miriam_left'),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'miriam_up',
      frames: this.anims.generateFrameNumbers('miriam_up'),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'miriam_down',
      frames: this.anims.generateFrameNumbers('miriam_down'),
      frameRate: 10,
      repeat: -1
    });

    this.miriam = this.impact.add.sprite(494, 250, 'miriam_down', 0);

    this.cameras.main.setBounds(0, 0, 1024, 1024);
    this.impact.world.setBounds(0, 0, 1024, 1024);
    this.cameras.main.startFollow(this.miriam);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function (time, delta) {
    this.miriam.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.miriam.setVelocityX(-1 * MIRIAM_SPEED);
    } else if (this.cursors.right.isDown) {
      this.miriam.setVelocityX(MIRIAM_SPEED);
    }
    if (this.cursors.up.isDown) {
      this.miriam.setVelocityY(-1 * MIRIAM_SPEED);
    } else if (this.cursors.down.isDown) {
      this.miriam.setVelocityY(MIRIAM_SPEED);
    }

    if (this.cursors.left.isDown) {
      this.miriam.anims.play('miriam_left', true);
      this.miriam.flipX = false;
    } else if (this.cursors.right.isDown) {
      this.miriam.anims.play('miriam_right', true);
      this.miriam.flipX = true;
    } else if (this.cursors.up.isDown) {
      this.miriam.anims.play('miriam_up', true);
    } else if (this.cursors.down.isDown) {
      this.miriam.anims.play('miriam_down', true);
    } else {
      if (!this.miriam.anims.getCurrentKey()) {
        return;
      }
      this.miriam.anims.pause(this.anims.get(this.miriam.anims.getCurrentKey()).frames[0]);
    }
  }
});
