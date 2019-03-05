import { Dialogue } from './rpg_dialogue.js'

/**
 * Each variable here is an array of objects which represent states for a given scene.
 *
 * Each object has the following keys:
 * @key {string} type the type of state. Currently could be 'timer', or 'dialogue'.
 * @key {number} time only present if the type is 'timer'. How long after the previous state to start the next one.
 * @key {RpgDialogue} dialogue {RpgDialogue} the dialogue.
 */
let States = {
  miriamHouseStates: [
    { type: 'timer', time: 2000 },
    { type: 'dialogue', dialogue: Dialogue.miriamChristinaMeetUp1 }
  ],
  christinaHouseStates: function(christina, james) {
    return [
      { type: 'player', target: christina},
      { type: 'dialogue', dialogue: Dialogue.miriamChristinaMeetUp2 },
      { type: 'npcMove', target: james, tweens: ['james_1', 'james_2', 'james_3', 'james_4'] },
      { type: 'dialogue', dialogue: Dialogue.miriamMeetsJames1 },
    ];
  }
}

export { States }
