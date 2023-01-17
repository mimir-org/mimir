import { IsLocation } from "../../../../../helpers/Aspects";
import { Connectors } from "../blockParentNode/BlockParentNode";
import { Connector, Node } from "@mimirorg/modelbuilder-types";
import {
  IsBidirectionalTerminal,
  IsInputConnector,
  IsLocationRelation,
  IsOutputConnector,
  IsPartOfRelation,
  IsTerminal,
} from "../../../helpers/Connectors";

/**
 * Component to filter the connectors displayed on the nodes in BlockView.
 * Different node types allow different connector types.
 * @param connectors
 * @param selectedBlockNode
 * @param secondaryNode
 * @returns two filtered lists of connectors sorted by type, name and input/output.
 */
export const FilterConnectors = (connectors: Connector[], selectedBlockNode: Node) => {
  const sortedConnectors = connectors
    ?.filter((c) => FilterConnector(selectedBlockNode, c))
    ?.sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));

  const inputs =
    sortedConnectors?.filter((t) => !IsPartOfRelation(t) && (IsInputConnector(t) || IsBidirectionalTerminal(t))) ?? [];
  const outputs =
    sortedConnectors?.filter((t) => !IsPartOfRelation(t) && (IsOutputConnector(t) || IsBidirectionalTerminal(t))) ?? [];

  return { inputs, outputs } as Connectors;
};

function FilterConnector(selectedNode: Node, connector: Connector) {
  if (IsLocation(selectedNode)) return IsLocationRelation(connector);
  return IsTerminal(connector);
}
