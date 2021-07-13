import { MENU_TYPE } from "../../../models/project";
import { CHANGE_MENU, MenuActionTypes } from "./types";

const initialState = {
  list: [
    {
      type: MENU_TYPE.MAIN_MENU,
      visible: false,
    },
    {
      type: MENU_TYPE.ACCOUNT_MENU,
      visible: false,
    },
    {
      type: MENU_TYPE.OPEN_PROJECT_MENU,
      visible: false,
    },
    {
      type: MENU_TYPE.CREATE_PROJECT_MENU,
      visible: false,
    },
    {
      type: MENU_TYPE.VISUAL_FILTER_MENU,
      visible: false,
    },
    {
      type: MENU_TYPE.SAVE_PROJECT_FILE_MENU,
      visible: false,
    },
    {
      type: MENU_TYPE.IMPORT_PROJECT_FILE_MENU,
      visible: false,
    },
    {
      type: MENU_TYPE.SAVE_LIBRARY_FILE_MENU,
      visible: false,
    },
    {
      type: MENU_TYPE.IMPORT_LIBRARY_FILE_MENU,
      visible: false,
    },
  ],
};

export function menuReducer(state = initialState, action: MenuActionTypes) {
  if (action.type === CHANGE_MENU) {
    return {
      ...state,
      list: state.list.map((menu) =>
        menu.type === action.payload.key
          ? {
              ...menu,
              visible: action.payload.visible,
            }
          : { ...menu }
      ),
    };
  }
  return state;
}
