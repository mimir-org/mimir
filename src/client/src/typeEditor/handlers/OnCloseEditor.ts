import { closeTypeEditor } from "../redux/actions";
const onCloseEditor = (dispatch: any) => {
  dispatch(closeTypeEditor());
};

export default onCloseEditor;
