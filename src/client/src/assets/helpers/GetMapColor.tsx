import { Color } from "../../componentLibrary";
import { NodeType, NODE_TYPE } from "../../models/project";

const GetMapColor = (node: NodeType): string => {
  if (node === NODE_TYPE.FUNCTION || node === NODE_TYPE.ASPECT_FUNCTION)
    return Color.Function;
  if (node === NODE_TYPE.PRODUCT || node === NODE_TYPE.ASPECT_PRODUCT)
    return Color.Product;
  if (node === NODE_TYPE.LOCATION || node === NODE_TYPE.ASPECT_LOCATION)
    return Color.Location;
  return null;
};

export default GetMapColor;
