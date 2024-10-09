import * as actions from "./actionsType";
import * as actionsGame from "../game/actionsType";
import { produce } from "immer";

const cardsState = {
  cards: [],
  flippedCards: [],
  matchedCards: [],
  loading: false,
  initialLoading: true,
  error: null,
};

const reducer = (state = cardsState, action) => {
  switch (action.type) {
    case actions.FETCH_CARDS_REQUEST:
      return produce(state, (draft) => {
        draft.loading = !draft.initialLoading;
        draft.error = null;
      });
    case actions.FETCH_CARDS_SUCCESS:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.initialLoading = false;
        draft.cards = action.payload.map((card) => ({
          ...card,
          isFlipped: false,
          isMatched: false,
        }));
      });
    case actions.FETCH_CARDS_ERROR:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.initialLoading = false;
        draft.error = action.payload;
      });
    case actionsGame.NEW_GAME:
      return produce(state, (draft) => {
        draft.flippedCards = [];
        draft.matchedCards = [];
      });
    case actions.FLIP_CARD: {
      return produce(state, (draft) => {
        draft.cards[action.payload.index].isFlipped = true;
        draft.flippedCards.push(action.payload);
      });
    }
    case actions.MATCHED_CARDS: {
      return produce(state, (draft) => {
        draft.cards.forEach((card) => {
          if (
            action.payload.some((matchedCard) => matchedCard.id === card.id)
          ) {
            card.isMatched = true;
          }
        });
        draft.matchedCards.push(...action.payload);
        draft.flippedCards = [];
      });
    }
    case actions.FLIP_RESET: {
      return produce(state, (draft) => {
        draft.cards.forEach((card) => {
          if (card.isFlipped && !card.isMatched) {
            card.isFlipped = false;
          }
        });
        draft.flippedCards = [];
      });
    }
    case actions.CHANGE_CARD_GROUP_REQUEST: {
      return produce(state, (draft) => {
        draft.loading = true;
      });
    }
    case actions.CHANGE_CARD_GROUP_SUCCESS: {
      return produce(state, (draft) => {
        draft.loading = false;
      });
    }
    default:
      return state;
  }
};

export { reducer as cardsReducer };
