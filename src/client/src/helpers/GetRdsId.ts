import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { IsFunction, IsLocation, IsProduct } from "./Aspects";
import { TextResources } from "../assets/text/TextResources";

export const GetRdsId = (node: Node) => {
  if (!node || !node.rds) return "";
  if (IsFunction(node)) return TextResources.RDS_FUNCTION + node.rds;
  if (IsProduct(node)) return TextResources.RDS_PRODUCT + node.rds;
  if (IsLocation(node)) return TextResources.RDS_LOCATION + node.rds;
};

export const GetRdsIdEdge = (edge: Edge) => {
  const element = edge.transport ?? edge.interface;

  if (!edge || !edge.fromNode || !element || !element.rds) return "";
  if (IsFunction(edge.fromNode)) return TextResources.RDS_FUNCTION + element.rds;
  if (IsProduct(edge.fromNode)) return TextResources.RDS_PRODUCT + element.rds;
  if (IsLocation(edge.fromNode)) return TextResources.RDS_LOCATION + element.rds;
};

export const GetRdsPrefix = (node: Node) => {
  if (!node) return "";
  if (IsFunction(node)) return TextResources.RDS_FUNCTION;
  if (IsProduct(node)) return TextResources.RDS_PRODUCT;
  if (IsLocation(node)) return TextResources.RDS_LOCATION;
};

export default GetRdsId;
