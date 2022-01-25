import { Dispatch } from "redux";
import { HandleConnectedOffPageDelete } from ".";
import { IsOffPage } from "../../../../../../helpers";
import { Connector, Edge, Node, Project } from "../../../../../../models";
import { removeEdge, setOffPageStatus } from "../../../../../../redux/store/project/actions";
import { GetParent, IsPartOf, IsTransport } from "../../../../helpers";

/**
 * Component to handle deleting an OffPageNode. There are two kinds of OffPage nodes -> Required and Connected
 * A Connected OffPage node is pointing to another node that is not visible on the screen, this is handled by
 * the HandleConnectedOffPageDelete component.
 * @param project
 * @param node
 * @param dispatch
 */
const HandleOffPageDelete = (project: Project, node: Node, dispatch: Dispatch) => {
  const parentNode = GetParent(node);
  const offPageTransportEdge = getOffPageTransportEdge(node, parentNode, project);
  const offPagePartOfEdge = getOffPagePartOfEdge(node, parentNode, project);
  const parentNodeConnector = getParentNodeConnector(offPageTransportEdge, node);
  const offPageConnectedReferenceEdge = getOffPageConnectedReferenceEdge(parentNodeConnector, project);

  if (offPageTransportEdge && !offPageConnectedReferenceEdge) {
    const parentConnectorIsRequired = false;
    dispatch(setOffPageStatus(parentNode.id, parentNodeConnector.id, parentConnectorIsRequired));
  }

  if (offPageConnectedReferenceEdge)
    HandleConnectedOffPageDelete(project, offPageTransportEdge, offPageConnectedReferenceEdge, dispatch);

  if (offPagePartOfEdge) dispatch(removeEdge(offPagePartOfEdge.id));
};

function getOffPageTransportEdge(node: Node, parentNode: Node, project: Project) {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNode.id && IsTransport(x?.fromConnector) && x.toConnector?.nodeId === node.id) ||
      (x.toConnector?.nodeId === parentNode.id && IsTransport(x?.toConnector) && x.fromConnector?.nodeId === node.id)
  );
}

function getOffPageConnectedReferenceEdge(parentNodeConnector: Connector, project: Project) {
  return project.edges.find(
    (edge) =>
      (edge.fromConnectorId === parentNodeConnector?.id && !IsOffPage(edge.toNode)) ||
      (edge.toConnectorId === parentNodeConnector?.id && !IsOffPage(edge.fromNode))
  );
}

export function getParentNodeConnector(offPageTransportEdge: Edge, node: Node) {
  return offPageTransportEdge?.fromConnector?.nodeId === node.id
    ? offPageTransportEdge?.toConnector
    : offPageTransportEdge?.fromConnector;
}

export function getOffPagePartOfEdge(node: Node, parentNode: Node, project: Project) {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNode.id && IsPartOf(x?.fromConnector) && x.toConnector?.nodeId === node.id) ||
      (x.toConnector?.nodeId === parentNode.id && IsPartOf(x?.toConnector) && x.fromConnector?.nodeId === node.id)
  );
}

export default HandleOffPageDelete;
