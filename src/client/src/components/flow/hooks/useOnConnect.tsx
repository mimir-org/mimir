import { EdgeType, EDGE_TYPE } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";
import { CreateId, IsPartOfTerminal, UpdateSiblingIndexOnEdgeConnect } from "../helpers";
import { addEdge } from "react-flow-renderer";
import { createEdge } from "../../../redux/store/project/actions";
import { Connector, Edge, Project } from "../../../models";
import { ConvertToEdge } from "../converters";
import { LibraryState } from "../../../redux/store/library/types";

const useOnConnect = (
  params: any,
  project: Project,
  setElements: any,
  dispatch: any,
  edgeType: EdgeType,
  library: LibraryState
) => {
  SaveEventData(null, "edgeEvent");
  const createdId = CreateId();
  const sourceNode = project.nodes.find((node) => node.id === params.source);
  const targetNode = project.nodes.find((node) => node.id === params.target);

  let sourceConn: Connector;
  let targetConn: Connector;
  let currentEdge: Edge;

  project.nodes?.forEach((node) => {
    node.connectors?.forEach((conn) => {
      if (conn.id === params.sourceHandle) sourceConn = conn;
      if (conn.id === params.targetHandle) targetConn = conn;
    });
  });

  const existingEdge = project.edges?.find(
    (edge) =>
      edge.fromConnectorId === params.sourceHandle.id &&
      edge.toConnectorId === params.targetHandle.id &&
      edge.fromNodeId === sourceNode.id &&
      edge.toNodeId === targetNode.id &&
      edge.isHidden === targetNode.isHidden
  );

  if (!existingEdge) {
    currentEdge = ConvertToEdge(createdId, sourceConn, targetConn, sourceNode, targetNode, project.id, library);
    dispatch(createEdge(currentEdge));
  } else currentEdge = existingEdge;

  if (IsPartOfTerminal(currentEdge.fromConnector)) {
    UpdateSiblingIndexOnEdgeConnect(currentEdge, project, dispatch);
  }

  return setElements((els) => {
    return addEdge(
      {
        ...params,
        id: createdId,
        type: edgeType,
        arrowHeadType: null,
        label: "",
        animated: edgeType === EDGE_TYPE.TRANSPORT,
        data: {
          source: sourceNode,
          target: targetNode,
          edge: currentEdge,
        },
      },
      els
    );
  });
};

export default useOnConnect;
