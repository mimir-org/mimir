import { Color } from "../../compLibrary";
import { Node } from "../../models";
import {
  IsFunction,
  IsLocation,
  IsProduct,
} from "../../components/flow/helpers/common";

const GetMapColor = (node: Node): string => {
  if (IsFunction(node)) return Color.FunctionBlock;
  if (IsProduct(node)) return Color.ProductBlock;
  if (IsLocation(node)) return Color.LocationBlock;
  return null;
};

export default GetMapColor;
