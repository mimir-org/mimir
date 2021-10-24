import { Connector, Node } from "../../../../models";
import { IsLocation, IsLocationTerminal, IsTransportTerminal, IsFulfilledByTerminal } from "../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * @param n the selected node
 * @param secondaryNode selected secondaryNode, if any
 * @returns a filtered list.
 */
const FilterTerminals = (n: Node, secondaryNode: Node) => {
  let terminals: Connector[] = [];
  if (n === undefined) return [];

  n.connectors?.forEach((c) => {
    validate(n, secondaryNode, c) && terminals.push(c);
  });
  return terminals;
};

function validate(n: Node, secondaryNode: Node, c: Connector) {
  if (!secondaryNode) return (IsLocation(n) && IsLocationTerminal(c)) || (!IsLocation(n) && IsTransportTerminal(c));

  if (secondaryNode) {
    if (IsLocation(secondaryNode)) return IsLocationTerminal(c);
    if (!IsLocation(n)) return IsFulfilledByTerminal(c);
  }

  if (!IsLocation(n)) return IsTransportTerminal(c);
  return false;
}

export default FilterTerminals;
