import * as actions from "./actionsType";
import { dynamicData } from "../../utils/dynamicData";
import { produce } from "immer";

const gameState = {
  isNewGame: false,
  turns: 0,
  win: false,
  bestTurns: 0,
  selectedCardValue: 2,
  selectedGroupValue: 6,
  groupDeck: dynamicData,
};

const reducer = (state = gameState, action) => {
  switch (action.type) {
    case actions.NEW_GAME:
      return produce(state, (draft) => {
        draft.isNewGame = true;
        draft.turns = 0;
        draft.win = false;
      });
    case actions.INCREMENT_TURNS:
      return produce(state, (draft) => {
        draft.turns = state.turns + 1;
      });
    case actions.GAME_WON: {
      const updateBestTurns =
        state.bestTurns === 0 || state.bestTurns > state.turns
          ? state.turns
          : state.bestTurns;
      return produce(state, (draft) => {
        draft.win = true;
        draft.bestTurns = updateBestTurns;
      });
    }
    case actions.CARD_VALUE: {
      return produce(state, (draft) => {
        draft.selectedCardValue = action.payload;
      });
    }
    case actions.GROUP_VALUE: {
      return produce(state, (draft) => {
        draft.selectedGroupValue = action.payload;
      });
    }
    default:
      return state;
  }
};

export { reducer as gameReducer };
