import { Connector } from "../../../../models";
import { changeActiveConnector } from "../../../../redux/store/project/actions";

const OnAllTerminalsChange = (terminals: Connector[], dispatch: any, visible: boolean) => {
  terminals.forEach((c) => {
    dispatch(changeActiveConnector(c.nodeId, c.id, !visible, c.inputOrder, c.outputOrder));
  });
};

export default OnAllTerminalsChange;
