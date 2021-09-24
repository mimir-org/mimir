import { SortTerminals } from ".";
import { Connector, Node } from "../../../../models";
import {
  IsFunction,
  IsInputTerminal,
  IsLocation,
  IsLocationTerminal,
  IsOutputTerminal,
  IsTransportTerminal,
} from "../common";

/* Component to filter the terminals displayed on the nodes in BlockView. 
   FilterTerminals returns a call to SortTerminals that sorts the filtered list. */
const FilterTerminals = (node: Node, splitView: boolean) => {
  let filteredTerminals: Connector[] = [];
  if (node === undefined) return [];

  if (splitView) {
    node.connectors?.forEach((conn) => {
      if (IsFunction(node)) {
        IsOutputTerminal(conn) &&
          IsLocationTerminal(conn) &&
          filteredTerminals.push(conn);
      } else if (IsLocation(node)) {
        IsInputTerminal(conn) &&
          IsLocationTerminal(conn) &&
          filteredTerminals.push(conn);
      }
    });
  }

  if (!splitView) {
    node.connectors?.forEach((conn) => {
      if (IsFunction(node))
        IsTransportTerminal(conn) && filteredTerminals.push(conn);
      else if (IsLocation(node))
        IsLocationTerminal(conn) &&
          IsInputTerminal(conn) &&
          filteredTerminals.push(conn);
    });
  }
  return SortTerminals(filteredTerminals);
};

export default FilterTerminals;
