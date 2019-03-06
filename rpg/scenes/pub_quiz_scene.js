import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class PubQuizScene extends RpgScene {
  constructor ()
  {
    super('PubQuizScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'pub_quiz_tilemap',
      'town_and_city_tileset',
      ['tiles1', 'tiles2'],
      'miriam_left', 'miriam_up', 'miriam_down',
      'miriam',
      'PubQuizScene',
      States.pubQuizStates)

    this.christina_ = RpgUtils.createNPCCharacter(this, this.map_, 'christina', 'christina_up');
    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left');
    this.karen_ = RpgUtils.createNPCCharacter(this, this.map_, 'karen', 'karen_up');
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.scene.stop('DialogueScene');
    this.scene.start('ChristinaHouse2Scene');
  }
}

export { PubQuizScene };