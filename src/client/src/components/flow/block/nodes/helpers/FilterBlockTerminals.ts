import { GetSelectedNode, IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { Connector, Node } from "../../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * Different node types allow different terminal types.
 * @param actualNodeConnectors
 * @param secondaryNode
 * @returns a filtered list of connectors sorted by type and name.
 */
export const FilterBlockTerminals = (actualNodeConnectors: Connector[], secondaryNode: Node) => {
  const selectedNode = GetSelectedNode();

  return actualNodeConnectors
    ?.filter((c) => !IsPartOf(c) && FilterTerminal(selectedNode, secondaryNode, c))
    ?.sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));
};

function FilterTerminal(selectedNode: Node, secondary: Node, c: Connector) {
  if (secondary) return FilterSplitViewTerminal(selectedNode, secondary, c);
  if (IsLocation(selectedNode)) return IsLocationTerminal(c);
  return IsTransport(c);
}

function FilterSplitViewTerminal(selectedNode: Node, secondary: Node, c: Connector) {
  if (!IsLocation(selectedNode)) {
    if (IsFunction(secondary)) return IsTransport(c);
    if (IsProduct(secondary)) return IsProductTerminal(c);
  }
  return IsLocationTerminal(c);
}
