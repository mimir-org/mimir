import { Connector, Node } from "../../../../../../models";
import { changeActiveConnector } from "../../../../../../redux/store/project/actions";
import { IsInputTerminal } from "../../../../helpers";
import { SetTerminalOrder } from "../../../helpers";

const OnConnectorClick = (conn: Connector, data: Node, dispatch: any) => {
  const [inputOrder, outputOrder] = SetTerminalOrder(data, conn.relationType);

  let order = 0;
  order = IsInputTerminal(conn) ? inputOrder : outputOrder;

  dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));
};

export default OnConnectorClick;
