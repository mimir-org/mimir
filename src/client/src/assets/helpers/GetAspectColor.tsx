import { Color } from "../../componentLibrary";
import { NodeType, NODE_TYPE } from "../../models/project";

const GetAspectColor = (node: NodeType): string => {
  if (node === NODE_TYPE.FUNCTION) return Color.FunctionTransparent;
  if (node === NODE_TYPE.PRODUCT) return Color.ProductTransparent;
  if (node === NODE_TYPE.LOCATION) return Color.LocationTransparent;
  if (node === NODE_TYPE.ASPECT_FUNCTION) return Color.FunctionTransparent;
  if (node === NODE_TYPE.ASPECT_PRODUCT) return Color.ProductTransparent;
  if (node === NODE_TYPE.ASPECT_LOCATION) return Color.LocationTransparent;
  return null;
};

export default GetAspectColor;
