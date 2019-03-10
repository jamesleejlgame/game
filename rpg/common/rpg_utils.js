import { RpgConstants } from './constants.js'

class RpgUtils {
  // Non configurable.
  static OBJECT_LAYER_NAME = 'objects'

  /**
   * Run in the create function of a scene to create a map.
   * @param {Phaser.Scene} scene the phaser scene.
   * @param {string} tilemapName the name of the tilemap.
   * @param {string} tilesetName the name of the tilset.
   * @param {array<string>} tileLayers an array of layer names.
   * @returns [{Phaser.Map, {array<Phaser.Tilemaps.StaticTilemapLayer>}] all the phaser layers in the order passed in.
   */
  static createMap (scene, tilemapName, tilesetName, tileLayers) {
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
  }

  /**
   * Creates a player RPG style animation in the given scene.
   * @param {Phaser.Scene} scene the phaser scene.
   * @param {array<string>} animationNames the names of the animations.
   */
  static initializeAnimations (scene, animationNames) {
    animationNames.forEach((animationName) => {
      scene.anims.create({
        key: animationName,
        frames: scene.anims.generateFrameNumbers(animationName),
        frameRate: 10,
        repeat: -1
      });
    });
  }

  /**
   * Creates a playable rpg character.
   * @param {Phaser.Scene} scene the phaser scene we are creating on.
   * @param {Phaser.Map} map the phaser map.
   * @param {string} startTileObjectName the starting tile object name.
   * @param {string} spriteImageName the name of the sprite image as defined in boot_scene.js.
   * @returns {Phaser.Sprite} the sprite representing the controllable character. defines cursors_ on it.
   */
  static createPlayerControlledRpgCharacter (scene, map, startTileObjectName, spriteImageName) {
    let startTileInfo = RpgUtils.findObjectByName(map, startTileObjectName);
    let player = scene.physics.add.sprite(startTileInfo.x, startTileInfo.y, spriteImageName, 0);
    player.setSize(4, 4);
    player.setDepth(startTileInfo.y);
    player.setCollideWorldBounds(true);
    scene.cameras.main.startFollow(player);
    return player;
  }

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
  static updatePlayerAnimation (scene, cursors, player, player_left_anim_name, player_up_anim_name, player_down_anim_name) {
    if (!player) {
      return;
    }
    player.setVelocity(0);
    player.setDepth(player.y);

    if (cursors.left.isDown) {
      player.setVelocityX(-1 * RpgConstants.CHARACTER_SPEED);
    } else if (cursors.right.isDown) {
      player.setVelocityX(RpgConstants.CHARACTER_SPEED);
    }
    if (cursors.up.isDown) {
      player.setVelocityY(-1 * RpgConstants.CHARACTER_SPEED);
    } else if (cursors.down.isDown) {
      player.setVelocityY(RpgConstants.CHARACTER_SPEED);
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
  }

  /**
   * Adds the intersection of the player and tile layers.
   * @param {Phaser.Scene} scene the phaser scene.
   * @param {Phaser.Sprite} player the sprite representing the player.
   * @param {array<Phaser.TileMaps.StaticTilemapLayer} layers the tilemap layers.
   */
  static addIntersectionWithLayers (scene, player, layers) {
    layers.forEach(function (layer) {
      scene.physics.add.collider(player, layer);
    });
  }

  /**
   * Creates a sprite at the object with the given name within the tilemap.
   * @param {Phaser.Scene} scene the phaser scene.
   * @param {Phaser.Map} map the phaser map.
   * @param {string} startTileName the name of the object position within Tiled.
   * @return {Phaser.Sprite} the added sprite.
   */
  static createSpriteAtStartTileName (scene, map, startTileName) {
    let startTileInfo = RpgUtils.findObjectByName(map, startTileName);
    return scene.physics.add.sprite(startTileInfo.x, startTileInfo.y);
  }

  /**
   * Finds the objects in a tilemap by the given name. (In the 'objects' layer)
   * @param {string} name the name of the object.
   * @return {Phaser.GameObjects.GameObject} the object.
   */
  static findObjectByName (map, name) {
    return map.findObject(RpgUtils.OBJECT_LAYER_NAME, (obj) => { return obj.name == name; });
  }

  /**
   * Creates an npc character.
   * @param {Phaser.Scene} scene the phaser scene we are creating on.
   * @param {Phaser.Map} map the phaser map.
   * @param {string} startTileObjectName the starting tile object name.
   * @param {string} spriteImageName the name of the sprite image as defined in boot_scene.js.
   * @param {boolean?} flipX whether or not to flip the x axis of the sprite.
   * @returns {Phaser.Sprite} the sprite representing the controllable character. defines cursors_ on it.
   */
  static createNPCCharacter (scene, map, startTileObjectName, spriteImageName, flipX) {
    let startTileInfo = RpgUtils.findObjectByName(map, startTileObjectName);
    let npc = scene.physics.add.sprite(startTileInfo.x, startTileInfo.y, spriteImageName, 0);
    npc.setImmovable(true);
    npc.setDepth(startTileInfo.y);
    if (flipX) {
      npc.setFlipX(true);
    }
    return npc;
  }

  /**
   * Returns whether two sprites are close enough to interact.
   * @param {Phaser.Sprite} sprite1 the first sprite.
   * @param {Phaser.Sprite} sprite2 the second sprite.
   */
  static areSpritesInRangeToInteract (sprite1, sprite2) {
    return RpgUtils.distanceBetweenCoordinates(sprite1.x, sprite1.y, sprite2.x, sprite2.y) <
    RpgConstants.MAX_DISTANCE_FOR_SPRITE_INTERACTION;
  }

  /**
   * Returns the distance between two coordinates.
   * @param {number} x1 the first x coordinate.
   * @param {number} y1 the first y coordinate.
   * @param {number} x2 the second x coordinate.
   * @param {number} y2 the second y coordinate.
   */
  static distanceBetweenCoordinates (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}

export { RpgUtils }
