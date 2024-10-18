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
    const timeoutId = setTimeout(() => {
      dispatch(fetchCards(selectedGroupValue));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [selectedGroupValue]);

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
        <GameViewGrid>
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
  height: 90vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.jet_black};
  background: radial-gradient(circle, #2e313c 0%, #2b2929 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  @media (max-width: 700px) {
    padding-top: 1em;
  }
`;

const WonText = styled.h1`
  color: ${({ theme }) => theme.colors.jet_black};
  text-shadow: 1px 1px 0 white, -1px 1px 0 white, 1px -1px 0 white,
    -1px -1px 0 white;
  font-weight: 500;
  font-size: 2rem;
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
      transform: translate(-50%, -150%);
    }
  }
  @media (max-width: 325px) {
    font-size: 1.5rem;
  }
`;

const GameViewGrid = styled.div`
  display: grid;
  gap: 1em;
  transition: 0.6s ease-in;
  overflow-y: auto;
  padding: 1em 0;
  &::-webkit-scrollbar {
    display: none;
  }
  grid-template-columns: repeat(4, 100px);
  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 100px);
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 100px);
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
