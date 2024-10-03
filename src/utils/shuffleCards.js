export const shuffleCards = (cards) => {
  const deck = [...cards, ...cards].sort(() => Math.random() - 0.5);
  return deck;
};
