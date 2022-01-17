import { IsConnectorVisible } from "../../../../../helpers";
import { Node } from "../../../../../models";
import { IsInputTerminal, IsOutputTerminal } from "../../../helpers";

/**
 * Method to set the order for each terminal. The value defines the position for the terminal.
 * @param node
 */
const SetConnectorOrder = (node: Node) => {
  let inputOrder = 0;
  let outputOrder = 0;

  node.connectors.forEach((conn) => {
    if (IsConnectorVisible(conn) && IsInputTerminal(conn)) conn.inputOrder = inputOrder++;
    if (IsConnectorVisible(conn) && IsOutputTerminal(conn)) conn.outputOrder = outputOrder++;
  });
};

export default SetConnectorOrder;
