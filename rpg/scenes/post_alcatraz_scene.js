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
    this.homura_ = RpgUtils.createNPCCharacter(this, this.map_, 'homura', 'homura_down');
    this.stitch_ = RpgUtils.createNPCCharacter(this, this.map_, 'stitch', 'stitch_down');
    this.wimblebear_ = RpgUtils.createNPCCharacter(this, this.map_, 'wimblebear', 'wimble_down');
    this.hellokitty_ = RpgUtils.createNPCCharacter(this, this.map_, 'hellokitty', 'hellokitty_down');
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('MiriamHouseBootcampScene', {fadeIn: true}, true)
  }
}

export { PostAlcatrazScene };