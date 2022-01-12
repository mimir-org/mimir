import { Connector, Edge, Node } from "../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../redux/store/project/actions";
import { IsBidirectionalTerminal } from "../../../helpers";

const OnTerminalClick = (conn: Connector, isInput: boolean, node: Node, dispatch: any, edges: Edge[]) => {
  let isBidirectionalInput = false;

  if (IsBidirectionalTerminal(conn)) {
    if (isInput) isBidirectionalInput = true;
  }

  dispatch(changeActiveConnector(node.id, conn.id, !conn.visible, conn.inputOrder, conn.outputOrder, isBidirectionalInput));

  if (conn.visible) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

export default OnTerminalClick;
