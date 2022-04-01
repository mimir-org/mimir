import { Dispatch } from "redux";
import { HandleConnectedOffPageDelete } from ".";
import { IsOffPage } from "../../../../../../helpers/Aspects";
import { GetParent } from "../../../../../../helpers/Family";
import { Connector, Edge, Node, Project } from "../../../../../../models";
import { removeEdge, setOffPageStatus } from "../../../../../../redux/store/project/actions";
import { IsPartOfTerminal, IsTransport } from "../../../../helpers/Connectors";

/**
 * Component to handle deleting an OffPageNode. There are two kinds of OffPage nodes -> Required and Connected.
 * A Connected OffPage node is pointing to another node that is not visible on the screen, this is handled by
 * the HandleConnectedOffPageDelete component.
 * @param project
 * @param node
 * @param dispatch
 */
const HandleOffPageDelete = (project: Project, node: Node, dispatch: Dispatch) => {
  const parentNode = GetParent(node?.id, project);
  if (!parentNode) return;

  const transportEdge = GetTransportEdge(node?.id, parentNode?.id, project);
  const partOfEdge = GetPartOfEdge(node?.id, parentNode?.id, project);
  const parentConnector = GetParentConnector(transportEdge, node?.id);
  const connectedEdge = GetConnectedEdge(parentConnector, project);

  if (transportEdge && !connectedEdge) dispatch(setOffPageStatus(parentNode?.id, parentConnector.id, false));
  if (connectedEdge) HandleConnectedOffPageDelete(project, transportEdge, connectedEdge, dispatch);
  if (partOfEdge) dispatch(removeEdge(partOfEdge.id));
};

function GetTransportEdge(nodeId: string, parentNodeId: string, project: Project) {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNodeId && IsTransport(x?.fromConnector) && x.toConnector?.nodeId === nodeId) ||
      (x.toConnector?.nodeId === parentNodeId && IsTransport(x?.toConnector) && x.fromConnector?.nodeId === nodeId)
  );
}

function GetConnectedEdge(connector: Connector, project: Project) {
  return project.edges.find(
    (edge) =>
      (edge.fromConnectorId === connector?.id && !IsOffPage(edge.toNode)) ||
      (edge.toConnectorId === connector?.id && !IsOffPage(edge.fromNode))
  );
}

export function GetPartOfEdge(nodeId: string, parentNodeId: string, project: Project) {
  return project.edges.find(
    (x) =>
      (x.fromConnector?.nodeId === parentNodeId && IsPartOfTerminal(x?.fromConnector) && x.toConnector?.nodeId === nodeId) ||
      (x.toConnector?.nodeId === parentNodeId && IsPartOfTerminal(x?.toConnector) && x.fromConnector?.nodeId === nodeId)
  );
}

export function GetParentConnector(transportEdge: Edge, nodeId: string) {
  return transportEdge?.fromConnector?.nodeId === nodeId ? transportEdge?.toConnector : transportEdge?.fromConnector;
}

export default HandleOffPageDelete;
