export const deckSize = () => {
  return (getState) => {
    const gameState = getState().game;
    const { selectedCradValue, selectedGroupValue } = gameState;
    return selectedCradValue * selectedGroupValue;
  };
};
