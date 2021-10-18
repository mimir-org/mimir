import { Connector, Edge, Node } from "../../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../../redux/store/project/actions";
import { SetTerminalOrder } from "../../../../block/helpers";

const OnConnectorClick = (conn: Connector, dispatch: any, edges: Edge[], nodes: Node[]) => {
  const actualNode = nodes.find((x) => x.id === conn.nodeId);
  const [inputOrder, outputOrder] = SetTerminalOrder(actualNode, conn.relationType);
  dispatch(changeActiveConnector(actualNode, conn.id, !conn.visible, inputOrder, outputOrder));

  if (conn.visible) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

export default OnConnectorClick;
