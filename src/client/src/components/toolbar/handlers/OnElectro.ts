import { Dispatch } from "redux";
import { toggleElectroView } from "../../../redux/store/electro/electroSlice";

/**
 * Function to toggle Electro mode on/off. In Electro mode termials are displayed vertically.
 * @param dispatch
 */
export const OnElectro = (dispatch: Dispatch) => {
  dispatch(toggleElectroView());
};
