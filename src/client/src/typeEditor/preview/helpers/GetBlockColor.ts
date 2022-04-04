import { Color } from "../../../compLibrary/colors/Color";
import { Aspect } from "../../../models";
import { IsFunction, IsLocation, IsProduct } from "../../helpers";

const GetBlockColor = (aspect: Aspect) => {
  let color = "";
  if (IsFunction(aspect)) {
    color = Color.LEMON_YELLOW;
  } else if (IsLocation(aspect)) {
    color = Color.MAGENTA;
  } else if (IsProduct(aspect)) {
    color = Color.ELECTRIC_BLUE;
  }
  return color;
};

export default GetBlockColor;
