import { combineReducers } from "redux";
import { cardsReducer } from "./cards/reducer";
import { gameReducer } from "./game/reducer";

export const rootReducer = combineReducers({
  cardsReducer,
  gameReducer,
});
