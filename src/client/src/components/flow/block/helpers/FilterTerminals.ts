import { GetSelectedNode, IsFunction, IsLocation, IsProduct } from "../../../../helpers";
import { Connector, Node } from "../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * Different node types allow different terminal types.
 * @param connectors
 * @param secondaryNode selected secondaryNode, if any
 * @returns a filtered list connectors sorted by name.
 */
const FilterTerminals = (connectors: Connector[], secondaryNode: Node) => {
  const selectedNode = GetSelectedNode();
  const terminals: Connector[] = [];

  connectors?.forEach((c) => {
    validateTerminal(selectedNode, secondaryNode, c) && terminals.push(c);
  });

  return terminals.sort((a, b) => a.name.localeCompare(b.name));
};

function validateTerminal(selected: Node, secondary: Node, c: Connector) {
  if (secondary) {
    if (IsLocation(selected)) return IsLocationTerminal(c);
    if (IsProduct(selected)) return IsProductTerminal(c);
    if (IsFunction(selected)) return validateFunctionTerminal(secondary, c);
  }

  if (IsLocation(selected)) return IsLocationTerminal(c);
  if (IsProduct(selected)) return IsPartOf(c) || IsTransport(c); // Product has a separate view

  return IsTransport(c);
}

function validateFunctionTerminal(secondary: Node, c: Connector) {
  if (IsFunction(secondary)) return IsTransport(c);
  if (IsProduct(secondary)) return IsProductTerminal(c);
  if (IsLocation(secondary)) return IsLocationTerminal(c);
}

export default FilterTerminals;
