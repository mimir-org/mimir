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
    {
      type: PROJECT_MENU_TYPE.CREATE_PROJECT_MENU,
      visible: false,
    },
  ],
};

export function projectMenuReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PROJECT_MENU:
      return {
        ...state,
        menu: state.menu.map((menu) =>
          menu.type === action.payload.key
            ? {
                ...menu,
                visible: action.payload.visible,
              }
            : { ...menu }
        ),
      };
    default:
      return state;
  }
}
