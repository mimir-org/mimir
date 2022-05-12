import { Dispatch } from "redux";
import { Edge, Node } from "../../../../models";
import { HandleRequiredOffPageDelete } from "./HandleRequiredOffPageDelete";
import { HandleConnectedOffPageDelete } from "./HandleConnectedOffPageDelete";
import { GetOffPageTransportEdge } from "./OffPageDeleteFunctions";

/**
 * Component to handle deleting an OffPageNode. There are two kinds of OffPage nodes -> Required and Connected.
 * A Required OffPageNode is deleted along with its transport edge and partOf edge, through HandleRequiredOffPageDelete.
 * A Connected OffPageNode is handled by HandleConnectedOffPageDelete.
 * @param offPageNode
 * @param nodes
 * @param edges
 * @param dispatch
 */
export const HandleOffPageNodeDelete = (offPageNode: Node, nodes: Node[], edges: Edge[], dispatch: Dispatch) => {
  const parentNodeId = offPageNode?.parentNodeId;
  if (!parentNodeId) return;

  const transportEdge = GetOffPageTransportEdge(offPageNode.id, parentNodeId, edges);

  return offPageNode.isOffPageRequired
    ? HandleRequiredOffPageDelete(offPageNode, transportEdge, parentNodeId, edges, dispatch)
    : HandleConnectedOffPageDelete(offPageNode, transportEdge, nodes, edges, dispatch);
};
