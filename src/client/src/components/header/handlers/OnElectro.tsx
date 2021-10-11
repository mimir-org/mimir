import { setElectroView } from "../../../redux/store/electro/actions";

const OnElectro = (dispatch: any, open: boolean) => {
  dispatch(setElectroView(!open));
};

export default OnElectro;
