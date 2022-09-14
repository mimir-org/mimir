import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/Aspects";
import { Connectors } from "../blockParentNode/BlockParentNode";
import { Connector, Node } from "@mimirorg/modelbuilder-types";
import {
  IsBidirectionalTerminal,
  IsInputConnector,
  IsLocationRelation,
  IsOutputConnector,
  IsProductRelation,
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
export const FilterConnectors = (connectors: Connector[], selectedBlockNode: Node, secondaryNode: Node) => {
  const sortedConnectors = connectors
    ?.filter((c) => FilterConnector(selectedBlockNode, secondaryNode, c))
    ?.sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));

  const inputs = sortedConnectors?.filter((t) => IsInputConnector(t) || IsBidirectionalTerminal(t)) ?? [];
  const outputs = sortedConnectors?.filter((t) => IsOutputConnector(t) || IsBidirectionalTerminal(t)) ?? [];

  return { inputs, outputs } as Connectors;
};

function FilterConnector(selectedNode: Node, secondaryNode: Node, connector: Connector) {
  if (secondaryNode != null) return FilterSplitViewConnector(selectedNode, secondaryNode, connector);
  if (IsLocation(selectedNode)) return IsLocationRelation(connector);
  return IsTerminal(connector);
}

function FilterSplitViewConnector(selectedNode: Node, secondaryNode: Node, connector: Connector) {
  if (IsProduct(selectedNode)) {
    if (IsFunction(secondaryNode)) return IsProductRelation(connector);
    if (IsLocation(secondaryNode)) return IsLocationRelation(connector);
    if (IsProduct(secondaryNode)) return IsTerminal(connector);
  }

  if (IsFunction(selectedNode)) {
    if (IsFunction(secondaryNode)) return IsTerminal(connector);
    if (IsLocation(secondaryNode)) return IsLocationRelation(connector);
    if (IsProduct(secondaryNode)) return IsProductRelation(connector);
  }

  return IsLocationRelation(connector);
}
