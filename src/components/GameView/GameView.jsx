import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SingleCard } from "../SingleCard/SingleCard";
import { NewGameButton } from "../NewGameButton/NewGameButton";
import { fetchCards, gameLogic } from "../../store/cards";

export const GameView = () => {
  const dispatch = useDispatch();
  const { cards, flippedCards, matchedCards, loading, initialLoading } =
    useSelector((state) => state.cards);
  const { turns, win, selectedCardValue, selectedGroupValue } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    dispatch(fetchCards());
  }, [selectedCardValue, selectedGroupValue]);

  const handleChoiceCard = (card, index) => {
    if (
      flippedCards.length < selectedCardValue &&
      !flippedCards.some((flippedCard) => flippedCard.index === index) &&
      !matchedCards.some((matchedCard) => matchedCard.id === card.id)
    ) {
      dispatch(gameLogic(card, index));
    }
  };

  return (
    <GameViewContainer>
      {(loading || initialLoading) && <LoadingSpinner className="loader" />}
      {win && <WonText>You Won !</WonText>}
      {!loading && !initialLoading && (
        <GameViewGrid
          className={
            selectedCardValue === 3 && selectedGroupValue === 5
              ? "c-3-g-5"
              : selectedCardValue === 3 && selectedGroupValue === 6
              ? "c-3-g-6"
              : "c-2"
          }
        >
          {cards.length > 0 &&
            cards.map((card, index) => (
              <SingleCard
                key={index}
                card={card}
                index={index}
                handleChoiceCard={handleChoiceCard}
              />
            ))}
        </GameViewGrid>
      )}
      <GameViewFooter>
        {!loading && !initialLoading && <TurnsText>Turns: {turns}</TurnsText>}
        {win && <NewGameButton />}
      </GameViewFooter>
    </GameViewContainer>
  );
};

const GameViewContainer = styled.div`
  height: 91vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.jet_black};
  background: radial-gradient(circle, #2e313c 0%, #2b2929 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const WonText = styled.h1`
  color: ${({ theme }) => theme.colors.jet_black};
  text-shadow: 1px 1px 0 white, -1px 1px 0 white, 1px -1px 0 white,
    -1px -1px 0 white;
  font-weight: 500;
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transition: 0.7s ease-in;
  animation: slideIn 1s ease forwards;
  @keyframes slideIn {
    0% {
      transform: translate(-50%, -300%);
    }
    100% {
      transform: translate(-50%, -230%);
    }
  }
`;

const GameViewGrid = styled.div`
  display: grid;
  gap: 1em;
  margin-bottom: 4em;
  transition: 0.6s ease-in;
  &.c-2 {
    grid-template-rows: repeat(3, 100px);
    grid-template-columns: repeat(4, 100px);
  }
  &.c-3-g-5 {
    grid-template-rows: repeat(2, 100px);
    grid-template-columns: repeat(5, 100px);
  }
  &.c-3-g-6 {
    grid-template-rows: repeat(4, 100px);
    grid-template-columns: repeat(6, 100px);
  }
`;

const TurnsText = styled.p`
  color: ${({ theme }) => theme.colors.light_grey};
  margin-top: 3em;
  margin-bottom: 1em;
`;

const GameViewFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 38%;
  left: 48%;
  transform: translate(-50%, -50%);
  &.loader {
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
