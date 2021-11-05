import { Color } from "../../compLibrary";
import { LibItem, Node } from "../../models";
import { IsFunction, IsProduct, IsLocation } from "../../helpers";

const GetAspectColor = (node: Node | LibItem, isTransparent: boolean) => {
  if (isTransparent) {
    if (IsFunction(node)) return "rgba(251, 201, 19, 0.1)";
    if (IsProduct(node)) return "rgba(6, 144, 152, 0.1)";
    if (IsLocation(node)) return "rgba(163, 0, 167, 0.1)";
  }
  if (IsFunction(node)) return Color.FunctionMain;
  if (IsProduct(node)) return Color.ProductMain;
  if (IsLocation(node)) return Color.LocationMain;
};

export default GetAspectColor;
