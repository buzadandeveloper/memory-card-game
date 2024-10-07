import { useDispatch } from "react-redux";
import { startNewGame } from "../../store/game";
import { fetchCards, flipReset } from "../../store/cards";
import styled from "@emotion/styled";

export const NewGameButton = () => {
  const dispatch = useDispatch();
  const newGame = () => {
    dispatch(flipReset());
    dispatch(startNewGame());
    setTimeout(() => {
      dispatch(fetchCards());
    }, 1000);
  };

  return <Button onClick={newGame}>New Game</Button>;
};

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.jet_black};
  color: ${({ theme }) => theme.colors.light_grey};
  border: 1px solid white;
  cursor: pointer;
  padding: 0.4em;
  border-radius: 12px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.light_jet_black};
    transition: 0.3s ease;
  }
`;
