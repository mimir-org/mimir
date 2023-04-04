import { Connectors } from "../blockParentNode/BlockParentNode";
import { AspectObject, Connector, ConnectorTerminal, ConnectorDirection } from "lib";

/**
 * Component to filter the connectors displayed on the nodes in BlockView.
 * Different node types allow different connector types.
 * @param connectors
 * @param selectedBlockNode
 * @param secondaryNode
 * @returns two filtered lists of connectors sorted by type, name and input/output.
 */
export const FilterConnectors = (connectors: Connector[], selectedBlockNode: AspectObject) => {
  const sortedConnectors = connectors
    ?.filter((c) => FilterConnector(selectedBlockNode, c))
    ?.sort((a, b) => a.name.localeCompare(b.name));

  const inputs =
    sortedConnectors?.filter(
      (t) =>
        t instanceof ConnectorTerminal &&
        (t.direction === ConnectorDirection.Input || t.direction === ConnectorDirection.Bidirectional)
    ) ?? [];
  const outputs =
    sortedConnectors?.filter(
      (t) =>
        t instanceof ConnectorTerminal &&
        (t.direction === ConnectorDirection.Output || t.direction === ConnectorDirection.Bidirectional)
    ) ?? [];

  return { inputs, outputs } as Connectors;
};

function FilterConnector(selectedNode: AspectObject, connector: Connector) {
  return connector instanceof ConnectorTerminal;
  // if (selectedNode.aspect === Aspect.Location) return IsLocationRelation(connector);
  // return IsTerminal(connector);
}
