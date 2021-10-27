import { Color } from "../../../../compLibrary";
import { IsFunction, IsLocation, IsProduct } from "../../helpers";

const GetStrokeColor = (node: any) => {
  if (IsFunction(node.data)) return Color.FunctionSelected;
  if (IsProduct(node.data)) return Color.ProductSelected;
  if (IsLocation(node.data)) return Color.LocationSelected;
};

export default GetStrokeColor;
