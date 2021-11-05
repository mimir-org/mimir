import { Node } from "../../models";
import { TextResources } from "../text";
import { IsFunction, IsLocation, IsProduct } from "../../helpers";

const GetRdsId = (node: Node): string => {
  if (!node || !node.rds) return "";
  if (IsFunction(node)) return TextResources.RDS_Function + node.rds;
  if (IsProduct(node)) return TextResources.RDS_Product + node.rds;
  if (IsLocation(node)) return TextResources.RDS_Location + node.rds;

  return "";
};

export default GetRdsId;
