import { Dispatch } from "redux";
import { Node, Edge, NodeType, ConnectorDirection } from "@mimirorg/modelbuilder-types";
import { deleteEdge, deleteNode, updateEdge } from "../../../redux/store/project/actions";
import { IsEdgeConnectedToNode } from "../helpers/IsEdgeConnectedToNode";
import { CloseInspector } from "../tree/handlers";

/**
 * Component that runs when a node is deleted from Mimir. This component is used both in TreeView and BlockView.
 * A node can be deleted with the delete key from the keyboard, or the delete button in Mimir's Inspector.
 * If a Node is deleted the related Edges are also deleted.
 * @param nodesToDelete
 * @param nodes
 * @param edges
 * @param inspectorRef
 * @param dispatch
 * @param selectedBlockNode
 */
const OnNodeDelete = (
  nodesToDelete: Node[],
  nodes: Node[],
  edges: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  selectedBlockNode?: Node
) => {
  nodesToDelete.forEach((node) => {
    if (node.id === selectedBlockNode?.id) return;
    if (node.nodeType === NodeType.Handler) {
      RemapAndDeleteHandlerEdges(node, edges, dispatch);
      dispatch(deleteNode(node.id));
    } else {
      DeleteRelatedEdges(node.id, edges, dispatch);
      HandleRelatedEdges(node.id, nodes, edges, dispatch);
      dispatch(deleteNode(node.id));
    }
  });

  CloseInspector(inspectorRef, dispatch);
};

export default OnNodeDelete;

function RemapAndDeleteHandlerEdges(node: Node, edges: Edge[], dispatch: Dispatch) {
  // There should always only contains 2 connectors on handle node.
  // One input connector and one output connector.
  const inputConnector = node.connectors.find((x) => x.type === ConnectorDirection.Input);
  const outputConnector = node.connectors.find((x) => x.type === ConnectorDirection.Output);
  const remapEdge = edges.find((x) => x.toConnectorId === inputConnector.id);
  const delEdge = edges.find((x) => x.fromConnectorId === outputConnector.id);
  console.log(remapEdge, delEdge);
  const copy = { ...remapEdge };

  copy.toNode = delEdge.toNode;
  copy.toNodeId = delEdge.toNodeId;
  copy.toNodeIri = delEdge.toNodeIri;
  copy.toConnector = delEdge.toConnector;
  copy.toConnectorId = delEdge.toConnectorId;
  copy.toConnectorIri = delEdge.toConnectorIri;
  if (delEdge.id !== copy.id) dispatch(deleteEdge(delEdge.id));
  dispatch(updateEdge(copy));
}

/**
 * Function to delete all edges related to a node that is to be deleted.
 * Note: the edges must be deleted before the node.
 * @param nodeId
 * @param edges
 * @param dispatch
 */
function DeleteRelatedEdges(nodeId: string, edges: Edge[], dispatch: Dispatch) {
  edges.forEach((edge) => {
    if (IsEdgeConnectedToNode(edge, nodeId)) dispatch(deleteEdge(edge.id));
  });
}

/**
 * Function to handle related edges to a node that is to be removed.
 * @param nodeToRemoveId
 * @param nodes
 * @param edges
 * @param dispatch
 */
function HandleRelatedEdges(nodeToRemoveId: string, nodes: Node[], edges: Edge[], dispatch: Dispatch) {
  edges.forEach((edge) => {
    if (!IsEdgeConnectedToNode(edge, nodeToRemoveId)) return;
    dispatch(deleteEdge(edge.id));
  });
}
