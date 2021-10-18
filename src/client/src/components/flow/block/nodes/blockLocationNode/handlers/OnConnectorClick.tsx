import { Connector, Node } from "../../../../../../models";
import { changeActiveConnector } from "../../../../../../redux/store/project/actions";
import { SetTerminalOrder } from "../../../helpers";

const OnConnectorClick = (conn: Connector, data: Node, dispatch: any) => {
  const order = SetTerminalOrder(data, 0, conn.relationType);
  dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));
};

export default OnConnectorClick;
