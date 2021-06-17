import { Color } from "../../compLibrary";
import { Node } from "../../models/project";
import {
  IsFunction,
  IsLocation,
  IsProduct,
} from "../../components/flow/helpers/common";

const GetMapColor = (node: Node): string => {
  if (IsFunction(node)) return Color.Function;
  if (IsProduct(node)) return Color.Product;
  if (IsLocation(node)) return Color.Location;
  return null;
};

export default GetMapColor;
