import { Dispatch } from "redux";
import { IsOffPage } from "../../../../../../helpers";
import { Edge, Project } from "../../../../../../models";
import { removeEdge, removeNode } from "../../../../../../redux/store/project/actions";
import { GetParent } from "../../../../helpers";
import { IsOffPageEdge } from "../../../helpers";
import { GetPartOfEdge } from "./HandleOffPageDelete";

/**
 * Component to handle deleting a Connected OffPageNode. All related OffPage nodes and edges are removed.
 * A Connected OffPageNode is a node that appears if a node is connected to a node that is not displayed on the screen.
 * When deleting a Connected OffPageNode, the actual edge that the OffPageNode refers to is removed.
 * The opposite Connected OffPageNode and edges are also removed.
 * @param project
 * @param transportEdge
 * @param referenceEdge
 * @param dispatch
 */
const HandleConnectedOffPageDelete = (project: Project, transportEdge: Edge, referenceEdge: Edge, dispatch: Dispatch) => {
  dispatch(removeEdge(referenceEdge.id));
  dispatch(removeEdge(transportEdge.id));

  const oppositeTransportEdge = project.edges.find(
    (x) =>
      IsOffPageEdge(x) && (x.fromConnectorId === referenceEdge.fromConnectorId || x.toConnectorId === referenceEdge.toConnectorId)
  );

  const oppositeOffPageNode = IsOffPage(oppositeTransportEdge.toNode)
    ? oppositeTransportEdge.toNode
    : oppositeTransportEdge.fromNode;

  const oppositePartOfEdge = GetPartOfEdge(oppositeOffPageNode, GetParent(oppositeOffPageNode), project);

  dispatch(removeNode(oppositeOffPageNode?.id));
  dispatch(removeEdge(oppositeTransportEdge?.id));
  dispatch(removeEdge(oppositePartOfEdge?.id));
};

export default HandleConnectedOffPageDelete;
