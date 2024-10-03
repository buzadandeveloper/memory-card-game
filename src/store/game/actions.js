import * as actions from "./actionsType";

export const startNewGame = () => {
  return { type: actions.NEW_GAME };
};

export const incrementTurns = () => {
  return { type: actions.INCREMENT_TURNS };
};

export const gameWon = () => {
  return { type: actions.GAME_WON };
};
