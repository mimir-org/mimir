import { IsLocation, IsProduct, IsObjectBlock, IsTransport, IsInterface } from ".";
import { updateValue } from "../redux/actions";

const ResetRedux = (dispatch: any, key: string, value: any) => {
  if (key === "aspect" && IsLocation(value)) {
    dispatch(updateValue("terminalTypes", []));
    dispatch(updateValue("attributeTypes", []));
  }
  if (key === "aspect" && !IsLocation(value)) {
    dispatch(updateValue("locationType", ""));
    dispatch(updateValue("predefinedAttributes", []));
    dispatch(updateValue("attributeTypes", []));
  }
  if (key === "aspect" && !IsProduct(value)) {
    dispatch(updateValue("compositeTypes", []));
  }
  if (key === "objectType" && IsObjectBlock(value)) {
    dispatch(updateValue("terminalTypeId", ""));
  }
  if (key === "objectType" && (IsTransport(value) || IsInterface(value))) {
    dispatch(updateValue("terminalTypes", []));
  }
};

export default ResetRedux;
