import * as actions from "./actionsType";
const gameState = {
  isNewGame: false,
  turns: [],
};

const reducer = (state = gameState, action) => {
  switch (action.type) {
    case actions.NEW_GAME:
      return { ...state, isNewGame: true };
    default:
      return state;
  }
};

export { reducer as gameReducer };
