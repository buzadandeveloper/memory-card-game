import { ThemeProvider } from "@emotion/react";
import { theme } from "./GlobalStyles/theme";
import { GlobalStyles } from "./GlobalStyles/GlobalStyles";
import { GameView } from "./components/GameView/GameView";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <GameView />
    </ThemeProvider>
  );
}

export default App;
