import { Dispatch } from "redux";
import { changeAttributeValue } from "../../../../../redux/store/project/actions";

const OnChangeParameterValue = (
  id: string,
  value: string,
  unit: string,
  nodeId: string,
  dispatch: Dispatch<any>
) => {
  dispatch(changeAttributeValue(id, value, unit, nodeId));
};

export default OnChangeParameterValue;
