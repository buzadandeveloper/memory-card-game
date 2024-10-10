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
  return (dispatch, getState) => {
    const gameState = getState().game;
    const { groupDeck } = gameState;
    dispatch(cardValue(Number(selectedCard)));
    dispatch(startNewGame());
    const resetGroupValue = groupDeck.find(
      (group) => group.name === Number(selectedCard)
    );
    resetGroupValue && dispatch(groupValue(resetGroupValue.collection[0]));
  };
};

export const groupChangeValue = (selectedGroup) => {
  return (dispatch) => {
    dispatch(groupValue(Number(selectedGroup)));
    dispatch(startNewGame());
  };
};
