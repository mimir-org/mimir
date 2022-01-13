import { Dispatch } from "redux";
import { Connector, Node } from "../../../../../models";
import { changeActiveConnector } from "../../../../../redux/store/project/actions";

const OnLocationConnectorClick = (conn: Connector, data: Node, dispatch: Dispatch) => {
  dispatch(changeActiveConnector(data?.id, conn.id, !conn.visible, conn.inputOrder, conn.outputOrder));
};

export default OnLocationConnectorClick;
