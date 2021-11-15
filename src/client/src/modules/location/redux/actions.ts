import { SET_LOCATION_3D } from "./types";

export function setLocation3D(active: boolean) {
  return {
    type: SET_LOCATION_3D,
    payload: {
      active,
    },
  };
}
