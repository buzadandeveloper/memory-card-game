import styled from "@emotion/styled";

export const SingleCard = ({ card, index, handleChoiceCard }) => {
  return (
    <SingleCardContainer onClick={() => handleChoiceCard(card, index)}>
      <ImgaeCard src={card.image} />
    </SingleCardContainer>
  );
};

const SingleCardContainer = styled.div``;

const ImgaeCard = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;
