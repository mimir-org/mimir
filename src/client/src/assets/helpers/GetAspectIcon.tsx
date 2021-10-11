import * as Icons from "../../assets/icons/aspects";
import { Aspect, Node } from "../../models";

const GetAspectIcon = (node: Node): string => {
  if (node.aspect === Aspect.Function) return Icons.Function;
  if (node.aspect === Aspect.Product) return Icons.Product;
  if (node.aspect === Aspect.Location) return Icons.Location;
  return null;
};

export default GetAspectIcon;
