/**
 * Holds information relevant to the MiriamHouse scene.
 */
Rpg.Scenes.SanFranciscoSceneVars = {
  /**
   * The possible miriam starting locations.
   */
  startingLocationEnum: {
    MIRIAM_HOUSE: 0,
    CHRISTINA_HOUSE: 1
  }
}

Rpg.Scenes.SanFranciscoScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function () {
    Phaser.Scene.call(this, { key: 'SanFranciscoScene' });
  },

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create: function (data) {
    let createMapRet = Rpg.Common.Utils.createMap(
      this,
      'san_francisco_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2']);
    let map = createMapRet[0];
    let layers = createMapRet[1];

    Rpg.Common.Utils.createMiriamAnimation(this, 'miriam_left', 'miriam_up', 'miriam_down');

    let miriamStartTileObjectName;
    if (data.startingLocation === Rpg.Scenes.SanFranciscoSceneVars.startingLocationEnum.MIRIAM_HOUSE) {
      miriamStartTileObjectName = "miriam_miriamhouse";
    } else if (data.startingLocation === Rpg.Scenes.SanFranciscoSceneVars.startingLocationEnum.CHRISTINA_HOUSE) {
      miriamStartTileObjectName = "miriam_christinahouse";
    }
    this.miriam_ = Rpg.Common.Utils.createPlayerControlledRpgCharacter(this, map, miriamStartTileObjectName, 'miriam_down');

    Rpg.Common.Utils.addIntersectionWithLayers(this, this.miriam_, layers);

    this.cursors_ = this.input.keyboard.createCursorKeys();
    let miriamHouse = Rpg.Common.Utils.createSpriteAtStartTileName(this, map, 'miriamhouse');
    let christinaHouse = Rpg.Common.Utils.createSpriteAtStartTileName(this, map, 'christinahouse');
    this.physics.add.overlap(this.miriam_, miriamHouse, (player, tile) => {this._overlapMiriamHouse();});
    this.physics.add.overlap(this.miriam_, christinaHouse, (player, tile) => {this._overlapChristinaHouse();});
  },

  update: function (time, delta) {
    Rpg.Common.Utils.updatePlayerAnimation(this, this.cursors_, this.miriam_, 'miriam_left', 'miriam_up', 'miriam_down');
  },

  _overlapMiriamHouse: function() {
    this.scene.start('MiriamHouseScene', {startingLocation: Rpg.Scenes.MiriamHouseSceneVars.startingLocationEnum.ENTER_DOOR});
  },

  _overlapChristinaHouse: function() {
    this.scene.start('ChristinaHouseScene');
  }
});
