import * as actions from "./actionsType";
import { TIMEOUT_DURATION, TIMEOUT_FETCH_CARDS } from "../../config/constants";
import { fetchCryptoData } from "../../api/cryptoApi";
import { shuffleCards } from "../../utils/shuffleCards";
import { incrementTurns, gameWon, startNewGame } from "../game";

export const fetchCards = () => {
  return async (dispatch, getState) => {
    const gameState = getState().game;
    const { selectedCardValue, selectedGroupValue } = gameState;

    dispatch({ type: actions.FETCH_CARDS_REQUEST });

    setTimeout(async () => {
      try {
        let cards = await fetchCryptoData();
        const deck = cards.slice(0, selectedGroupValue);
        const shuffledCards = shuffleCards(deck, selectedCardValue);
        dispatch({ type: actions.FETCH_CARDS_SUCCESS, payload: shuffledCards });
      } catch (error) {
        dispatch({ type: actions.FETCH_CARDS_ERROR, payload: error.message });
      }
    }, TIMEOUT_FETCH_CARDS);
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

export const startGame = () => {
  return (dispatch) => {
    dispatch(flipReset());
    dispatch(startNewGame());
    setTimeout(() => {
      dispatch(fetchCards());
    }, TIMEOUT_DURATION);
  };
};

export const gameLogic = (card, index) => {
  return (dispatch, getState) => {
    const cardsState = getState().cards;
    const gameState = getState().game;
    const { cards, flippedCards, matchedCards } = cardsState;
    const { selectedCardValue } = gameState;
    dispatch(flipCard({ ...card, index }));
    if (flippedCards.length === selectedCardValue - 1) {
      dispatch(incrementTurns());
      const allMatch = flippedCards.every(
        (flippedCard) => flippedCard.id === card.id
      );
      if (allMatch) {
        dispatch(matchCards([...flippedCards, card]));
        if (matchedCards.length + selectedCardValue === cards.length) {
          dispatch(gameWon());
        }
      } else {
        setTimeout(() => {
          dispatch(flipReset());
        }, TIMEOUT_DURATION);
      }
    }
  };
};
