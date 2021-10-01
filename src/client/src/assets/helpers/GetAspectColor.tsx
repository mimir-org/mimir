import { Color } from "../../compLibrary";
import { LibItem, Node } from "../../models";
import { IsFunction, IsProduct, IsLocation } from "../../components/flow/helpers/common";

const GetAspectColor = (node: Node | LibItem, isTransparent: boolean) => {
  if (isTransparent) {
    if (IsFunction(node)) return Color.FunctionHeader;
    if (IsProduct(node)) return Color.ProductHeader;
    if (IsLocation(node)) return Color.LocationHeader;
  }
  if (IsFunction(node)) return Color.FunctionBlock;
  if (IsProduct(node)) return Color.ProductBlock;
  if (IsLocation(node)) return Color.LocationBlock;
};

export default GetAspectColor;
