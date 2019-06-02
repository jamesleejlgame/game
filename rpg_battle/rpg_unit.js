class RpgUnit extends Phaser.GameObjects.Sprite {

  /**
   * @type {array<number>} the duration in milliseconds before the next attack for a unit at each level.
   */
  static DURATIONS_BEFORE_NEXT_ATTACK = [0, 2000, 4000, 6000, 8000]
  /**
   * @type {array<number>} the strength of an attack at each level.
   */
  static ATTACK_STRENGTH_PER_SECOND = [1, 1.5, 2, 2.5, 3]
  /**
   * @type {number} the duration in milliseconds before the next selection for a unit.
   */
  static DURATION_BEFORE_NEXT_ACTION_SELECTION = 4000

  static STATE = {
    WAIT_FOR_ACTION_SELECTION: 0,
    WAIT_FOR_ATTACK: 1,
    WAIT_FOR_CRIT: 2,
    UNCONSCIOUS: 3
  }

  static ATTACK_TYPE = {
    UNKNOWN: 0,
    ATTACK: 1,
    CRIT: 2
  }

  static ACTION_TYPE = {
    NONE: 0,
    ACTION_SELECTION: 1,
    ATTACK: 2
  }

  constructor (scene, id, x, y, rpgUnitSide, texture, type, hp, damage, hp_x_offset, hp_y_offset) {
    super(scene, x, y, texture, 0)
    this.id_ = id
    this.type_ = type
    this.hp_ = hp
    this.damage_ = damage
    this.rpgUnitSide_ = rpgUnitSide
    /**
     * @type {number} the duration in milliseconds before the next attack.
     */
    this.durationBeforeNextAttack_ = Number.MAX_SAFE_INTEGER
    /**
     * @type {number} the duration in milliseconds before the next action selection.
     */
    this.durationBeforeNextActionSelection_ = Number.MAX_SAFE_INTEGER
    this.hpDisplay_ = scene.add.text(x + hp_x_offset, y + hp_y_offset, this.hp_);
    /**
     * @type {STATE} the state of the unit.
     */
    this.state_ = null
    this.setStateToActionSelection()
    /**
     * @type {RpgUnit} the target unit of the attack.
     */
    this.target_ = null
    /**
     * @type {number} the level of the selected attack.
     */
    this.attackLevel_ = 0
    /**
     * @type {ATTACK_TYPE} the type of attack if this unit is attacking.
     */
    this.attackType_ = RpgUnit.ATTACK_TYPE.UNKNOWN
  }

  /**
   * Handles this taking damage.
   */
  receiveAttack (damage) {
    this.setHp(this.hp_ - damage)
  }

  setHp (hp) {
    this.hp_ = hp
    if (this.hp_ <= 0) {
      this.state_ = RpgUnit.UNCONSCIOUS
      this.hp_ = 0
    }
    this.hpDisplay_.setText(this.hp_)
  }

  /**
   * Handles this taking damage.
   */
  receiveCrit () {
    if (this.state_ == RpgUnit.UNCONSCIOUS) {
      return
    }
    this.setStateToActionSelection()
  }

  /**
   * Handles this unit selecting an action.
   */
  handleSelectAction (target) {
    this.state_ = RpgUnit.STATE.WAIT_FOR_ATTACK
    this.target_ = target
    this.attackLevel_ = 3
    this.attackType_ = RpgUnit.ATTACK_TYPE.ATTACK
    this.durationBeforeNextAttack_ = RpgUnit.DURATIONS_BEFORE_NEXT_ATTACK[this.attackLevel_]
  }

  /**
   * Handles this unit dealing a normal attack.
   */
  handleAttack () {
    let duration = RpgUnit.DURATIONS_BEFORE_NEXT_ATTACK[this.attackLevel_]
    let attackStrengthPerSecond = RpgUnit.ATTACK_STRENGTH_PER_SECOND[this.attackLevel_]
    let damage = duration / 1000 * attackStrengthPerSecond
    this.target_.receiveAttack(damage)
    this.setStateToActionSelection()
  }

  /**
   * Handles this unit dealing a critical attack.
   */
  handleCrit () {
    this.target_.receiveCrit()
    this.setStateToActionSelection()
  }

  setDurationBeforeNextAttack (duration) {
    this.durationBeforeNextAttack_ = duration
  }

  setDurationBeforeNextActionSelection (duration) {
    this.durationBeforeNextActionSelection_ = duration
  }

  setStateToActionSelection () {
    this.setDurationBeforeNextActionSelection(RpgUnit.DURATION_BEFORE_NEXT_ACTION_SELECTION)
    this.state_ = RpgUnit.STATE.WAIT_FOR_ACTION_SELECTION
  }

  handleTick (delta) {
    if (this.state_ == RpgUnit.STATE.WAIT_FOR_ACTION_SELECTION) {
      this.durationBeforeNextActionSelection_ -= delta
      if (this.durationBeforeNextActionSelection_ <= 0) {
        return RpgUnit.ACTION_TYPE.ACTION_SELECTION
      }
    } else if (this.state_ == RpgUnit.STATE.WAIT_FOR_ATTACK) {
      this.durationBeforeNextAttack_ -= delta
      if (this.durationBeforeNextAttack_ <= 0) {
        return RpgUnit.ACTION_TYPE.ATTACK
      }
    }
    return RpgUnit.ACTION_TYPE.NONE
  }
}

export { RpgUnit }
