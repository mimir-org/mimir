import { Node } from "../../../../models";
import { changeActiveConnector } from "../../../../redux/store/project/actions";

const OnInactiveTerminalChange = (nodes: Node[], dispatch: any, visible: boolean) => {
  const terminals = [];

  nodes.forEach((n) => {
    n.connectors?.forEach((c) => {
      if (visible) c.visible && terminals.push(c);
      else !c.visible && terminals.push(c);
    });
  });

  if (terminals.length === 0) return;

  terminals.forEach((elem) => {
    dispatch(changeActiveConnector(elem.nodeId, elem.id, !visible, elem.inputOrder, elem.outputOrder));
  });
};

export default OnInactiveTerminalChange;