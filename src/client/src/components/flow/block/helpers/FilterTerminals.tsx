import { Connector, Node } from "../../../../models";
import { IsLocation, IsLocationTerminal, IsTransport, IsProductTerminal, IsInputTerminal, IsProduct } from "../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * @param node the selected node
 * @param secondaryNode selected secondaryNode, if any
 * @returns a filtered list.
 */
const FilterTerminals = (node: Node, secondaryNode: Node) => {
  let terminals: Connector[] = [];
  if (!node) return [];

  node.connectors?.forEach((c) => {
    validate(node, secondaryNode, c) && terminals.push(c);
  });
  return terminals;
};

function validate(n: Node, secondary: Node, c: Connector) {
  if (secondary) {
    if (IsLocation(secondary) && !IsLocation(n)) return IsLocationTerminal(c) && !IsInputTerminal(c);
    if (IsLocation(secondary)) return IsLocationTerminal(c);
    if (IsProduct(secondary) && !IsProduct(n)) return IsProductTerminal(c) && !IsInputTerminal(c);
    if (IsProduct(secondary)) return IsProductTerminal(c);
  }

  if (IsLocation(n)) return IsLocationTerminal(c);
  return IsTransport(c);
}

export default FilterTerminals;
