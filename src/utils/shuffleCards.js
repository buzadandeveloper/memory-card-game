export const shuffleCards = (cards, selectedCardValue) => {
  let deck = [];
  for (let i = 0; i < selectedCardValue; i++) {
    deck = [...deck, ...cards];
  }
  deck.sort(() => Math.random() - 0.5);
  return deck;
};
