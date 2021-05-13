import { Color } from "../../componentLibrary";
import { NodeType, NODE_TYPE } from "../../models/project";

const GetAspectColor = (node: NodeType, isTransparent: boolean): string => {
  if (isTransparent) {
    if (node === NODE_TYPE.FUNCTION || node === NODE_TYPE.ASPECT_FUNCTION)
      return Color.FunctionTransparent;
    if (node === NODE_TYPE.PRODUCT || node === NODE_TYPE.ASPECT_PRODUCT)
      return Color.ProductTransparent;
    if (node === NODE_TYPE.LOCATION || node === NODE_TYPE.ASPECT_LOCATION)
      return Color.LocationTransparent;
  } else {
    if (node === NODE_TYPE.FUNCTION || node === NODE_TYPE.ASPECT_FUNCTION)
      return Color.Function;
    if (node === NODE_TYPE.PRODUCT || node === NODE_TYPE.ASPECT_PRODUCT)
      return Color.Product;
    if (node === NODE_TYPE.LOCATION || node === NODE_TYPE.ASPECT_LOCATION)
      return Color.Location;
  }
  return null;
};

export default GetAspectColor;
