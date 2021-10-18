import { Connector, Node } from "../../../../../../models";
import { changeActiveConnector } from "../../../../../../redux/store/project/actions";
import { SetTerminalOrder } from "../../../helpers";

const OnConnectorClick = (conn: Connector, data: Node, dispatch: any) => {
  const [inputOrder, outputOrder] = SetTerminalOrder(data, conn.relationType);
  dispatch(changeActiveConnector(data, conn.id, !conn.visible, inputOrder, outputOrder));
};

export default OnConnectorClick;
