import { LoadState } from "../localStorage/localStorage";
import { CHANGE_PROJECT_MENU } from "./types";

const initialState = {
  menu: [
    {
      type: "optionsMenu",
      visible: false,
    },
    {
      type: "openProjectMenu",
      visible: false,
    },
  ],
};

export function projectMenuReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PROJECT_MENU:
      return {
        ...state,
        menu: state.menu.map((x, i) =>
          state.menu[i].type === action.payload.key
            ? {
                ...x,
                visible: action.payload.visible,
              }
            : { ...x }
        ),
      };
    default:
      return state;
  }
}
