import { Connector, Node } from "../../../../models";
import { IsLocation, IsLocationTerminal, IsTransportTerminal, IsFulfilledByTerminal } from "../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * @param n the selected node
 * @param splitView is splitView activated
 * @param secondaryNode selected secondaryNode, if any
 * @returns a filtered list.
 */
const FilterTerminals = (n: Node, splitView: boolean, secondaryNode: Node) => {
  let terminals: Connector[] = [];
  if (n === undefined) return [];

  n.connectors?.forEach((c) => {
    validate(n, secondaryNode, c, splitView) && terminals.push(c);
  });
  return terminals;
};

function validate(n: Node, splitNode: Node, c: Connector, splitView: boolean) {
  if (!splitView) return (IsLocation(n) && IsLocationTerminal(c)) || (!IsLocation(n) && IsTransportTerminal(c));

  if (splitNode) {
    if (IsLocation(splitNode)) return IsLocationTerminal(c);
    if (!IsLocation(n)) return IsFulfilledByTerminal(c);
  }

  if (!IsLocation(n)) return IsTransportTerminal(c);
  return false;
}

export default FilterTerminals;
