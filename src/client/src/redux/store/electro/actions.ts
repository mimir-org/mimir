import { SET_ELECTRO_VIEW } from "./types";

export function setElectroView(visible: boolean) {
  return {
    type: SET_ELECTRO_VIEW,
    payload: {
      visible,
    },
  };
}
