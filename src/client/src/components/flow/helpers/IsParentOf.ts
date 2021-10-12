import { IsPartOfTerminal } from ".";
import { Node, Edge } from "../../../models";
import red from "../../../redux/store";

/**
 * Component to check if one node is a parent of another node.
 * @param childNode
 * @param parentNode
 * @returns a boolean value.
 */
const IsParentOf = (parentNode: Node, childNode: Node) => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  const edge = edges.find((e) => e.toNode.id === childNode?.id && e.fromNode.id === parentNode?.id);

  return edge && IsPartOfTerminal(edge.fromConnector);
};

export default IsParentOf;
