import { GetSelectedNode, IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { Connector, Node } from "../../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * Different node types allow different terminal types.
 * @param actualNode
 * @param secondaryNode
 * @returns a filtered list of connectors sorted by type and name.
 */
export const FilterTerminals = (actualNode: Node, secondaryNode: Node) => {
  const selectedNode = GetSelectedNode();

  return actualNode?.connectors
    ?.filter((c) => !IsPartOf(c) && ValidateTerminal(selectedNode, secondaryNode, c))
    ?.sort((a, b) => a.type - b.type || a.name.localeCompare(b.name));
};

function ValidateTerminal(selectedNode: Node, secondary: Node, c: Connector) {
  if (secondary) {
    if (IsFunction(selectedNode) || IsProduct(selectedNode)) return ValidateSplitViewTerminal(secondary, c);
    return IsLocationTerminal(c);
  }

  if (IsLocation(selectedNode)) return IsLocationTerminal(c);
  return IsTransport(c);
}

function ValidateSplitViewTerminal(secondary: Node, c: Connector) {
  if (IsFunction(secondary)) return IsTransport(c);
  if (IsProduct(secondary)) return IsProductTerminal(c);
  if (IsLocation(secondary)) return IsLocationTerminal(c);
}
