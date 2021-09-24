import red from "../../../../redux/store";
import { IsPartOfTerminal } from ".";
import { Node, Edge } from "../../../../models";

/** Component to check if one node is a child of another node.
 *  The parameters are the potenial child node and the potenial parent node.
 *  IsChildOf returns a boolean value.
 */
const IsChildOf = (childNode: Node, parentNode: Node) => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  const edge = edges.find(
    (x) => x.fromNodeId === parentNode?.id && x.toNodeId === childNode?.id
  );

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export default IsChildOf;
