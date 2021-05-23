import { PROJECT_MENU_TYPE } from "../../../models/project";
import { CHANGE_PROJECT_MENU } from "./types";

const initialState = {
  menu: [
    {
      type: PROJECT_MENU_TYPE.MAIN_MENU,
      visible: false,
    },
    {
      type: PROJECT_MENU_TYPE.ACCOUNT_MENU,
      visible: false,
    },
    {
      type: PROJECT_MENU_TYPE.OPEN_PROJECT_MENU,
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
