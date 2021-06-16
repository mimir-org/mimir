import { Node } from "../../models/project";
import {
  IsFunction,
  IsLocation,
  IsProduct,
} from "../../components/flow/helpers/common";

const GetRdsId = (node: Node): string => {
  if (!node || !node.rds) return "";
  if (IsFunction(node)) return "=" + node.rds;
  if (IsProduct(node)) return "-" + node.rds;
  if (IsLocation(node)) return "++" + node.rds;

  return "";
};

export default GetRdsId;
