import { Edge, EDGE_TYPE, Node } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";
import { CreateId } from "../helpers";
import { addEdge, ArrowHeadType } from "react-flow-renderer";
import { createEdge } from "../../../redux/store/project/actions";

const useOnConnect = (params, projectState, setElements, dispatch) => {
  SaveEventData(null, "edgeEvent");

  const createdId = CreateId();
  const sourceNode = projectState.project.nodes.find(
    (x) => x.id === params.source
  ) as Node;
  const targetNode = projectState.project.nodes.find(
    (x) => x.id === params.target
  ) as Node;

  let currentEdge = null;

  const existingEdge = projectState.project.edges.find(
    (x) =>
      x.fromConnector === params.sourceHandle &&
      x.toConnector === params.targetHandle &&
      x.fromNode === sourceNode.id &&
      x.toNode === targetNode.id &&
      x.isHidden === targetNode.isHidden
  );

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
        type: EDGE_TYPE.DEFAULT,
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
