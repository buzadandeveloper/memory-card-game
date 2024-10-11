import * as actions from "./actionsType";
import { TIMEOUT_DURATION, TIMEOUT_FETCH_CARDS } from "../../config/constants";
import { fetchCryptoData } from "../../api/cryptoApi";
import { shuffleCards } from "../../utils/shuffleCards";
import { incrementTurns, gameWon, startNewGame } from "../game";

export const updateUnique = (uniqueCards) => {
  return { type: actions.UPDATE_UNIQUE, payload: uniqueCards };
};

export const fetchCards = (group) => {
  return async (dispatch, getState) => {
    const gameState = getState().game;
    const { selectedCardValue } = gameState;

    dispatch({ type: actions.FETCH_CARDS_REQUEST });

    setTimeout(async () => {
      try {
        let cards = await fetchCryptoData(group);
        const uniqueCards = [...cards];
        dispatch(updateUnique(uniqueCards));
        const shuffledCards = shuffleCards(uniqueCards, selectedCardValue);
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
  return (dispatch, getState) => {
    const gameState = getState().game;
    const { selectedGroupValue } = gameState;
    dispatch(flipReset());
    dispatch(startNewGame());
    setTimeout(() => {
      dispatch(fetchCards(selectedGroupValue));
    }, TIMEOUT_DURATION);
  };
};

export const updateCards = () => {
  return (dispatch, getState) => {
    const { cards, game } = getState();
    const { uniqueCards } = cards;
    const { selectedCardValue } = game;
    const reshuffleNewCards = shuffleCards(uniqueCards, selectedCardValue);
    dispatch({ type: actions.UPDATE_CARDS, payload: reshuffleNewCards });
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
