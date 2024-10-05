import styled from "@emotion/styled";

export const SingleCard = ({ card, index, handleChoiceCard }) => {
  return (
    <SingleCardContainer onClick={() => handleChoiceCard(card, index)}>
      <CardInner className={card.isFlipped || card.isMatched ? "flipped" : ""}>
        <BackCard />
        <ImgaeCard src={card.image} />
      </CardInner>
    </SingleCardContainer>
  );
};

const SingleCardContainer = styled.div`
  width: 100px;
  height: 100px;
  cursor: pointer;
  perspective: 1000px;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  &.flipped {
    transform: rotateY(180deg);
  }
`;

const ImgaeCard = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;
  object-fit: cover;
  padding: 0.7em;
  backface-visibility: hidden;
  border: 1px solid white;
  border-radius: 12px;
  transform: rotateY(180deg);
`;

const BackCard = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.dark};
  border: 1px solid white;
  border-radius: 12px;
  backface-visibility: hidden;
`;
