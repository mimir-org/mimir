import { setElectroView } from "../../../redux/store/electro/actions";

/**
 * Function to toggle Electro mode on/off. In Electro mode termials are displayed vertically.
 * @param dispatch
 * @param open
 */
const OnElectro = (dispatch: any, open: boolean) => {
  dispatch(setElectroView(!open));
};

export default OnElectro;
