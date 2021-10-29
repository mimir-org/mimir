import { Color } from "../../../../compLibrary";
import { IsFunction, IsLocation, IsProduct } from "../../helpers";

const GetMapColor = (node: any) => {
  if (IsFunction(node.data)) return Color.FunctionHeader;
  if (IsProduct(node.data)) return Color.ProductHeader;
  if (IsLocation(node.data)) return Color.LocationHeader;
};

export default GetMapColor;
