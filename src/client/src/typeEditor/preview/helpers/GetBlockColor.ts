import { Color } from "../../../compLibrary/colors";
import { Aspect } from "../../../models";
import { IsFunction, IsLocation, IsProduct } from "../../helpers";

const GetBlockColor = (aspect: Aspect) => {
  let color = "";
  if (IsFunction(aspect)) {
    color = Color.FUNCTION_MAIN;
  } else if (IsLocation(aspect)) {
    color = Color.LOCATION_MAIN;
  } else if (IsProduct(aspect)) {
    color = Color.PRODUCT_MAIN;
  }
  return color;
};

export default GetBlockColor;
