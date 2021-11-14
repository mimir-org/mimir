import { setLocation3D } from "../../../modules/location/redux/actions";

const OnLocation3D = (dispatch: any, active: boolean) => {
  console.log("test");
  dispatch(setLocation3D(!active));
};

export default OnLocation3D;
