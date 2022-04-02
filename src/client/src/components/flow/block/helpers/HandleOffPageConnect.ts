import { addEdge } from "react-flow-renderer";
import { Node, Project } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { createEdge, removeEdge, removeNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { ConvertToEdge } from "../../converters";
import { CreateId, GetParent, IsTransport } from "../../helpers";
import { Params } from "../hooks/useOnConnect";
import { IsOffPageEdge } from "./";

/**
 * Component to handle a connection between two OffPageNodes.
 * When the connection is completed the OffPageNodes are deleted,
 * and one new transport edge is created between the parents of the OffPageNodes.
 * This component is called from the useOnConnect hook.
 * @param params
 * @param sourceNode
 * @param targetNode
 * @returns a transport edge between the parents of the OffPageNodes.
 */
const HandleOffPageConnect = (params: Params, sourceNode: Node, targetNode: Node) => {
  const { project, connection, library, dispatch, setElements } = params;
  const id = CreateId();
  const sourceParent = GetParent(sourceNode?.id);
  const targetParent = GetParent(targetNode?.id);

  const sourceTerminal = GetSourceTerminal(project, sourceParent, sourceNode);
  const targetTerminal = GetTargetTerminal(project, targetParent, targetNode);

  if (!sourceTerminal || !targetTerminal) return null;

  const edge = ConvertToEdge(id, sourceTerminal, targetTerminal, sourceParent, targetParent, project.id, library);
  dispatch(createEdge(edge));

  project.edges.forEach((e) => {
    if (IsOffPageEdge(e)) dispatch(removeEdge(e.id));
  });

  const isRequired = false;
  dispatch(removeNode(sourceNode.id));
  dispatch(removeNode(targetNode.id));
  dispatch(setOffPageStatus(sourceParent.id, sourceTerminal.id, isRequired));
  dispatch(setOffPageStatus(targetParent.id, targetTerminal.id, isRequired));

  return setElements((els) => {
    return addEdge(
      {
        ...connection,
        id: id,
        type: EDGE_TYPE.BLOCK_OFFPAGE,
        data: {
          source: sourceParent,
          target: targetParent,
          edge: edge,
        },
      },
      els
    );
  });
};

export default HandleOffPageConnect;

function GetSourceTerminal(project: Project, sourceParent: Node, sourceNode: Node) {
  const sourceTerminal = project.edges.find(
    (x) => x.fromConnector.nodeId === sourceParent.id && IsTransport(x.fromConnector) && x.toConnector.nodeId === sourceNode.id
  ).fromConnector;

  return sourceTerminal ?? null;
}

function GetTargetTerminal(project: Project, targetParent: Node, targetNode: Node) {
  const targetTerminal = project.edges.find(
    (x) => x.toConnector.nodeId === targetParent.id && IsTransport(x.toConnector) && x.fromConnector.nodeId === targetNode.id
  ).toConnector;

  return targetTerminal ?? null;
}
