import { Color } from "../../../../../compLibrary";
import { Aspect } from "../../../../../models";
import { IsFunction, IsLocation, IsProduct } from "../../helpers";

const GetBlockColor = (aspect: Aspect) => {
  let color = "";
  if (IsFunction(aspect)) {
    color = Color.FunctionBlock;
  } else if (IsLocation(aspect)) {
    color = Color.LocationBlock;
  } else if (IsProduct(aspect)) {
    color = Color.ProductBlock;
  }
  return color;
};

export default GetBlockColor;
