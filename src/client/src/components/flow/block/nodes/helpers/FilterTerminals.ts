import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { Connector, Node } from "../../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../../helpers";

/**
 * Component to filter the terminals displayed in a Node's terminalMenu in BlockView.
 * Different node types allow different terminal types.
 * @param selectedNode
 * @param secondaryNode
 * @returns a filtered list of connectors sorted by type and name.
 */
export const FilterTerminals = (selectedNode: Node, secondaryNode: Node) => {
  return selectedNode?.connectors
    .filter((c) => !IsPartOf(c) && ValidateTerminal(selectedNode, secondaryNode, c))
    .sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));
};

function ValidateTerminal(selected: Node, secondary: Node, c: Connector) {
  if (secondary) return ValidateSecondaryNodeTerminal(selected, secondary, c);
  if (IsLocation(selected)) return IsLocationTerminal(c);
  return IsTransport(c);
}

function ValidateSecondaryNodeTerminal(selected: Node, secondary: Node, c: Connector) {
  if (IsLocation(selected)) return IsLocationTerminal(c);
  if (IsProduct(selected)) return IsProductTerminal(c);
  if (IsFunction(selected)) return ValidateFunctionTerminal(secondary, c);
}

function ValidateFunctionTerminal(secondary: Node, c: Connector) {
  if (IsFunction(secondary)) return IsTransport(c);
  if (IsProduct(secondary)) return IsProductTerminal(c);
  if (IsLocation(secondary)) return IsLocationTerminal(c);
}
