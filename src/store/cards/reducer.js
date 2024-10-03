import * as actions from "./actionsType";

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
    default:
      return state;
  }
};

export { reducer as cardsReducer };
