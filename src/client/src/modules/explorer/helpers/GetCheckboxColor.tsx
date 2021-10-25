import { Color } from "../../../compLibrary";
import { IsLocation, IsProduct, IsFunction } from "../../../components/flow/helpers";
import { Node } from "../../../models";

const GetCheckboxColor = (node: Node) => {
  if (IsFunction(node)) return Color.FunctionSelected;
  if (IsLocation(node)) return Color.LocationSelected;
  if (IsProduct(node)) return Color.ProductSelected;
};

export default GetCheckboxColor;
