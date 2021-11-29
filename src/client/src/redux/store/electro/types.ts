export const SET_ELECTRO_VIEW = "SET_ELECTRO_VIEW";

export interface SetElectroView {
  type: typeof SET_ELECTRO_VIEW;
  payload: {
    visible: boolean;
  };
}

export type ElectroViewActionTypes = SetElectroView;
