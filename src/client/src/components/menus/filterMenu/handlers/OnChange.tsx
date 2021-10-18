import { Node, Edge, RelationType, Connector } from "../../../../models";
import { GetConnectorNode, IsChecked, IsEdge } from "../helpers";
import { changeActiveConnector, setEdgeVisibility } from "../../../../redux/store/project/actions";

const OnChange = (
  edges: Edge[],
  setChecked: any,
  dispatch: any,
  elements: any[],
  type: RelationType | string,
  name: string,
  node: Node,
  conn: Connector
) => {
  if (edges) {
    setChecked(IsChecked(type, edges, conn, node, name));
    elements.forEach((element) => {
      if (IsEdge(element)) {
        dispatch(setEdgeVisibility(element, !element.isHidden));
      } else {
        const connNode = GetConnectorNode(element);
        dispatch(changeActiveConnector(connNode, element.id, !element.visible, 0, 0));
      }
    });
  }
};

export default OnChange;
