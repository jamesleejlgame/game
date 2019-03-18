import { RpgScene } from '../common/rpg_scene.js'
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class PubQuizScene extends RpgScene {
  constructor ()
  {
    super('PubQuizScene')
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'pub_quiz_tilemap',
      ['town_and_city_tileset'],
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      [],
      data)

    this.christina_ = RpgUtils.createNPCCharacter(this, this.map_, 'christina', 'christina_up')
    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left')
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_down')
    this.karen_ = RpgUtils.createNPCCharacter(this, this.map_, 'karen', 'karen_up')
    super.setStates(States.pubQuizStates(this.james_, this.miriam_))
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('ChristinaHouse2Scene', {fadeIn: true}, true)
  }
}

export { PubQuizScene }