import * as Icons from "../../../../assets/icons/aspects";
import { IsFunction, IsLocation, IsProduct } from "../../../../helpers/Aspects";
import { Node } from "@mimirorg/modelbuilder-types";

const GetAspectIcon = (node: Node) => {
  if (IsFunction(node)) return Icons.Function;
  if (IsProduct(node)) return Icons.Product;
  if (IsLocation(node)) return Icons.Location;
  return null;
};

export default GetAspectIcon;
