import { setElectroView } from "../../../redux/store/electro/actions";

const OnElectro = (dispatch: any, open: boolean, treeView: boolean) => {
  if (!treeView) {
    dispatch(setElectroView(!open));
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
};

export default OnElectro;
