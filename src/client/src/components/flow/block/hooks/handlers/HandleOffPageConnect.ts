import { addEdge } from "react-flow-renderer";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { EDGE_TYPE } from "../../../../../models/project";
import { createEdge, deleteEdge, deleteNode, setOffPageStatus } from "../../../../../redux/store/project/actions";
import { ConvertEdgeDataToMimirEdge } from "../../../converters";
import { CreateId } from "../../../helpers";
import { IsTerminal } from "../../../helpers/Connectors";
import { OnBlockDropParameters } from "../useOnBlockConnect";
import { IsOffPageEdge } from "../../helpers/IsOffPageEdge";

/**
 * Component to handle a connection between two OffPageNodes.
 * The OffPageNodes only serves as placeholders, and when the connection is completed the OffPageNodes are deleted,
 * and one new transport edge is created between the parents of the OffPageNodes.
 * This component is called from the useOnConnect hook.
 * @param params
 * @param sourceNode
 * @param targetNode
 * @returns a transport edge between the parents of the OffPageNodes.
 */
export const HandleOffPageConnect = (params: OnBlockDropParameters, sourceNode: Node, targetNode: Node) => {
  const { library, project, connection, dispatch, setEdges } = params;
  const id = CreateId();
  const sourceParent = project.nodes.find((n) => n.id === sourceNode?.parentNodeId);
  const targetParent = project.nodes.find((n) => n.id === targetNode?.parentNodeId);
  const sourceTerminal = GetSourceTerminal(project.edges, sourceNode?.parentNodeId, sourceNode?.id);
  const targetTerminal = GetTargetTerminal(project.edges, targetNode?.parentNodeId, targetNode?.id);

  if (!sourceTerminal || !targetTerminal) return null;

  const edge = ConvertEdgeDataToMimirEdge(id, sourceTerminal, targetTerminal, sourceParent, targetParent, project.id, library);
  dispatch(createEdge(edge));

  project.edges.forEach((e) => {
    if (IsOffPageEdge(e)) dispatch(deleteEdge(e.id));
  });

  const isRequired = false;
  // Remove OffPage nodes
  dispatch(deleteNode(sourceNode?.id));
  dispatch(deleteNode(targetNode?.id));
  dispatch(setOffPageStatus(sourceParent.id, sourceTerminal.id, isRequired));
  dispatch(setOffPageStatus(targetParent.id, targetTerminal.id, isRequired));

  const type = EDGE_TYPE.BLOCK_OFFPAGE;
  const data = { source: sourceParent, target: targetParent, edge };

  return setEdges((els) => {
    return addEdge({ ...connection, id, type, data }, els);
  });
};

function GetSourceTerminal(edges: Edge[], sourceParentId: string, sourceNodeId: string) {
  return edges.find(
    (e) => e.fromConnector.nodeId === sourceParentId && IsTerminal(e.fromConnector) && e.toConnector.nodeId === sourceNodeId
  ).fromConnector;
}

function GetTargetTerminal(edges: Edge[], targetParentId: string, targetNodeId: string) {
  return edges.find(
    (e) => e.toConnector.nodeId === targetParentId && IsTerminal(e.toConnector) && e.fromConnector.nodeId === targetNodeId
  ).toConnector;
}
