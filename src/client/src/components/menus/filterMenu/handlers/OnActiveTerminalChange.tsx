import { Connector, Edge } from "../../../../models";
import { changeActiveConnector } from "../../../../redux/store/project/actions";

const OnActiveTerminalChange = (terminals: Connector[], edges: Edge[], dispatch: any) => {
  terminals.forEach((c) => {
    edges.forEach((e) => {
      if (e.fromConnectorId === c.id) e.isHidden = !e.isHidden;
    });

    dispatch(changeActiveConnector(c.nodeId, c.id, !c.visible, c.inputOrder, c.outputOrder));
  });
};

export default OnActiveTerminalChange;
