import * as Icons from "../assets/icons/aspects";
import { IsFunction, IsLocation, IsProduct } from ".";
import { Node } from "../models";

const GetAspectIcon = (node: Node): string => {
  if (IsFunction(node)) return Icons.Function;
  if (IsProduct(node)) return Icons.Product;
  if (IsLocation(node)) return Icons.Location;
  return null;
};

export default GetAspectIcon;
