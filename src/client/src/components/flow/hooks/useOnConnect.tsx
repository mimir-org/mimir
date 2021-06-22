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
  let fromConnector = null;
  let toConnector = null;
  let currentEdge = null;

  // TODO: refactor
  for (let i = 0; i < project.nodes.length; i++) {
    for (let j = 0; j < project.nodes[i].connectors.length; j++) {
      if (project.nodes[i].connectors[j].id === params.sourceHandle)
        fromConnector = project.nodes[i].connectors[j];

      if (project.nodes[i].connectors[j].id === params.targetHandle)
        toConnector = project.nodes[i].connectors[j];
    }
  }

  const existingEdge = project.edges?.find(
    (x) =>
      x.fromConnectorId === params.sourceHandle.id &&
      x.toConnectorId === params.targetHandle.id &&
      x.fromNodeId === sourceNode.id &&
      x.toNodeId === targetNode.id &&
      x.isHidden === targetNode.isHidden
  );

  if (!existingEdge) {
    const edge = {
      id: createdId,
      fromConnectorId: fromConnector.id,
      fromConnector: fromConnector,
      toConnectorId: toConnector.id,
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
