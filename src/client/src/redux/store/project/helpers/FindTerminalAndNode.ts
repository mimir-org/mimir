import { Connector, Node } from "../../../../models";

export const FindTerminalAndNode = (nodes: Node[], terminalId: string): [Node, Connector] => {
  for (let node of nodes) {
    for (let terminal of node.connectors) {
      if (terminal.id === terminalId) {
        return [node, terminal];
      }
    }
  }
};
