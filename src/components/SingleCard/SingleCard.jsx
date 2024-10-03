import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flipCard } from "../../store/cards/actions";

const SingleCardContainer = styled.div``;

const ImgaeCard = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const SingleCard = ({ card, index }) => {
  const dispatch = useDispatch();
  const { flippedCards } = useSelector((state) => state.cards);

  const handleChoiceCard = (card, index) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.some((flippedCard) => flippedCard.index === index)
    ) {
      dispatch(flipCard({ ...card, index }));
    }

    console.log(index);
  };

  useEffect(() => {
    console.log(flippedCards);
    if (flippedCards.length === 2) {
      if (flippedCards[0].id === flippedCards[1].id) {
        console.log("true");
      } else {
        console.log("false");
      }
    }
  }, [flippedCards]);

  return (
    <SingleCardContainer onClick={() => handleChoiceCard(card, index)}>
      <ImgaeCard src={card.image} />
    </SingleCardContainer>
  );
};
