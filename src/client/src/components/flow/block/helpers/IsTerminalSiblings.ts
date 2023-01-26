import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { nodeService } from "../../../../services";

const IsTerminalSiblings = (from: Node, to: Node, edges: Edge[]): boolean => {
  if (from == null || to == null) return false;

  const fromParent = nodeService.getParentNodeId(from, edges);
  const toParent = nodeService.getParentNodeId(to, edges);

  if (fromParent === "" || toParent === "") return false;

  return fromParent === toParent;
};

export default IsTerminalSiblings;
