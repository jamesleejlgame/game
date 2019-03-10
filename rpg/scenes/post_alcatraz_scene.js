import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class PostAlcatrazScene extends RpgScene {
  constructor ()
  {
    super('PostAlcatrazScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'alcatraz2_tilemap',
      'castle_tileset',
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      States.postAlcatraz,
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_up');
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_up');
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('MiriamHouseBootcampScene', {fadeIn: true}, true)
  }
}

export { PostAlcatrazScene };