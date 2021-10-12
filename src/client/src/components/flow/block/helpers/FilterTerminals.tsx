import { SortTerminals } from ".";
import { Connector, Node } from "../../../../models";
import {
  IsLocation,
  IsProduct,
  IsFunction,
  IsLocationTerminal,
  IsTransportTerminal,
  IsFulfilledByTerminal,
} from "../../helpers";

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
    validate(n, splitNode, c, splitView) && terminals.push(c);
  });
  return SortTerminals(terminals);
};

function validate(n: Node, splitNode: Node, c: Connector, splitView: boolean) {
  if (!splitView) {
    return (
      (IsLocation(n) && IsLocationTerminal(c)) ||
      (IsProduct(n) && IsFulfilledByTerminal(c)) ||
      (IsFunction(n) && IsTransportTerminal(c))
    );
  }

  if (splitNode) {
    if (IsLocation(splitNode)) return IsLocationTerminal(c);
    if (IsFunction(splitNode) || IsProduct(splitNode)) return IsFulfilledByTerminal(c);
  }

  if (IsFunction(n)) return IsTransportTerminal(c);
  if (IsProduct(n)) return IsFulfilledByTerminal(c);

  return false;
}

export default FilterTerminals;
