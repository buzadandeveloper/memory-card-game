import * as actions from "./actionsType";
import { dynamicData } from "../../utils/dynamicData";
import { produce } from "immer";
import { saveBestTurns, loadBestTurns } from "../../utils/localStorage";

const gameState = {
  isNewGame: false,
  turns: 0,
  win: false,
  bestTurns: loadBestTurns(2, 6),
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
        saveBestTurns(
          state.selectedCardValue,
          state.selectedGroupValue,
          updateBestTurns
        );
      });
    }
    case actions.CARD_VALUE: {
      const cardValue = action.payload;

      return produce(state, (draft) => {
        draft.selectedCardValue = cardValue;
        const newBestTurns = loadBestTurns(cardValue, state.selectedCardValue);
        draft.bestTurns = newBestTurns;
      });
    }
    case actions.GROUP_VALUE: {
      const groupValue = action.payload;

      return produce(state, (draft) => {
        draft.selectedGroupValue = groupValue;
        const newBestTurns = loadBestTurns(state.selectedCardValue, groupValue);
        draft.bestTurns = newBestTurns;
      });
    }
    default:
      return state;
  }
};

export { reducer as gameReducer };
