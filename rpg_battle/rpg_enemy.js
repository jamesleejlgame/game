import { RpgUnit } from "./rpg_unit.js";

class RpgEnemy extends RpgUnit {
  constructor (scene, id, x, y, rpgUnitSide, texture, type, hp, damage, hp_x_offset, hp_y_offset) {
    super(scene, id, x, y, rpgUnitSide, texture, type, hp, damage, hp_x_offset, hp_y_offset)
  }
}

export { RpgEnemy }
