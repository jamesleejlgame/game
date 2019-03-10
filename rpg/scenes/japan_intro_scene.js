import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class JapanIntroScene extends RpgScene {
  constructor ()
  {
    super('JapanIntroScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'tokyo_tilemap',
      'town_and_city_tileset',
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      [],
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_up');
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_down');
    super.setStates(States.japanIntro(this.miriam_, this.james_));
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('JapanHikeScene', {fadeIn: true}, true)
  }
}

export { JapanIntroScene };