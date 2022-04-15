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
 * @param selectedNode
 * @param secondaryNode
 * @returns two filtered list of connectors sorted by type, name and input/output.
 */
export const FilterTerminals = (connectors: Connector[], selectedNode: Node, secondaryNode: Node) => {
  const sortedConnectors = connectors
    ?.filter((c) => !IsPartOfTerminal(c) && FilterTerminal(selectedNode, secondaryNode, c))
    ?.sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));

  const inputs = sortedConnectors.filter((t) => IsInputTerminal(t) || IsBidirectionalTerminal(t));
  const outputs = sortedConnectors.filter((t) => IsOutputTerminal(t) || IsBidirectionalTerminal(t));

  return { in: inputs, out: outputs } as Terminals;
};

function FilterTerminal(selectedNode: Node, secondary: Node, c: Connector) {
  if (secondary) return FilterSplitViewTerminal(selectedNode, secondary, c);
  if (IsLocation(selectedNode)) return IsLocationTerminal(c);
  return IsTransport(c);
}

function FilterSplitViewTerminal(selectedNode: Node, secondary: Node, c: Connector) {
  if (IsProduct(selectedNode)) {
    if (IsFunction(secondary)) return IsProductTerminal(c);
    if (IsLocation(secondary)) return IsLocationTerminal(c);
    if (IsProduct(secondary)) return IsTransport(c);
  }

  if (IsFunction(selectedNode)) {
    if (IsFunction(secondary)) return IsTransport(c);
    if (IsLocation(secondary)) return IsLocationTerminal(c);
    if (IsProduct(secondary)) return IsProductTerminal(c);
  }

  return IsLocationTerminal(c);
}
