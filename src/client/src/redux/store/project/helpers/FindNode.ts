import { Node } from "../../../../models";

export const FindNodeForTerminal = (nodes: Node[], terminalId: string): Node => {
  for (let node of nodes) {
    for (let terminal of node.connectors) {
      if (terminal.id === terminalId) {
        return node;
      }
    }
  }
};

export const FindNodeForComposite = (nodes: Node[], compositeId: string): Node => {
  for (let node of nodes) {
    for (let composite of node.composites) {
      if (composite.id === compositeId) {
        return node;
      }
    }
  }
};
