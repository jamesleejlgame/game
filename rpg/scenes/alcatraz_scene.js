import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class AlcatrazScene extends RpgScene {
  constructor ()
  {
    super('AlcatrazScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'alcatraz_tilemap',
      'castle_tileset',
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      [],
      data)
    this.christina_ = RpgUtils.createNPCCharacter(this, this.map_, 'christina', 'christina_left', true);
    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left', true);
    super.setStates(States.alcatraz(this.christina_, this.james_));
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('JamesCallsMiriamScene', {fadeIn: true}, true)
  }
}

export { AlcatrazScene };