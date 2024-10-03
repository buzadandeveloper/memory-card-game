import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SingleCard } from "../SingleCard/SingleCard";

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

export const GameView = () => {
  const { cards, loading } = useSelector((state) => state.cards);

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  return (
    <GameViewContainer>
      {loading && <h1>loading...</h1>}
      <GameViewGrid>
        {cards.map((card, index) => (
          <SingleCard key={index} card={card} index={index} />
        ))}
      </GameViewGrid>
    </GameViewContainer>
  );
};
