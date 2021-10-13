export const SET_ELECTRO_VIEW = "SET_ELECTRO_VIEW";

export interface SetVerticalView {
  type: typeof SET_ELECTRO_VIEW;
  payload: {
    visible: boolean;
  };
}

export type ElectroViewActionTypes = SetVerticalView;
