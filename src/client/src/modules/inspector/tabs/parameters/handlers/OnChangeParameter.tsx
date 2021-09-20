import { addEntityParameter, removeEntityParameter } from "../redux/actions";

const OnParameterChange = (
  nodeId: string,
  parameterId: string,
  selected: boolean,
  dispatch: any
) => {
  if (!selected) {
    dispatch(addEntityParameter(nodeId, parameterId));
  } else {
    dispatch(removeEntityParameter(nodeId, parameterId));
  }
};

export default OnParameterChange;
