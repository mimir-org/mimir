import { EdgeType, EDGE_TYPE } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";
import { CreateId } from "../helpers/common";
import { addEdge } from "react-flow-renderer";
import { createEdge } from "../../../redux/store/project/actions";
import { Edge, Node } from "../../../models";

const useOnConnect = (
  params,
  project,
  setElements,
  dispatch,
  edgeType: EdgeType
) => {
  SaveEventData(null, "edgeEvent");

  const createdId = CreateId();
  const sourceNode = project.nodes.find((x) => x.id === params.source) as Node;
  const targetNode = project.nodes.find((x) => x.id === params.target) as Node;
  let currentEdge = null;

  const existingEdge = project.edges?.find(
    (x) =>
      x.fromConnectorId === params.sourceHandle.id &&
      x.toConnectorId === params.targetHandle.id &&
      x.fromConnector === params.sourceHandle &&
      x.toConnector === params.targetHandle &&
      x.fromNodeId === sourceNode.id &&
      x.toNodeId === targetNode.id &&
      x.toNode === targetNode &&
      x.fromNode === sourceNode &&
      x.isHidden === targetNode.isHidden
  );

  if (!existingEdge) {
    const edge = {
      id: createdId,
      fromConnectorId: params.sourceHandle.id,
      fromConnector: params.sourceHandle,
      toConnectorId: params.targetHandle.id,
      toConnector: params.targetHandle,
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
