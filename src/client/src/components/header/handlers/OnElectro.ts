import { toggleElectroView } from "../../../redux/store/electro/electroSlice";

/**
 * Function to toggle Electro mode on/off. In Electro mode termials are displayed vertically.
 * @param dispatch
 */
const OnElectro = (dispatch: any) => {
  dispatch(toggleElectroView());
};

export default OnElectro;
