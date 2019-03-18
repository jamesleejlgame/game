import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class JamesCallsMiriamScene extends RpgScene {
  constructor ()
  {
    super('JamesCallsMiriamScene')
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'miriam_house2_tilemap',
      ['town_and_city_tileset'],
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      [],
      data)

    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_down')
    this.homura_ = RpgUtils.createNPCCharacter(this, this.map_, 'homura', 'homura_down')
    this.stitch_ = RpgUtils.createNPCCharacter(this, this.map_, 'stitch', 'stitch_down')
    this.wimblebear_ = RpgUtils.createNPCCharacter(this, this.map_, 'wimblebear', 'wimble_down')
    this.hellokitty_ = RpgUtils.createNPCCharacter(this, this.map_, 'hellokitty', 'hellokitty_down')
    super.setStates(States.jamesCallsMiriamFromAlcatraz(this.miriam_))
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('PostAlcatrazScene', {fadeIn: true}, true)
  }
}

export { JamesCallsMiriamScene }