import { MiriamHouseScene } from './miriam_house_scene.js'
import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'

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
    let miriamStartTileObjectName;
    if (data.startingLocation === SanFranciscoScene.startingLocationEnum.MIRIAM_HOUSE) {
      miriamStartTileObjectName = "miriam_miriamhouse";
    } else if (data.startingLocation === SanFranciscoScene.startingLocationEnum.CHRISTINA_HOUSE) {
      miriamStartTileObjectName = "miriam_christinahouse";
    }

    super.create(
      'san_francisco_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2'],
      'miriam_left', 'miriam_up', 'miriam_down',
      miriamStartTileObjectName,
      'SanFranciscoHouseScene',
      [])

    let miriamHouse = RpgUtils.createSpriteAtStartTileName(this, this.map_, 'miriamhouse');
    let christinaHouse = RpgUtils.createSpriteAtStartTileName(this, this.map_, 'christinahouse');
    this.physics.add.overlap(this.player_, miriamHouse, (player, tile) => {this._overlapMiriamHouse();});
    this.physics.add.overlap(this.player_, christinaHouse, (player, tile) => {this._overlapChristinaHouse();});
  }

  _overlapMiriamHouse () {
    this.scene.start('MiriamHouseScene', {startingLocation: MiriamHouseScene.startingLocationEnum.ENTER_DOOR});
  }

  _overlapChristinaHouse () {
    this.scene.start('ChristinaHouseScene');
  }
}

export { SanFranciscoScene };