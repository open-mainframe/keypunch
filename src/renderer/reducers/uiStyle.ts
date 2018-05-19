import { SET_COLOR, SET_THEME_DARK, SET_THEME_LIGHT } from "../constants";

const initialUiStyleState = {
  color: "cc7f29",
  theme: "dark"
};

export default function uiStyle(state = initialUiStyleState, action) {
  const newState = { ...state };

  switch (action.type) {
    case SET_THEME_DARK:
      newState.theme = "dark";
      break;
    case SET_THEME_LIGHT:
      newState.theme = "light";
      break;
    case SET_COLOR:
      newState.color = action.color;
      break;
    default:
      return state;
  }
  return newState;
}
