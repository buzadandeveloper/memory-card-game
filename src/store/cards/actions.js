import * as actions from "./actionsType";
import { fetchCryptoData } from "../../api/cryptoApi";
import { shuffleCards } from "../../utils/shuffleCards";

export const fetchCards = () => {
  return async (dispatch) => {
    dispatch({ type: actions.FETCH_CARDS_REQUEST });
    try {
      let cards = await fetchCryptoData();
      cards = shuffleCards(cards);
      dispatch({ type: actions.FETCH_CARDS_SUCCESS, payload: cards });
    } catch (error) {
      dispatch({ type: actions.FETCH_CARDS_ERROR, payload: error.message });
    }
  };
};

