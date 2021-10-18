import { Connector } from "../../../../models";
import { IsInputTerminal, IsOutputTerminal } from "../../helpers";

/**
 * Function to sort the order of the terminals displayed on the nodes in BlockView.
 * @param terminals an array of Terminals
 * @returns an ordered list
 */
function SortTerminals(terminals: Connector[]) {
  // terminals.sort((a: Connector, b: Connector) => {
  // if (a.order < b.order) return -1;
  // if (a.order > b.order) return 1;
  // if (a.type < b.type) return -1;
  // if (a.type > b.type) return 1;
  // if (IsInputTerminal(a) && IsInputTerminal(b) && a.name < b.name) return -1;
  // if (IsInputTerminal(a) && IsInputTerminal(b) && a.name > b.name) return 1;
  // if (IsOutputTerminal(a) && IsOutputTerminal(b) && a.name < b.name) return -1;
  // if (IsOutputTerminal(a) && IsOutputTerminal(b) && a.name > b.name) return 1;
  // return 0;
  // });

  return terminals;
}

export default SortTerminals;
