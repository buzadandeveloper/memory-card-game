import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { GroupDeck } from "../GroupDeck/GroupDeck";
export const BarGame = () => {
  const { bestTurns } = useSelector((state) => state.game);
  return (
    <BarGameContainer>
      <TitleGame>CryptoMemoryGame</TitleGame>
      <BarGameMenu>
        <BestTurnsGame>Best turns: {bestTurns}</BestTurnsGame>
        <GroupDeck />
      </BarGameMenu>
    </BarGameContainer>
  );
};

const BarGameContainer = styled.nav`
  height: 9vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.jet_black};
  background: radial-gradient(circle, #2b2c32 0%, #221f1f 100%);
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const TitleGame = styled.h1`
  color: ${({ theme }) => theme.colors.light_grey};
  font-size: 1.9rem;
  text-align: center;
  font-weight: 500;
`;
const BarGameMenu = styled.div`
  display: flex;
  gap: 3em;
`;

const BestTurnsGame = styled.h2`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.light_grey};
`;
