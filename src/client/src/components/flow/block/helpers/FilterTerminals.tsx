import { SortTerminals } from ".";
import { Connector, Node } from "../../../../models";
import { IsLocation, IsLocationTerminal, IsTransportTerminal } from "../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * @param n the selected node
 * @param splitView is splitView activated
 * @param splitNode selected SplitNode, if any
 * @returns a call to SortTerminals that sorts the filtered list.
 */
const FilterTerminals = (n: Node, splitView: boolean, splitNode: Node) => {
  let terminals: Connector[] = [];
  if (n === undefined) return [];

  n.connectors?.forEach((c) => {
    validateFilterTerminal(n, splitNode, c, splitView) && terminals.push(c);
  });
  return SortTerminals(terminals);
};

function validateFilterTerminal(n: Node, splitNode: Node, c: Connector, splitView: boolean) {
  if (!splitView) return (IsLocation(n) && IsLocationTerminal(c)) || IsTransportTerminal(c);
  if (splitView && !splitNode) return IsTransportTerminal(c);

  if (splitView && splitNode) {
    if (IsLocation(splitNode)) return IsLocationTerminal(c);
    return IsTransportTerminal(c);
  }
}

export default FilterTerminals;
