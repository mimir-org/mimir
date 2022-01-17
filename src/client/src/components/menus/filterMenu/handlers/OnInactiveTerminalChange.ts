import { Dispatch } from "redux";
import { ConnectorVisibility, Node } from "../../../../models";
import { changeActiveConnector } from "../../../../redux/store/project/actions";

const OnInactiveTerminalChange = (nodes: Node[], dispatch: Dispatch, visible: boolean) => {
  const terminals = [];

  nodes.forEach((n) => {
    n.connectors?.forEach((c) => {
      if (visible) c.connectorVisibility !== ConnectorVisibility.None && terminals.push(c);
      // else !c.visible && terminals.push(c); // TODO: FIX conn
    });
  });

  if (terminals.length === 0) return;

  terminals.forEach((elem) => {
    dispatch(changeActiveConnector(elem.nodeId, elem.id, ConnectorVisibility.InputVisible, elem.inputOrder, elem.outputOrder));
  });
};

export default OnInactiveTerminalChange;
