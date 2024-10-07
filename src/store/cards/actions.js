import * as actions from "./actionsType";
import { fetchCryptoData } from "../../api/cryptoApi";
import { shuffleCards } from "../../utils/shuffleCards";

export const fetchCards = () => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_CARDS_REQUEST });
    setTimeout(async () => {
      try {
        let cards = await fetchCryptoData();
        cards = shuffleCards(cards);
        dispatch({ type: actions.FETCH_CARDS_SUCCESS, payload: cards });
      } catch (error) {
        dispatch({ type: actions.FETCH_CARDS_ERROR, payload: error.message });
      }
    }, 500);
  };
};

export const flipCard = (card) => {
  return { type: actions.FLIP_CARD, payload: card };
};

export const matchCards = (matchedCards) => {
  return { type: actions.MATCHED_CARDS, payload: matchedCards };
};

export const flipReset = () => {
  return { type: actions.FLIP_RESET };
};
