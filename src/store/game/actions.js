import * as actions from "./actionsType";

export const startNewGame = () => {
  return { type: actions.NEW_GAME };
};

export const incrementTurns = () => {
  return { type: actions.INCREMENT_TURNS };
};

export const gameWon = () => {
  return { type: actions.GAME_WON };
};

export const cardValue = (cardValue) => {
  return { type: actions.CARD_VALUE, payload: cardValue };
};

export const groupValue = (groupValue) => {
  return { type: actions.GROUP_VALUE, payload: groupValue };
};

export const cardChangeValue = (selectedCard) => {
  return (dispatch) => {
    dispatch(cardValue(Number(selectedCard)));
    dispatch(startNewGame());
  };
};

export const groupChangeValue = (selectedGroup) => {
  return (dispatch) => {
    dispatch(groupValue(Number(selectedGroup)));
    dispatch(startNewGame());
  };
};
