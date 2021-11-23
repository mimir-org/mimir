import { Edge, Node } from "../models";
import { IsFunction, IsLocation, IsProduct } from "../helpers";
import { TextResources } from "../assets/text";

export const GetRdsId = (node: Node): string => {
  if (!node || !node.rds) return "";
  if (IsFunction(node)) return TextResources.RDS_Function + node.rds;
  if (IsProduct(node)) return TextResources.RDS_Product + node.rds;
  if (IsLocation(node)) return TextResources.RDS_Location + node.rds;

  return "";
};

export const GetRdsIdEdge = (edge: Edge): string => {
  const element = edge.transport ?? edge.interface;

  if (!edge || !edge.fromNode || !element || !element.rds) return "";

  if (IsFunction(edge.fromNode)) return TextResources.RDS_Function + element.rds;
  if (IsProduct(edge.fromNode)) return TextResources.RDS_Product + element.rds;
  if (IsLocation(edge.fromNode)) return TextResources.RDS_Location + element.rds;
};

export default GetRdsId;
