import { Node } from "@mimirorg/modelbuilder-types";

const IsTerminalSiblings = (from: Node, to: Node): boolean => {
  return from?.parentNodeId === to?.parentNodeId;
};

export default IsTerminalSiblings;
