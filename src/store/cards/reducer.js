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
      return {
        ...state,
        loading: false,
        cards: action.payload.map((card) => ({
          ...card,
          isFlipped: false,
          isMatched: false,
        })),
      };
    case actions.FETCH_CARDS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case actionsGame.NEW_GAME:
      return { ...state, flippedCards: [], matchedCards: [] };
    case actions.FLIP_CARD: {
      const updatedCards = state.cards.map((card, index) => {
        return index === action.payload.index
          ? { ...card, isFlipped: true }
          : card;
      });
      return {
        ...state,
        cards: updatedCards,
        flippedCards: [...state.flippedCards, action.payload],
      };
    }
    case actions.MATCHED_CARDS: {
      const updatedCards = state.cards.map((card) =>
        action.payload.some((matchedCard) => matchedCard.id === card.id)
          ? { ...card, isMatched: true }
          : card
      );
      return {
        ...state,
        cards: updatedCards,
        matchedCards: [...state.matchedCards, ...action.payload],
        flippedCards: [],
      };
    }
    case actions.FLIP_RESET: {
      const updatedCards = state.cards.map((card) => {
        return card.isFlipped && !card.isMatched
          ? { ...card, isFlipped: false }
          : card;
      });
      return { ...state, cards: updatedCards, flippedCards: [] };
    }
    default:
      return state;
  }
};

export { reducer as cardsReducer };
