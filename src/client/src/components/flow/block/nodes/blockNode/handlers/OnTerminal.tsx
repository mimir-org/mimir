import { Connector, Edge, Node } from "../../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../../redux/store/project/actions";
import { SetTerminalOrder } from "../../../helpers";

const OnTerminalClick = (conn: Connector, data: Node, dispatch: any, edges: Edge[]) => {
  const order = SetTerminalOrder(data, 0, conn.relationType);
  dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));

  if (conn.visible) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

export default OnTerminalClick;
