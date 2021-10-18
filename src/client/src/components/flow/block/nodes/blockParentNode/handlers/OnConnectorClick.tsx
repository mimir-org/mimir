import { Connector, Edge, Node } from "../../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../../redux/store/project/actions";
import { SetTerminalOrder } from "../../../../block/helpers";
import { IsInputTerminal } from "../../../../helpers";

const OnConnectorClick = (conn: Connector, dispatch: any, edges: Edge[], nodes: Node[]) => {
  const actualNode = nodes.find((x) => x.id === conn.nodeId);
  const [inputOrder, outputOrder] = SetTerminalOrder(actualNode, conn.relationType);

  let order = 0;
  if (IsInputTerminal(conn)) order = inputOrder;
  else order = outputOrder;

  dispatch(changeActiveConnector(actualNode, conn.id, !conn.visible, order));

  if (conn.visible) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

export default OnConnectorClick;
