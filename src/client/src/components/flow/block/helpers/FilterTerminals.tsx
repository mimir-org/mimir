import { Connector, Node } from "../../../../models";
import { IsLocation, IsLocationTerminal, IsTransport, IsProductTerminal, IsProduct, IsFunction } from "../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * Different node types allow different terminal types.
 * @param node the selected node
 * @param selectedNode
 * @param secondaryNode selected secondaryNode, if any
 * @returns a filtered list.
 */
const FilterTerminals = (node: Node, selectedNode: Node, secondaryNode: Node) => {
  let terminals: Connector[] = [];
  if (!node) return [];

  node.connectors?.forEach((c) => {
    validateTerminal(selectedNode, secondaryNode, c) && terminals.push(c);
  });
  return terminals;
};

function validateTerminal(selected: Node, secondary: Node, c: Connector) {
  if (secondary) {
    if (IsLocation(selected)) return IsLocationTerminal(c);
    if (IsProduct(selected)) return IsProductTerminal(c);
    if (IsFunction(selected)) return validateFunction(secondary, c);
  }

  if (IsLocation(selected)) return IsLocationTerminal(c);
  return IsTransport(c);
}

function validateFunction(secondary: Node, c: Connector) {
  if (IsFunction(secondary)) return IsTransport(c);
  if (IsProduct(secondary)) return IsProductTerminal(c);
  if (IsLocation(secondary)) return IsLocationTerminal(c);
}

export default FilterTerminals;
