class RpgUnit extends Phaser.GameObjects.Sprite {

  constructor (scene, id, x, y, texture, type, hp, damage, hp_x_offset, hp_y_offset) {
    super(scene, x, y, texture, 0)
    this.id_ = id
    this.type_ = type
    this.hp_ = hp
    this.damage_ = damage
    this.nextAttackTime_ = Number.MAX_SAFE_INTEGER
    this.nextSelectActionTime_ = Number.MAX_SAFE_INTEGER
    console.log(x + hp_x_offset)
    this.hpDisplay_ = scene.add.text(x + hp_x_offset, y + hp_y_offset, this.hp_);
  }

  takeDamage (damage) {
    this.hp_ -= damage
  }

  handleSelectAction () {

  }

  handleAttack () {
    
  }
}
  
export { RpgUnit }
