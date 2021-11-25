import { SetElectroView, SET_ELECTRO_VIEW } from "./types";

export function setElectroView(visible: boolean): SetElectroView {
  return {
    type: SET_ELECTRO_VIEW,
    payload: {
      visible,
    },
  };
}
