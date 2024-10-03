import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleCard } from "../SingleCard/SingleCard";
import { NewGameButton } from "../NewGameButton/NewGameButton";
import { flipCard, matchCards, flipReset } from "../../store/cards";
import { incrementTurns, gameWon } from "../../store/game";

export const GameView = () => {
  const dispatch = useDispatch();
  const { cards, loading, flippedCards, matchedCards } = useSelector(
    (state) => state.cards
  );
  const { turns, win, bestTurns } = useSelector((state) => state.game);

  const handleChoiceCard = (card, index) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.some((flippedCard) => flippedCard.index === index) &&
      !matchedCards.some((matchedCard) => matchedCard.id === card.id)
    ) {
      dispatch(flipCard({ ...card, index }));
    }
    console.log(index);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      dispatch(incrementTurns());
      if (flippedCards[0].id === flippedCards[1].id) {
        console.log("true");
        dispatch(matchCards([flippedCards[0], flippedCards[1]]));
      } else {
        setTimeout(() => {
          console.log("false");
          dispatch(flipReset());
        }, 1000);
      }
    }
  }, [flippedCards, dispatch]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      dispatch(gameWon());
    }
  }, [matchedCards, cards, dispatch]);

  return (
    <GameViewContainer>
      {loading && <h1>loading...</h1>}
      <GameViewGrid>
        {cards.map((card, index) => (
          <SingleCard
            key={index}
            card={card}
            index={index}
            handleChoiceCard={handleChoiceCard}
          />
        ))}
      </GameViewGrid>
      <NewGameButton />
      <h1>turns: {turns}</h1>
      <h1>best turns: {bestTurns}</h1>
      {win && <h1>You Won</h1>}
    </GameViewContainer>
  );
};

const GameViewContainer = styled.div`
  height: 100vh;
  width: 100%;
  background: rgb(160, 168, 207);
  background: radial-gradient(
    circle,
    rgba(160, 168, 207, 1) 0%,
    rgba(224, 223, 223, 1) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GameViewGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(4, 100px);
  gap: 1em;
  margin-bottom: 4em;
`;
