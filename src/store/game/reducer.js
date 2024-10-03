import * as actions from "./actionsType";
const gameState = {
  isNewGame: false,
  turns: 0,
  win: false,
  bestTurns: 0,
};

const reducer = (state = gameState, action) => {
  switch (action.type) {
    case actions.NEW_GAME:
      return { ...state, isNewGame: true, turns: 0, win: false };
    case actions.INCREMENT_TURNS:
      return { ...state, turns: state.turns + 1 };
    case actions.GAME_WON:
      return { ...state, win: true, bestTurns: state.turns, turns: 0 };
    default:
      return state;
  }
};

export { reducer as gameReducer };
