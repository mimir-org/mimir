export const CHANGE_PROJECT_MENU = "CHANGE_PROJECT_MENU";

export interface ChangeProjectMenu {
  type: typeof CHANGE_PROJECT_MENU;
  payload: {
    key: string;
    visible: boolean;
  };
}
