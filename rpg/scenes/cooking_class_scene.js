import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class CookingClassScene extends RpgScene {
  constructor ()
  {
    super('CookingClassScene')
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'cooking_class_tilemap',
      ['town_and_city_tileset'],
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      [],
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_up')
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_up')
    this.gaby_ = RpgUtils.createNPCCharacter(this, this.map_, 'gaby', 'gaby_down')
    super.setStates(States.cookingClass(this.gaby_))
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('JapanIntroScene', {fadeIn: true}, true)
  }
}

export { CookingClassScene }