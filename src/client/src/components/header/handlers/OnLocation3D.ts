import { toggleLocation3D } from "../../../modules/location/redux/location3DSlice";

const OnLocation3D = (dispatch: any) => {
  dispatch(toggleLocation3D());
};

export default OnLocation3D;
