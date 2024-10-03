import styled from "@emotion/styled";

const SingleCardContainer = styled.div``;

const ImgaeCard = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const SingleCard = ({ card }) => {
  return (
    <SingleCardContainer>
      <ImgaeCard src={card.image} />
    </SingleCardContainer>
  );
};
