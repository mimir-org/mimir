import { addEdge } from "react-flow-renderer";
import { GetParent } from "../../../../helpers/Family";
import { Project } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { createEdge, removeEdge, removeNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { ConvertDataToEdge } from "../../converters";
import { CreateId } from "../../helpers";
import { IsTransport } from "../../helpers/Connectors";
import { Params } from "../hooks/useOnConnect";
import { IsOffPageEdge } from "./";

/**
 * Component to handle a connection between two OffPageNodes.
 * When the connection is completed the OffPageNodes are deleted,
 * and one new transport edge is created between the parents of the OffPageNodes.
 * This component is called from the useOnConnect hook.
 * @param params
 * @param sourceNodeId
 * @param targetNodeId
 * @returns a transport edge between the parents of the OffPageNodes.
 */
const HandleOffPageConnect = (params: Params, sourceNodeId: string, targetNodeId: string) => {
  const { project, connection, lib, dispatch, setEdges } = params;
  const id = CreateId();
  const sourceParent = GetParent(sourceNodeId, project);
  const targetParent = GetParent(targetNodeId, project);

  const sourceTerminal = GetSourceTerminal(project, sourceParent?.id, sourceNodeId);
  const targetTerminal = GetTargetTerminal(project, targetParent?.id, targetNodeId);

  if (!sourceTerminal || !targetTerminal) return null;

  const edge = ConvertDataToEdge(id, sourceTerminal, targetTerminal, sourceParent, targetParent, project.id, lib);
  dispatch(createEdge(edge));

  project.edges.forEach((e) => {
    if (IsOffPageEdge(e)) dispatch(removeEdge(e.id));
  });

  const isRequired = false;
  dispatch(removeNode(sourceNodeId));
  dispatch(removeNode(targetNodeId));
  dispatch(setOffPageStatus(sourceParent.id, sourceTerminal.id, isRequired));
  dispatch(setOffPageStatus(targetParent.id, targetTerminal.id, isRequired));

  return setEdges((els) => {
    return addEdge(
      { ...connection, id, type: EDGE_TYPE.BLOCK_OFFPAGE, data: { source: sourceParent, target: targetParent, edge } },
      els
    );
  });
};

function GetSourceTerminal(project: Project, sourceParentId: string, sourceNodeId: string) {
  const sourceTerminal = project.edges.find(
    (e) => e.fromConnector.nodeId === sourceParentId && IsTransport(e.fromConnector) && e.toConnector.nodeId === sourceNodeId
  ).fromConnector;

  return sourceTerminal ?? null;
}

function GetTargetTerminal(project: Project, targetParentId: string, targetNodeId: string) {
  const targetTerminal = project.edges.find(
    (e) => e.toConnector.nodeId === targetParentId && IsTransport(e.toConnector) && e.fromConnector.nodeId === targetNodeId
  ).toConnector;

  return targetTerminal ?? null;
}

export default HandleOffPageConnect;
