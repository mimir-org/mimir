import { Color } from "../../../compLibrary";
import { Node } from "../../../models";
import { IsFunction, IsProduct, IsLocation } from "../../../components/flow/helpers";

const GetExplorerColor = (node: Node) => {
  if (IsFunction(node)) return Color.FunctionSelected;
  if (IsProduct(node)) return Color.ProductSelected;
  if (IsLocation(node)) return Color.LocationSelected;
};

export default GetExplorerColor;
