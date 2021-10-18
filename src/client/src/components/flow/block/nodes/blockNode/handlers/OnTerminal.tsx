import { Connector, Edge, Node } from "../../../../../../models";
import { changeActiveConnector, removeEdge } from "../../../../../../redux/store/project/actions";
import { IsInputTerminal } from "../../../../helpers";
import { SetTerminalOrder } from "../../../helpers";

const OnTerminalClick = (conn: Connector, data: Node, dispatch: any, edges: Edge[]) => {
  let [inputOrder, outputOrder] = SetTerminalOrder(data, conn.relationType);

  // if (IsInputTerminal(conn)) outputOrder = 0;
  // if (!IsInputTerminal(conn)) inputOrder = 0;

  dispatch(changeActiveConnector(data, conn.id, !conn.visible, inputOrder, outputOrder));

  if (conn.visible) {
    const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
    if (edge) dispatch(removeEdge(edge.id));
  }
};

export default OnTerminalClick;
