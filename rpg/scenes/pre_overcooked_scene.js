import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class PreOvercookedScene extends RpgScene {
  constructor ()
  {
    super('PreOvercookedScene')
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'sunnyvale_house_tilemap',
      ['town_and_city_tileset'],
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      States.preOvercookedGame,
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left')
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_left', true)
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('MiriamCallsHomeopathScene', {fadeIn: true}, true)
  }
}

export { PreOvercookedScene }