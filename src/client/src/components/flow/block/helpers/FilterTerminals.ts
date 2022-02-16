import { IsFunction, IsLocation, IsProduct } from "../../../../helpers";
import { Connector, Node } from "../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * Different node types allow different terminal types.
 * @param selectedNode
 * @param secondaryNode selected secondaryNode, if any
 * @returns a filtered list of connectors sorted by type and name.
 */
const FilterTerminals = (selectedNode: Node, secondaryNode: Node) => {
  return selectedNode?.connectors
    .filter((c) => !IsPartOf(c) && validateTerminal(selectedNode, secondaryNode, c))
    .sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));
};

function validateTerminal(selected: Node, secondary: Node, c: Connector) {
  if (secondary) {
    if (IsLocation(selected)) return IsLocationTerminal(c);
    if (IsProduct(selected)) return IsProductTerminal(c);
    if (IsFunction(selected)) return validateFunctionTerminal(secondary, c);
  }

  if (IsLocation(selected)) return IsLocationTerminal(c);
  return IsTransport(c);
}

function validateFunctionTerminal(secondary: Node, c: Connector) {
  if (IsFunction(secondary)) return IsTransport(c);
  if (IsProduct(secondary)) return IsProductTerminal(c);
  if (IsLocation(secondary)) return IsLocationTerminal(c);
}

export default FilterTerminals;
