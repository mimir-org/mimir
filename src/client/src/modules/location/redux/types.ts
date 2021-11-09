export const SET_LOCATION_3D = "SET_LOCATION_3D";

export interface SetLocation3D {
  type: typeof SET_LOCATION_3D;
  payload: {
    active: boolean;
  };
}

export type Location3DActionTypes = SetLocation3D;
