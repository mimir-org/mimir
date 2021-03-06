import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/Aspects";
import { Connector, Node } from "../../../../../models";
import { Terminals } from "../blockParentNode/BlockParentNode";
import {
  IsBidirectionalTerminal,
  IsInputTerminal,
  IsLocationTerminal,
  IsOutputTerminal,
  IsPartOfTerminal,
  IsProductTerminal,
  IsTransport,
} from "../../../helpers/Connectors";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * Different node types allow different terminal types.
 * @param connectors
 * @param selectedBlockNode
 * @param secondaryNode
 * @returns two filtered lists of connectors sorted by type, name and input/output.
 */
export const FilterTerminals = (connectors: Connector[], selectedBlockNode: Node, secondaryNode: Node) => {
  const sortedConnectors = connectors
    ?.filter((c) => FilterTerminal(selectedBlockNode, secondaryNode, c))
    ?.sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));

  const inputs = sortedConnectors?.filter((t) => IsInputTerminal(t) || IsBidirectionalTerminal(t)) ?? [];
  const outputs = sortedConnectors?.filter((t) => IsOutputTerminal(t) || IsBidirectionalTerminal(t)) ?? [];

  return { inputs, outputs } as Terminals;
};

function FilterTerminal(selectedNode: Node, secondaryNode: Node, connector: Connector) {
  if (secondaryNode != null) return FilterSplitViewTerminal(selectedNode, secondaryNode, connector);
  if (IsLocation(selectedNode)) return IsLocationTerminal(connector);
  if (IsProduct(selectedNode)) return IsTransport(connector) || IsPartOfTerminal(connector);
  return IsTransport(connector);
}

function FilterSplitViewTerminal(selectedNode: Node, secondaryNode: Node, connector: Connector) {
  if (IsProduct(selectedNode)) {
    if (IsFunction(secondaryNode)) return IsProductTerminal(connector);
    if (IsLocation(secondaryNode)) return IsLocationTerminal(connector);
    if (IsProduct(secondaryNode)) return IsTransport(connector);
  }

  if (IsFunction(selectedNode)) {
    if (IsFunction(secondaryNode)) return IsTransport(connector);
    if (IsLocation(secondaryNode)) return IsLocationTerminal(connector);
    if (IsProduct(secondaryNode)) return IsProductTerminal(connector);
  }

  return IsLocationTerminal(connector);
}
