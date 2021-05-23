import { Edge, EdgeType, EDGE_TYPE, Node } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";
import { CreateId } from "../helpers";
import { addEdge, ArrowHeadType } from "react-flow-renderer";
import { createEdge } from "../../../redux/store/project/actions";

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
  let existingEdge = null;

  if (project.edges) {
    existingEdge = project.edges.find(
      (x) =>
        x.fromConnector === params.sourceHandle &&
        x.toConnector === params.targetHandle &&
        x.fromNode === sourceNode.id &&
        x.toNode === targetNode.id &&
        x.isHidden === targetNode.isHidden
    );
  }

  if (!existingEdge) {
    const edge: Edge = {
      id: createdId,
      fromConnector: params.sourceHandle,
      toConnector: params.targetHandle,
      fromNode: sourceNode.id,
      toNode: targetNode.id,
      isHidden: sourceNode.isHidden,
      parentType: sourceNode.type,
      targetType: targetNode.type,
    };
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
        arrowHeadType: ArrowHeadType.ArrowClosed,
        label: "",
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
