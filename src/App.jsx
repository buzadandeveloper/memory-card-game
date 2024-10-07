import { ThemeProvider } from "@emotion/react";
import { theme } from "./GlobalStyles/theme";
import { GlobalStyles } from "./GlobalStyles/GlobalStyles";
import { GameView } from "./components/GameView/GameView";
import { BarGame } from "./components/BarGame/BarGame";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BarGame />
      <GameView />
    </ThemeProvider>
  );
}

export default App;
