import { Node } from "../../../../../models";
import { IsInputTerminal } from "../../../helpers";

/**
 * Method to set the order for each terminal. The value defines the position for the terminal.
 * @param node
 */
const SetConnectorOrder = (node: Node) => {
  let inputOrder = 0;
  let outputOrder = 0;

  node.connectors.forEach((conn) => {
    if (conn.visible && IsInputTerminal(conn)) {
      conn.inputOrder = inputOrder;
      inputOrder++;
    }
    if (conn.visible && !IsInputTerminal(conn)) {
      conn.outputOrder = outputOrder;
      outputOrder++;
    }
  });
};

export default SetConnectorOrder;
