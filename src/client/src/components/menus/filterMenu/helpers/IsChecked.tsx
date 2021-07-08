import { Connector, Edge, Node, RelationType } from "../../../../models";
import {
  IsLocationTerminal,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../../../flow/helpers/common";

const IsChecked = (
  type: RelationType | string,
  edges: Edge[],
  conn: Connector,
  node: Node,
  name: string
) => {
  let edge: Edge;

  if (type === "Transport")
    edge = edges.find((edge) => IsTransportTerminal(edge.fromConnector));
  else if (type === "Part of Relationship")
    edge = edges.find((edge) => IsPartOfTerminal(edge.fromConnector));
  else if (IsTransportTerminal(conn))
    edge = edges.find((edge) => edge.fromConnector.name === name);
  else if (IsLocationTerminal(conn))
    edge = edges.find((edge) => IsLocationTerminal(edge.fromConnector));
  else if (IsPartOfTerminal(conn))
    edge = edges.find(
      (edge) =>
        edge.fromNode.aspect === node?.aspect &&
        IsPartOfTerminal(edge.fromConnector)
    );

  return !edge?.isHidden;
};

export default IsChecked;
