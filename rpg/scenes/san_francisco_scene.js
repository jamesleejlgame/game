import { MiriamHouseScene } from './miriam_house_scene.js'
import { RpgScene } from '../common/rpg_scene.js';

class SanFranciscoScene extends RpgScene {

  /**
   * The possible miriam starting locations.
   */
  static startingLocationEnum = {
    MIRIAM_HOUSE: 0,
    CHRISTINA_HOUSE: 1
  }

  constructor ()
  {
    super('SanFranciscoScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    let createMapRet = Rpg.Common.Utils.createMap(
      this,
      'san_francisco_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2']);
    let map = createMapRet[0];
    let layers = createMapRet[1];

    Rpg.Common.Utils.createMiriamAnimation(this, 'miriam_left', 'miriam_up', 'miriam_down');

    let miriamStartTileObjectName;
    if (data.startingLocation === SanFranciscoScene.startingLocationEnum.MIRIAM_HOUSE) {
      miriamStartTileObjectName = "miriam_miriamhouse";
    } else if (data.startingLocation === SanFranciscoScene.startingLocationEnum.CHRISTINA_HOUSE) {
      miriamStartTileObjectName = "miriam_christinahouse";
    }
    this.miriam_ = Rpg.Common.Utils.createPlayerControlledRpgCharacter(this, map, miriamStartTileObjectName, 'miriam_down');

    Rpg.Common.Utils.addIntersectionWithLayers(this, this.miriam_, layers);

    this.cursors_ = this.input.keyboard.createCursorKeys();
    let miriamHouse = Rpg.Common.Utils.createSpriteAtStartTileName(this, map, 'miriamhouse');
    let christinaHouse = Rpg.Common.Utils.createSpriteAtStartTileName(this, map, 'christinahouse');
    this.physics.add.overlap(this.miriam_, miriamHouse, (player, tile) => {this._overlapMiriamHouse();});
    this.physics.add.overlap(this.miriam_, christinaHouse, (player, tile) => {this._overlapChristinaHouse();});
    this.stateManager_.setStates([]);
  }

  _overlapMiriamHouse () {
    this.scene.start('MiriamHouseScene', {startingLocation: MiriamHouseScene.startingLocationEnum.ENTER_DOOR});
  }

  _overlapChristinaHouse () {
    this.scene.start('ChristinaHouseScene');
  }
}

export { SanFranciscoScene };