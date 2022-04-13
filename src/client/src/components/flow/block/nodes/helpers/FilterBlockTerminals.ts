import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/Aspects";
import { Connector, Node } from "../../../../../models";
import { IsLocationTerminal, IsPartOfTerminal, IsProductTerminal, IsTransport } from "../../../helpers/Connectors";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * Different node types allow different terminal types.
 * @param connectors
 * @param selectedNode
 * @param secondaryNode
 * @returns a filtered list of connectors sorted by type and name.
 */
export const FilterBlockTerminals = (connectors: Connector[], selectedNode: Node, secondaryNode: Node) => {
  const filteredConnectors = connectors
    ?.filter((c) => !IsPartOfTerminal(c) && FilterTerminal(selectedNode, secondaryNode, c))
    ?.sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));
  // console.log({ filteredConnectors });
  return filteredConnectors;
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
