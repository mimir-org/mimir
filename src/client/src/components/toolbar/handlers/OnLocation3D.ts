import { Dispatch } from "redux";
import { toggleLocation3D } from "../../../modules/location/redux/location3DSlice";

export const OnLocation3D = (dispatch: Dispatch) => {
  dispatch(toggleLocation3D());
};
