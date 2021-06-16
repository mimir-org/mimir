import { Color } from "../../compLibrary";
import { Node } from "../../models/project";
import {
  IsFunctionNode,
  IsLocationNode,
  IsProductNode,
} from "../../components/flow/helpers/common";

const GetMapColor = (node: Node): string => {
  if (IsFunctionNode(node)) return Color.Function;
  if (IsProductNode(node)) return Color.Product;
  if (IsLocationNode(node)) return Color.Location;
  return null;
};

export default GetMapColor;
