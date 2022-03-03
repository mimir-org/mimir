import { addEdge } from "react-flow-renderer";
import { IsOffPage } from "../../../../helpers";
import { Node } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { createEdge, removeEdge, removeNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { ConvertToEdge } from "../../converters";
import { CreateId, GetParent, IsTransport } from "../../helpers";
import { Params } from "../useOnConnectBlock";

/**
 * Component to handle a connection between two OffPageNodes.
 * After the connection is complete the OffPageNodes are deleted, and one new transport edge is created.
 * @param params
 * @param sourceNode
 * @param targetNode
 * @returns a transport edge between the parents of the OffPageNodes.
 */
export const HandleOffPageConnect = (params: Params, sourceNode: Node, targetNode: Node) => {
  const { project, connection, library, dispatch, setElements } = params;
  const id = CreateId();
  const sourceParent = GetParent(sourceNode);
  const targetParent = GetParent(targetNode);

  const sourceTerminal = project.edges.find(
    (x) => x.fromConnector.nodeId === sourceParent.id && IsTransport(x.fromConnector) && x.toConnector.nodeId === sourceNode.id
  ).fromConnector;

  const targetTerminal = project.edges.find(
    (x) => x.toConnector.nodeId === targetParent.id && IsTransport(x.toConnector) && x.fromConnector.nodeId === targetNode.id
  ).toConnector;

  const edge = ConvertToEdge(id, sourceTerminal, targetTerminal, sourceParent, targetParent, project.id, library);
  dispatch(createEdge(edge));

  project.edges.forEach((x) => {
    if (IsOffPage(x.fromNode) || IsOffPage(x.toNode)) dispatch(removeEdge(x.id));
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
