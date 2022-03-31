import { Dispatch } from "redux";
import { HandleConnectedOffPageDelete } from ".";
import { IsOffPage } from "../../../../../../helpers/CheckTypes";
import { Connector, Edge, Node, Project } from "../../../../../../models";
import { removeEdge, setOffPageStatus } from "../../../../../../redux/store/project/actions";
import { GetParent } from "../../../../helpers";
import { IsPartOfTerminal, IsTransport } from "../../../../helpers/CheckConnectorTypes";

/**
 * Component to handle deleting an OffPageNode. There are two kinds of OffPage nodes -> Required and Connected.
 * A Connected OffPage node is pointing to another node that is not visible on the screen, this is handled by
 * the HandleConnectedOffPageDelete component.
 * @param project
 * @param node
 * @param dispatch
 */
const HandleOffPageDelete = (project: Project, node: Node, dispatch: Dispatch) => {
  const parentNode = GetParent(node);
  if (!parentNode) return;

  const transportEdge = GetTransportEdge(node, parentNode, project);
  const partOfEdge = GetPartOfEdge(node, parentNode, project);
  const parentConnector = GetParentConnector(transportEdge, node);
  const connectedEdge = GetConnectedEdge(parentConnector, project);

  if (transportEdge && !connectedEdge) dispatch(setOffPageStatus(parentNode.id, parentConnector.id, false));
  if (connectedEdge) HandleConnectedOffPageDelete(project, transportEdge, connectedEdge, dispatch);
  if (partOfEdge) dispatch(removeEdge(partOfEdge.id));
};

function GetTransportEdge(node: Node, parentNode: Node, project: Project) {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNode.id && IsTransport(x?.fromConnector) && x.toConnector?.nodeId === node.id) ||
      (x.toConnector?.nodeId === parentNode.id && IsTransport(x?.toConnector) && x.fromConnector?.nodeId === node.id)
  );
}

function GetConnectedEdge(connector: Connector, project: Project) {
  return project.edges.find(
    (edge) =>
      (edge.fromConnectorId === connector?.id && !IsOffPage(edge.toNode)) ||
      (edge.toConnectorId === connector?.id && !IsOffPage(edge.fromNode))
  );
}

export function GetPartOfEdge(node: Node, parentNode: Node, project: Project) {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNode.id && IsPartOfTerminal(x?.fromConnector) && x.toConnector?.nodeId === node.id) ||
      (x.toConnector?.nodeId === parentNode.id && IsPartOfTerminal(x?.toConnector) && x.fromConnector?.nodeId === node.id)
  );
}

export function GetParentConnector(transportEdge: Edge, node: Node) {
  return transportEdge?.fromConnector?.nodeId === node.id ? transportEdge?.toConnector : transportEdge?.fromConnector;
}

export default HandleOffPageDelete;
