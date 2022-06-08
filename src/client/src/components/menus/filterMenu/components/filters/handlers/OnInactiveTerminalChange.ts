import { ConnectorVisibility } from "@mimirorg/modelbuilder-types";
import { Dispatch } from "redux";
import { Node } from "../../../../../../models";
import { changeActiveConnector } from "../../../../../../redux/store/project/actions";
import { IsConnectorVisible } from "../../../../../flow/helpers/Connectors";

export const OnInactiveTerminalChange = (nodes: Node[], dispatch: Dispatch, visible: boolean) => {
  const terminals = [];

  nodes.forEach((n) => {
    n.connectors?.forEach((c) => {
      if (visible) IsConnectorVisible(c) && terminals.push(c);
      // else !c.visible && terminals.push(c); // TODO: FIX conn
    });
  });

  if (terminals.length === 0) return;

  terminals.forEach((elem) => {
    dispatch(changeActiveConnector(elem.nodeId, elem.id, ConnectorVisibility.InputVisible)); // TODO: FIX
  });
};
