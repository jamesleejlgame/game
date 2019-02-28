const MIRIAM_SPEED = 80;

let SanFranciscoScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize:
    function SanFranciscoScene () {
      Phaser.Scene.call(this, { key: 'SanFranciscoScene' });
    },

  preload:
    function () {},

  create: function () {
    this.add.image(0, 0, 'san_francisco').setOrigin(0);
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

    this.miriam = this.physics.add.sprite(435, 300, 'miriam_down', 0);
    this.miriam.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, 1088, 1024);
    this.physics.world.setBounds(0, 0, 1088, 1024);
    this.cameras.main.startFollow(this.miriam);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function (time, delta) {
    this.miriam.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.miriam.body.setVelocityX(-1 * MIRIAM_SPEED);
    } else if (this.cursors.right.isDown) {
      this.miriam.body.setVelocityX(MIRIAM_SPEED);
    }
    if (this.cursors.up.isDown) {
      this.miriam.body.setVelocityY(-1 * MIRIAM_SPEED);
    } else if (this.cursors.down.isDown) {
      this.miriam.body.setVelocityY(MIRIAM_SPEED);
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
