import { useDispatch } from "react-redux";
import { startNewGame } from "../../store/game/actions";
import { fetchCards } from "../../store/cards/actions";
import styled from "@emotion/styled";

const Button = styled.button``;

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
