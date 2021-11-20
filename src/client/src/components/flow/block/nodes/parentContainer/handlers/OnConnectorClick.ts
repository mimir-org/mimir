import { Connector, Edge, Node } from "../../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../../redux/store/project/actions";

const OnConnectorClick = (conn: Connector, dispatch: any, edges: Edge[], nodes: Node[]) => {
  const actualNode = nodes.find((x) => x.id === conn.nodeId);

  dispatch(changeActiveConnector(actualNode.id, conn.id, !conn.visible, conn.inputOrder, conn.outputOrder));

  if (conn.visible) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

export default OnConnectorClick;