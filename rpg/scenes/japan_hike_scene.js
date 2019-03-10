import { RpgScene } from '../common/rpg_scene.js';
import { RpgUtils } from '../common/rpg_utils.js'
import { States } from '../data/rpg_states.js'

class JapanHikeScene extends RpgScene {
  constructor ()
  {
    super('JapanHikeScene');
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'kyoto_tilemap',
      'town_and_city_tileset',
      ['base_tiles', 'tiles2'],
      null, null, null,
      null,
      [],
      data)
    this.miriam_ = RpgUtils.createNPCCharacter(this, this.map_, 'miriam', 'miriam_left', true);
    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_left', true);
    this.star_ = RpgUtils.createNPCCharacter(this, this.map_, 'star', 'shuriken');
    this.star_.setVisible(false);
    this.jiraiya_ = RpgUtils.createNPCCharacter(this, this.map_, 'jiraiya', 'jiraiya');
    this.jiraiya_.setVisible(false);
    super.setStates(States.japanHike(this.miriam_, this.james_, this.star_, this.jiraiya_));
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('PreOvercookedScene', {fadeIn: true}, true)
  }
}

export { JapanHikeScene };