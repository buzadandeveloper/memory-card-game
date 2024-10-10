import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { GroupDeck } from "../GroupDeck/GroupDeck";
export const BarGame = () => {
  const { bestTurns } = useSelector((state) => state.game);
  return (
    <BarGameContainer>
      <BarGameMenu>
        <TitleGame>CryptoMemoryGame</TitleGame>
        <GroupDeck />
      </BarGameMenu>
      <BestTurnsGame>Best turns: {bestTurns}</BestTurnsGame>
    </BarGameContainer>
  );
};

const BarGameContainer = styled.nav`
  height: 10vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.jet_black};
  background: radial-gradient(circle, #2b2c32 0%, #221f1f 100%);
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 375px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const TitleGame = styled.h1`
  color: ${({ theme }) => theme.colors.light_grey};
  font-size: 1.9rem;
  text-align: center;
  font-weight: 500;
  @media (max-width: 500px) {
    font-size: 1.4rem;
  }
`;
const BarGameMenu = styled.div`
  display: flex;
  gap: 3em;
  @media (max-width: 725px) {
    flex-direction: column;
    gap: 0;
  }
`;

const BestTurnsGame = styled.h2`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.light_grey};
  display: flex;
  align-items: center;
  @media (max-width: 375px) {
    font-weight: 600;
    font-size: 0.9rem;
  }
`;
