import { Dialogue } from './rpg_dialogue.js'

/**
 * Each variable here is an array of objects which represent states for a given scene.
 *
 * Each object has the following keys:
 * @key {string} type the type of state. Currently could be 'timer', or 'dialogue'.
 * @key {number} time only present if the type is 'timer'. How long after the previous state to start the next one.
 * @key {Dialogue} dialogue {Dialogue} the dialogue.
 */
class States {
  static miriamHouseStates = [
    { type: 'timer', time: 1000 },
    { type: 'dialogue', dialogue: Dialogue.miriamChristinaMeetUp1 },
    { type: 'playerFreeMovement' }
  ]

  static sanFranciscoStates = [
    { type: 'playerFreeMovement' }
  ]

  static christinaHouseStates (christina, james) {
    return [
      { type: 'player', target: christina},
      { type: 'dialogue', dialogue: Dialogue.miriamChristinaMeetUp2 },
      { type: 'npcMove', target: james, tweens: ['james_1', 'james_2', 'james_3', 'james_4'] },
      { type: 'dialogue', dialogue: Dialogue.miriamMeetsJames1 },
      { type: 'npcMove', target: james, tweens: ['james_3', 'james_2', 'james_1', 'james_start'] },
      { type: 'dialogue', dialogue: Dialogue.miriamMeetsJames2 },
      { type: 'timer', time: 1000 },
    ];
  }

  static pubQuizStates = [
    { type: 'dialogue', dialogue: Dialogue.pubQuiz },
    { type: 'timer', time: 1000 },
  ];

  static christinaHouse2States (christina, james) {
    return [
      { type: 'dialogue', dialogue: Dialogue.miriamAsksChristinaToWedding},
      { type: 'player', target: james },
      { type: 'dialogue', dialogue: Dialogue.miriamAsksJamesToWedding }
    ];
  }

}

export { States }
