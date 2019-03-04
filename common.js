let Common = {
  PLAYER_SPEED: 150,
  MAX_DISTANCE_FOR_SPRITE_INTERACTION: 50,

  /**
   * Creates a playable rpg character.
   * @param {Phaser.Scene} scene the phaser scene we are creating on.
   * @param {Phaser.Map} map the phaser map.
   * @param {string} startTileObjectName the starting tile object name.
   * @param {string} spriteImageName the name of the sprite image as defined in boot_scene.js.
   * @returns {Phaser.Sprite} the sprite representing the controllable character. defines cursors_ on it.
   * TODO: Don't hardcode 'objects'.
   */
  createPlayerControlledRpgCharacter: function (scene, map, startTileObjectName, spriteImageName) {
    let startTileInfo = map.findObject('objects', (obj) => { return obj.name == startTileObjectName; });
    let player = scene.physics.add.sprite(startTileInfo.x, startTileInfo.y, spriteImageName, 0);
    player.setSize(32, 1);
    player.setCollideWorldBounds(true);
    scene.cameras.main.startFollow(player);
    return player;
  },

  /**
   * Creates an npc character.
   * @param {Phaser.Scene} scene the phaser scene we are creating on.
   * @param {Phaser.Map} map the phaser map.
   * @param {string} startTileObjectName the starting tile object name.
   * @param {string} spriteImageName the name of the sprite image as defined in boot_scene.js.
   * @returns {Phaser.Sprite} the sprite representing the controllable character. defines cursors_ on it.
   * TODO: Don't hardcode 'objects'.
   */
  createNPCCharacter: function (scene, map, startTileObjectName, spriteImageName) {
    let startTileInfo = map.findObject('objects', (obj) => { return obj.name == startTileObjectName; });
    let npc = scene.physics.add.sprite(startTileInfo.x, startTileInfo.y, spriteImageName, 0);
    npc.setImmovable(true);
    return npc;
  },

  /**
   * Creates a miriam RPG style animation in the given scene.
   * @param {Phaser.Scene} scene the phaser scene.
   * @param {string} player_left_anim_name the animation string name for moving left.
   * @param {string} player_up_anim_name the animation string name for moving up.
   * @param {string} player_down_anim_name the animation string name for moving down.
   */
  createMiriamAnimation: function (scene, player_left_anim_name, player_up_anim_name, player_down_anim_name) {
    scene.anims.create({
      key: player_left_anim_name,
      frames: scene.anims.generateFrameNumbers(player_left_anim_name),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: player_up_anim_name,
      frames: scene.anims.generateFrameNumbers(player_up_anim_name),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: player_down_anim_name,
      frames: scene.anims.generateFrameNumbers(player_down_anim_name),
      frameRate: 10,
      repeat: -1
    });
  },

  /**
   * Updates the player controlled character RPG style animation in the given scene.
   * @param {Phaser.Scene} scene a phaser scene.
   * @param {Phaser.Cursor} the cursors on the scene.
   * @param {Phaser.Sprite} player the player sprite defined on the scene to update.
   * @param {string} player_left_anim_name the animation string name for moving left.
   * @param {string} player_up_anim_name the animation string name for moving up.
   * @param {string} player_down_anim_name the animation string name for moving down.
   * Note: Right is not included because it is left flipped.
   */
  updatePlayerAnimation: function (scene, cursors, player, player_left_anim_name, player_up_anim_name, player_down_anim_name) {
    if (!player) {
      return;
    }
    player.setVelocity(0);

    if (cursors.left.isDown) {
      player.setVelocityX(-1 * Common.PLAYER_SPEED);
    } else if (cursors.right.isDown) {
      player.setVelocityX(Common.PLAYER_SPEED);
    }
    if (cursors.up.isDown) {
      player.setVelocityY(-1 * Common.PLAYER_SPEED);
    } else if (cursors.down.isDown) {
      player.setVelocityY(Common.PLAYER_SPEED);
    }

    if (cursors.left.isDown) {
      player.anims.play(player_left_anim_name, true);
      player.flipX = false;
    } else if (cursors.right.isDown) {
      player.anims.play(player_left_anim_name, true);
      player.flipX = true;
    } else if (cursors.up.isDown) {
      player.anims.play(player_up_anim_name, true);
    } else if (cursors.down.isDown) {
      player.anims.play(player_down_anim_name, true);
    } else {
      if (!player.anims.getCurrentKey()) {
        return;
      }
      player.anims.pause(scene.anims.get(player.anims.getCurrentKey()).frames[0]);
    }
  },

  /**
   * Retrieves the dialogue scene.
   */
  getDialogueScene: function () {
    return game.scene.getScene('DialogueScene');
  },

  /**
   * Run in the create function of a scene to create a map.
   * @param {Phaser.Scene} scene the phaser scene.
   * @param {string} tilemapName the name of the tilemap.
   * @param {string} tilesetName the name of the tilset.
   * @param {array<string>} tileLayers an array of layer names.
   * @returns [{Phaser.Map, {array<Phaser.Tilemaps.StaticTilemapLayer>}] all the phaser layers in the order passed in.
   */
  createMap: function (scene, tilemapName, tilesetName, tileLayers) {
    let map = scene.make.tilemap({ key: tilemapName });
    let ret = [];
    ret.push(map)
    let tileset = map.addTilesetImage(tilesetName);
    let layers = []
    tileLayers.forEach(function (tileLayer) {
      let layer = map.createStaticLayer(tileLayer, tileset, 0, 0);
      layer.setCollisionByProperty({ collides: true });
      layers.push(layer);
    });
    scene.cameras.main.setBounds(0, 0, 1024, 1024);
    scene.physics.world.setBounds(0, 0, 1024, 1024);
    scene.cameras.main.roundPixels = true; // avoid tile bleed
    ret.push(layers)
    return ret;
  },

  /**
   * Adds the intersection of the player and tile layers.
   * @param {Phaser.Scene} scene the phaser scene.
   * @param {Phaser.Sprite} player the sprite representing the player.
   * @param {array<Phaser.TileMaps.StaticTilemapLayer} layers the tilemap layers.
   */
  addIntersectionWithLayers: function (scene, player, layers) {
    layers.forEach(function (layer) {
      scene.physics.add.collider(player, layer);
    });
  },

  /**
   * Creates a sprite at the object with the given name within the tilemap.
   * @param {Phaser.Scene} scene the phaser scene.
   * @param {Phaser.Map} map the phaser map.
   * @param {string} startTileName the name of the object position within Tiled.
   * TODO: Don't hardcode 'objects'.
   * @return {Phaser.Sprite} the added sprite.
   */
  createSpriteAtStartTileName: function (scene, map, startTileName) {
    let startTileInfo = map.findObject('objects', (obj) => { return obj.name == startTileName; });
    return scene.physics.add.sprite(startTileInfo.x, startTileInfo.y);
  },

  /**
   * Sets a new dialogue.
   * @param {Object} sceneVars the SceneVars type object at the top of _scene.js files. Assumes dialogue__array and
   *     dialogue__index are set.
   * @param {*} dialogueArray
   */
  setDialogueInSceneVars: function (sceneVars, dialogueArray) {
    sceneVars.dialogue__array = dialogueArray;
    sceneVars.dialogue__index = 0;
    Common.getDialogueScene().setTextObject(sceneVars);
  },

  /**
   * Returns whether two sprites are close enough to interact.
   * @param {Phaser.Sprite} sprite1
   * @param {Phaser.Sprite} sprite2
   */
  areSpritesInRangeToInteract: function (sprite1, sprite2) {
    return Math.sqrt(Math.pow(sprite1.x - sprite2.x, 2) + Math.pow(sprite1.y - sprite2.y, 2)) <
      Common.MAX_DISTANCE_FOR_SPRITE_INTERACTION;
  }
}