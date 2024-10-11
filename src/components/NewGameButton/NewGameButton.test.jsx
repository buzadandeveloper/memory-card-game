import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../GlobalStyles/theme";
import { NewGameButton } from "./NewGameButton";
import { useDispatch } from "react-redux";
import { startGame } from "../../store/cards";

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("../../store/cards", () => ({
  startGame: vi.fn(),
}));

describe("NewGameButton Component", () => {
  const mockDispatch = vi.fn();
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    render(
      <ThemeProvider theme={theme}>
        <NewGameButton />
      </ThemeProvider>
    );
  });
  it("renders the button with the correct text", () => {
    const buttonElement = screen.getByRole("button", { name: /new game/i });
    expect(buttonElement).toBeInTheDocument();
  });
  it("dispatches startGame when button is clicked", () => {
    const buttonElement = screen.getByRole("button", { name: /new game/i });
    fireEvent.click(buttonElement);
    expect(mockDispatch).toHaveBeenCalledWith(startGame());
  });
});
