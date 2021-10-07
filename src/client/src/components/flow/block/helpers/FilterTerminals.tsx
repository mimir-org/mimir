import { SortTerminals } from ".";
import { Connector, Node } from "../../../../models";
import {
  IsFunction,
  IsProduct,
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
  console.log({ splitNode });
  let terminals: Connector[] = [];
  if (node === undefined) return [];

  if (!splitView) {
    node.connectors?.forEach((c) => {
      if (IsFunction(node) || IsProduct(node)) IsTransportTerminal(c) && terminals.push(c);
      else if (IsLocation(node)) IsLocationTerminal(c) && terminals.push(c);
    });
  }

  if (splitView) {
    if (!splitNode) {
      node.connectors?.forEach((c) => {
        if (IsFunction(node) || IsProduct(node)) IsTransportTerminal(c) && terminals.push(c);
      });
    } else {
      node.connectors?.forEach((c) => {
        if ((IsFunction(node) || IsProduct(node)) && IsLocation(splitNode))
          IsOutputTerminal(c) && IsLocationTerminal(c) && terminals.push(c);

        if ((IsFunction(node) || IsProduct(node)) && !IsLocation(splitNode)) IsTransportTerminal(c) && terminals.push(c);
        else if (IsLocation(node)) IsInputTerminal(c) && IsLocationTerminal(c) && terminals.push(c);
      });
    }
  }

  return SortTerminals(terminals);
};

export default FilterTerminals;
