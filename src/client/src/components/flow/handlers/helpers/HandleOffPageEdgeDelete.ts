import { Dispatch } from "redux";
import { IsOffPage } from "../../../../helpers/Aspects";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { deleteEdge } from "../../../../redux/store/project/actions";
import { IsTransport } from "../../helpers/Connectors";
import { HandleConnectedOffPageDelete } from "./HandleConnectedOffPageDelete";
import { HandleRequiredOffPageDelete } from "./HandleRequiredOffPageDelete";

/**
 * When deleting an edge it needs to be checked if that edge has generated some connected OffPage elements.
 * If so, all related edges and nodes are deleted.
 * @param edgeToDelete
 * @param nodes
 * @param edges
 * @param dispatch
 */
export const HandleOffPageEdgeDelete = (edgeToDelete: Edge, nodes: Node[], edges: Edge[], dispatch: Dispatch) => {
  const offPageNode = FindOffPageNode(nodes, edges, edgeToDelete);

  if (offPageNode) {
    return offPageNode.isOffPageRequired
      ? HandleRequiredOffPageDelete(offPageNode, edgeToDelete, offPageNode.parentNodeId, edges, dispatch)
      : HandleConnectedOffPageDelete(offPageNode, edgeToDelete, nodes, edges, dispatch);
  }

  dispatch(deleteEdge(edgeToDelete.id));
};

function FindOffPageNode(nodes: Node[], edges: Edge[], edgeToDelete: Edge) {
  if (IsOffPage(edgeToDelete.toNode)) return nodes.find((n) => n.id === edgeToDelete.toNodeId);
  if (IsOffPage(edgeToDelete.fromNode)) return nodes.find((n) => n.id === edgeToDelete.fromNodeId);

  // Search for Connected OffPageNodes
  const toConnectorId = edgeToDelete.toConnectorId;
  const fromConnectorId = edgeToDelete.fromConnectorId;

  const fromEdge = edges.find((e) => e.toConnectorId === toConnectorId && IsTransport(e.toConnector) && IsOffPage(e.fromNode));
  if (fromEdge) return nodes.find((n) => n.id === fromEdge.fromNodeId);

  const toEdge = edges.find((e) => e.fromConnectorId === fromConnectorId && IsTransport(e.fromConnector) && IsOffPage(e.toNode));
  if (toEdge) return nodes.find((n) => n.id === toEdge.toNodeId);
}
