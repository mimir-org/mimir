import { IsLocation, IsObjectBlock } from ".";
import { updateValue } from "../redux/actions";

const ResetRedux = (dispatch: any, key: string, value: any) => {
  if (key === "aspect" && IsLocation(value)) {
    dispatch(updateValue("terminalTypes", []));
    dispatch(updateValue("attributeTypes", []));
  }
  if (key === "aspect" && !IsLocation(value)) {
    dispatch(updateValue("locationType", ""));
    dispatch(updateValue("predefinedAttributes", []));
  }
  if (key === "objectType" && IsObjectBlock(value)) {
    dispatch(updateValue("terminalTypeId", ""));
  }
};

export default ResetRedux;
