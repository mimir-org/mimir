import { SortTerminals } from ".";
import { Aspect, Connector } from "../../../../models";
import {
  IsInputTerminal,
  IsLocationTerminal,
  IsOutputTerminal,
  IsTransportTerminal,
} from "../common";

/* Component to filter the terminals displayed on the nodes in BlockView 
   FilterTerminals returns a call to SortTerminals that sorts the filtered list */

const FilterTerminals = (
  terminals: Connector[],
  aspect: Aspect,
  splitView: boolean
) => {
  let filteredTerminals: Connector[] = [];

  if (splitView) {
    terminals?.forEach((conn) => {
      if (aspect === Aspect.Function) {
        IsOutputTerminal(conn) &&
          IsLocationTerminal(conn) &&
          filteredTerminals.push(conn);
      } else if (aspect === Aspect.Location) {
        IsInputTerminal(conn) &&
          IsLocationTerminal(conn) &&
          filteredTerminals.push(conn);
      }
    });
  }

  if (!splitView) {
    terminals?.forEach((conn) => {
      if (aspect === Aspect.Function)
        IsTransportTerminal(conn) && filteredTerminals.push(conn);
      else if (aspect === Aspect.Location)
        IsLocationTerminal(conn) &&
          IsInputTerminal(conn) &&
          filteredTerminals.push(conn);
    });
  }
  return SortTerminals(filteredTerminals);
};

export default FilterTerminals;
