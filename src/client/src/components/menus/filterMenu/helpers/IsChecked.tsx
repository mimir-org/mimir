import { TextResources } from "../../../../assets/text";
import { Connector, Edge, Node, RelationType } from "../../../../models";
import { IsLocationTerminal, IsPartOfTerminal, IsTransportTerminal } from "../../../flow/helpers";

const IsChecked = (
  type: RelationType | string,
  edges: Edge[],
  conn: Connector,
  node: Node,
  name: string
) => {
  let edge: Edge;

  // Sort by category
  if (type === TextResources.Relations_Transport)
    edge = edges.find((x) => IsTransportTerminal(x.fromConnector));
  else if (type === TextResources.Relations_PartOf_Relationship)
    edge = edges.find((x) => IsPartOfTerminal(x.fromConnector));
  else if (type === TextResources.Aspect_Location)
    edge = edges.find((x) => IsLocationTerminal(x.fromConnector));
  // Sort by type
  else if (IsTransportTerminal(conn)) edge = edges.find((x) => x.fromConnector.name === name);
  else if (IsLocationTerminal(conn))
    edge = edges.find(
      (x) => x.fromNode.aspect === node?.aspect && IsLocationTerminal(x.fromConnector)
    );
  else if (IsPartOfTerminal(conn))
    edge = edges.find(
      (x) => x.fromNode.aspect === node?.aspect && IsPartOfTerminal(x.fromConnector)
    );

  return !edge?.isHidden;
};

export default IsChecked;
