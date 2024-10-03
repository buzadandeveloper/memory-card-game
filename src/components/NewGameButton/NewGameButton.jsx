import { useDispatch } from "react-redux";
import { startNewGame } from "../../store/game";
import { fetchCards } from "../../store/cards";
import styled from "@emotion/styled";

export const NewGameButton = () => {
  const dispatch = useDispatch();
  const newGame = () => {
    dispatch(startNewGame());
    setTimeout(() => {
      dispatch(fetchCards());
    }, 2000);
  };

  return <Button onClick={newGame}>New Game</Button>;
};

const Button = styled.button``;
