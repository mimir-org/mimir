import { Color } from "../../../../../compLibrary";
import { Aspect } from "../../../../../models";
import { IsFunction, IsLocation, IsProduct } from "../../helpers";

const GetBlockColor = (aspect: Aspect) => {
  let color = "";
  if (IsFunction(aspect)) {
    color = Color.Function;
  } else if (IsLocation(aspect)) {
    color = Color.Location;
  } else if (IsProduct(aspect)) {
    color = Color.Product;
  }
  return color;
};

export default GetBlockColor;
