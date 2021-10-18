import { Node, RelationType } from "../../../../models";
import { IsInputTerminal } from "../../helpers";

const SetTerminalOrder = (node: Node, type: RelationType) => {
  let inputOrder = 0;
  let outputOrder = 0;

  node.connectors.forEach((conn) => {
    if (conn.visible && conn.relationType === type && IsInputTerminal(conn)) inputOrder++;
    if (conn.visible && conn.relationType === type && !IsInputTerminal(conn)) outputOrder++;
  });

  return [inputOrder, outputOrder];
};

export default SetTerminalOrder;
