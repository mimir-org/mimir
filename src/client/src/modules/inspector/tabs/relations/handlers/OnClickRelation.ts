import { Size } from "../../../../../compLibrary";
import { Connector, Edge, Node } from "../../../../../models";
import { MODULE_TYPE } from "../../../../../models/project";
import { setModuleVisibility } from "../../../../../redux/store/modules/actions";
import { SetPanelHeight } from "../../../helpers";
import { changeInspectorTab } from "../../../redux/actions";
import { setActiveEdge, setActiveNode } from "../../../../../redux/store/project/actions";

const OnClickRelation = (
  node: Node,
  conn: Connector,
  relationEdges: Map<string, Edge>,
  dispatch: any
) => {
  const toNode = FindToNodeByConnector(node, conn, relationEdges);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveNode(toNode.id, true));
  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, true, true));
  dispatch(changeInspectorTab(3));

  const panel = document.getElementById("InspectorModule");
  if (panel.style.height === Size.ModuleClosed + "px") SetPanelHeight(Size.InspectorModuleOpen);
};

const FindToNodeByConnector = (node: Node, conn: Connector, edges: Map<string, Edge>): Node => {
  const edge = edges.get(conn.id);

  return edge.fromNodeId === node.id ? edge.toNode : edge.fromNode;
};

export { OnClickRelation };
