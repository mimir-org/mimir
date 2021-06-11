import { IsPartOfTerminal } from ".";
import { Node, Edge } from "../../../../models/project";
import red from "../../../../redux/store";

const IsChildOf = (childNode: Node, parentNode: Node) => {
  const edges = red.store.getState().projectState.project.edges as Edge[];
  const edge = edges.find(
    (x) => x.fromNode === parentNode?.id && x.toNode === childNode.id
  );

  const connector = parentNode?.connectors.find(
    (x) => x.id === edge?.fromConnector
  );

  return edge && IsPartOfTerminal(connector);
};

export default IsChildOf;
