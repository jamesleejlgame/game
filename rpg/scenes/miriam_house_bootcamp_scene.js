import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class MiriamHouseBootcampScene extends RpgScene {
  constructor ()
  {
    super('MiriamHouseBootcampScene')
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'miriam_house3_tilemap',
      ['town_and_city_tileset'],
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      States.miriamHouseBootCamp,
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left')
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_left', true)
    this.homura_ = RpgUtils.createNPCCharacter(this, this.map_, 'homura', 'homura_down')
    this.stitch_ = RpgUtils.createNPCCharacter(this, this.map_, 'stitch', 'stitch_down')
    this.wimblebear_ = RpgUtils.createNPCCharacter(this, this.map_, 'wimblebear', 'wimble_down')
    this.hellokitty_ = RpgUtils.createNPCCharacter(this, this.map_, 'hellokitty', 'hellokitty_down')
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('PreDrMarioScene', {fadeIn: true}, true)
  }
}

export { MiriamHouseBootcampScene }