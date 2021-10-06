import { SortTerminals } from ".";
import { Connector, Node } from "../../../../models";
import {
  IsFunction,
  IsInputTerminal,
  IsLocation,
  IsLocationTerminal,
  IsOutputTerminal,
  IsTransportTerminal,
} from "../../helpers";

/**
 * Component to filter the terminals displayed on the nodes in BlockView.
 * @param node the selected node
 * @param splitView is splitView activated
 * @param splitNode selected SplitNode, if any
 * @returns a call to SortTerminals that sorts the filtered list.
 */
const FilterTerminals = (node: Node, splitView: boolean, splitNode: Node) => {
  let terminals: Connector[] = [];
  if (node === undefined) return [];

  if (splitView) {
    node.connectors?.forEach((conn) => {
      if (IsFunction(node)) {
        IsOutputTerminal(conn) && IsLocationTerminal(conn) && terminals.push(conn);
      } else if (IsLocation(node)) {
        IsInputTerminal(conn) && IsLocationTerminal(conn) && terminals.push(conn);
      }
    });
  }

  if (!splitView) {
    node.connectors?.forEach((conn) => {
      if (IsFunction(node)) IsTransportTerminal(conn) && terminals.push(conn);
      else if (IsLocation(node)) IsLocationTerminal(conn) && IsInputTerminal(conn) && terminals.push(conn);
    });
  }
  return SortTerminals(terminals);
};

export default FilterTerminals;
