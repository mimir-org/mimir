import { Connector, Edge, Node } from "../../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../../redux/store/project/actions";

const OnTerminalClick = (conn: Connector, data: Node, dispatch: any, edges: Edge[]) => {
  dispatch(changeActiveConnector(data.id, conn.id, !conn.visible, conn.inputOrder, conn.outputOrder));

  if (conn.visible) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

export default OnTerminalClick;
