import * as actions from "./actionsType";
import * as actionsGame from "../game/actionsType";

const cardsState = {
  cards: [],
  flippedCards: [],
  matchedCards: [],
  loading: false,
  error: null,
};

const reducer = (state = cardsState, action) => {
  switch (action.type) {
    case actions.FETCH_CARDS_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.FETCH_CARDS_SUCCESS:
      return { ...state, loading: false, cards: action.payload };
    case actions.FETCH_CARDS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case actionsGame.NEW_GAME:
      return { ...state, flippedCards: [], matchedCards: [] };
    case actions.FLIP_CARD: {
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload],
      };
    }
    case actions.MATCHED_CARDS:
      return {
        ...state,
        matchedCards: [...state.matchedCards, ...action.payload],
        flippedCards: [],
      };
    case actions.FLIP_RESET:
      return { ...state, flippedCards: [] };
    default:
      return state;
  }
};

export { reducer as cardsReducer };
