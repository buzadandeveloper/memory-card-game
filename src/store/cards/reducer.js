const cardsState = {
  cards: [],
  flippedCards: [],
  matchedCards: [],
  loading: false,
  error: null,
};

const reducer = (state = cardsState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export { reducer as cardsReducer };
