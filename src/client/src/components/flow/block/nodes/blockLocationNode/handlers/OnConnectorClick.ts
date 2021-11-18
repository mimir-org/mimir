import { Connector, Node } from "../../../../../../models";
import { changeActiveConnector } from "../../../../../../redux/store/project/actions";

const OnConnectorClick = (conn: Connector, data: Node, dispatch: any) => {
  dispatch(changeActiveConnector(data?.id, conn.id, !conn.visible, conn.inputOrder, conn.outputOrder));
};

export default OnConnectorClick;
