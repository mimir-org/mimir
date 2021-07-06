import { EdgeType, EDGE_TYPE } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";
import { CreateId } from "../helpers/common";
import { addEdge } from "react-flow-renderer";
import { createEdge } from "../../../redux/store/project/actions";
import { Connector, Edge, Node } from "../../../models";

const useOnConnect = (
  params,
  project,
  setElements,
  dispatch,
  edgeType: EdgeType
) => {
  SaveEventData(null, "edgeEvent");
  const createdId = CreateId();

  const sourceNode = project.nodes.find(
    (node: Node) => node.id === params.source
  ) as Node;

  const targetNode = project.nodes.find(
    (node: Node) => node.id === params.target
  ) as Node;

  let fromConnector: Connector;
  let toConnector: Connector;
  let currentEdge: Edge;

  project.nodes?.forEach((node: Node) => {
    node.connectors?.forEach((conn: Connector) => {
      if (conn.id === params.sourceHandle) fromConnector = conn;
      if (conn.id === params.targetHandle) toConnector = conn;
    });
  });

  const existingEdge = project.edges?.find(
    (edge: Edge) =>
      edge.fromConnectorId === params.sourceHandle.id &&
      edge.toConnectorId === params.targetHandle.id &&
      edge.fromNodeId === sourceNode.id &&
      edge.toNodeId === targetNode.id &&
      edge.isHidden === targetNode.isHidden
  );

  if (!existingEdge) {
    const edge = {
      id: createdId,
      fromConnectorId: fromConnector.id,
      fromConnector: fromConnector,
      toConnectorId: toConnector?.id,
      toConnector: toConnector,
      fromNodeId: sourceNode.id,
      fromNode: sourceNode,
      toNodeId: targetNode.id,
      toNode: targetNode,
      isHidden: sourceNode.isHidden,
      masterProjectId: project.id,
    } as Edge;

    currentEdge = edge;
    dispatch(createEdge(edge));
  } else {
    currentEdge = existingEdge;
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
