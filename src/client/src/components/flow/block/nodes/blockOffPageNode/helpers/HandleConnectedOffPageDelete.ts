import { Dispatch } from "redux";
import { IsOffPage } from "../../../../../../helpers";
import { Edge, Project } from "../../../../../../models";
import { removeEdge, removeNode } from "../../../../../../redux/store/project/actions";
import { GetParent } from "../../../../helpers";
import { getOffPagePartOfEdge } from "./HandleOffPageDelete";

/**
 * Component to handle deleting a Connected OffPageNode. All related OffPage nodes and edges are removed.
 * @param project
 * @param transportEdge
 * @param referenceEdge
 * @param dispatch
 */
const HandleConnectedOffPageDelete = (project: Project, transportEdge: Edge, referenceEdge: Edge, dispatch: Dispatch) => {
  // When deleting a Connected OffPageNode, the actual edge that the OffPageNode refers to is also deleted
  dispatch(removeEdge(referenceEdge.id));
  dispatch(removeEdge(transportEdge.id));

  // The opposite Connected OffPageNode and edges are also deleted
  const oppositeTransportEdge = project.edges.find(
    (x) =>
      (IsOffPage(x.fromNode) || IsOffPage(x.toNode)) &&
      (x.fromConnectorId === referenceEdge.fromConnectorId || x.toConnectorId === referenceEdge.toConnectorId)
  );

  const oppositeOffPageNode = IsOffPage(oppositeTransportEdge.toNode)
    ? oppositeTransportEdge.toNode
    : oppositeTransportEdge.fromNode;

  const oppositePartOfEdge = getOffPagePartOfEdge(oppositeOffPageNode, GetParent(oppositeOffPageNode), project);

  dispatch(removeNode(oppositeOffPageNode.id));
  dispatch(removeEdge(oppositeTransportEdge.id));
  dispatch(removeEdge(oppositePartOfEdge.id));
};

export default HandleConnectedOffPageDelete;
