export const CHANGE_MENU = "CHANGE_MENU";

export interface ChangeMenu {
  type: typeof CHANGE_MENU;
  payload: {
    key: string;
    visible: boolean;
  };
}
