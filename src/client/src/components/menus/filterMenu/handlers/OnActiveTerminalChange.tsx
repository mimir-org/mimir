import { Connector } from "../../../../models";
import { changeActiveConnector } from "../../../../redux/store/project/actions";

const OnActiveTerminalChange = (terminals: Connector[], dispatch: any) => {
  terminals.forEach((c) => {
    dispatch(changeActiveConnector(c.nodeId, c.id, !c.visible, c.inputOrder, c.outputOrder));
  });
};

export default OnActiveTerminalChange;
