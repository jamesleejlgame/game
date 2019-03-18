// TODO: Remove LICENSE from this after removing TingTing code.

import { RpgScene } from '../rpg/common/rpg_scene.js'
import { RpgUtils } from '../rpg/common/rpg_utils.js'
import { States } from '../rpg/data/rpg_states.js'

class EscapeRoomScene extends RpgScene {
  constructor ()
  {
    super('EscapeRoomScene')
    /**
     * Whether the popup scene is visible or not.
     */
    this.popupImageVisible_ = false
    /**
     * The popup scene.
     */
    this.popupImageScene_ = null
    /**
     * The piano scene.
     */
    this.pianoScene_ = null
  }

  /**
   * Creates the scene.
   * @param {Object} data an object that contains the keys:
   *   startingLocation {startingLocationEnum} the starting location of the miriam sprite.
   */
  create (data) {
    super.create(
      'escape_room_tilemap',
      ['town_and_city_tileset', 'chrono_trigger_interior', 'chrono_trigger_ruins'],
      ['base_tiles', 'tiles2'],
      'miriam_left', 'miriam_up', 'miriam_down',
      'miriam',
      States.escapeRoom,
      data)

    this.james_ = RpgUtils.createNPCCharacter(this, this.map_, 'james', 'james_down')
    this.popupImageVisible_ = false
    this.scene.launch('PopupImageScene', {callingClass: this})
    this.scene.moveAbove(this.sceneName_, 'PopupImageScene')
    this.scene.launch('PianoScene', {callingClass: this})
    this.scene.moveAbove(this.sceneName_, 'PianoScene')
    this.musicsheet_ = RpgUtils.findObjectByName(this.map_, 'musicsheet', '')
    this.grid_ = RpgUtils.findObjectByName(this.map_, 'grid', '')
    this.layout_ = RpgUtils.findObjectByName(this.map_, 'layout', '')
    this.clock_ = RpgUtils.findObjectByName(this.map_, 'clock', '')
    this.piano_ = RpgUtils.findObjectByName(this.map_, 'piano', '')
    this.monitor_ = RpgUtils.findObjectByName(this.map_, 'monitor', '')
  }

  update (time, delta) {
    super.update(time, delta)
    if (Phaser.Input.Keyboard.JustDown(this.actionKey_)) {
      if (RpgUtils.areSpritesInRangeToInteract(this.player_, this.grid_)) {
        this.popupImageScene_.togglePicture('escaperoom_grid')
      } else if (RpgUtils.areSpritesInRangeToInteract(this.player_, this.layout_)) {
        this.popupImageScene_.togglePicture('escaperoom_layout')
      } else if (RpgUtils.areSpritesInRangeToInteract(this.player_, this.musicsheet_)) {
        this.popupImageScene_.togglePicture('escaperoom_musicsheet')
      } else if (RpgUtils.areSpritesInRangeToInteract(this.player_, this.piano_)) {
        this.pianoScene_.toggle()
      } else {
        this.popupImageScene_.hidePicture()
      }
    }
  }

  /**
   * @override
   */
  advanceToNextScene () {
    this.switchScene('ProposalScene', {fadeIn: true}, true)
  }
}

export { EscapeRoomScene }