import red from "../../../redux/store";
import { IsPartOfTerminal } from ".";
import { Node, Edge } from "../../../models";

/**
 * Component to check if one node is a child of another node.
 * @param childNode
 * @param parentNode
 * @returns a boolean value.
 */
const IsChildOf = (childNode: Node, parentNode: Node) => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  const edge = edges.find((e) => e.fromNodeId === parentNode?.id && e.toNodeId === childNode?.id);

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export default IsChildOf;
