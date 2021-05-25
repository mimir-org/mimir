import { Node } from "../../models/project";
import {
  IsFunctionNode,
  IsLocationNode,
  IsProductNode,
} from "../../components/flow/helpers";

const GetRdsId = (node: Node): string => {
  if (!node || !node.rds) return "";
  if (IsFunctionNode(node)) return "=" + node.rds;
  if (IsProductNode(node)) return "-" + node.rds;
  if (IsLocationNode(node)) return "++" + node.rds;

  return "";
};

export default GetRdsId;
