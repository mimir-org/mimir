import { EdgeEvent } from "../../../models/project";
import { createEdge, addNode } from "../../../redux/store/project/actions";
import {
  LoadEventData,
  SaveEventData,
} from "../../../redux/store/localStorage";
import {
  CreateOffPageData,
  CreateOffPageNode,
  OffPageNodeCreator,
} from "../helpers";

const useOnConnectStop = (
  e,
  projectState,
  reactFlowInstance,
  nodeId,
  reactFlowWrapper,
  dispatch
) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();

    const position = reactFlowInstance.project({
      x: e.clientX - reactFlowBounds?.left,
      y: e.clientY - reactFlowBounds?.top,
    });

    const createOffPageData = {
      parentNodeId: nodeId,
      fromNodeId: edgeEvent.nodeId,
      fromConnectorId: edgeEvent.sourceId,
      x: position.x,
      y: position.y,
    } as CreateOffPageData;

    const node = CreateOffPageNode(
      projectState,
      createOffPageData
    ) as OffPageNodeCreator;

    dispatch(addNode(node.node));
    dispatch(createEdge(node.partOfEdge));
    dispatch(createEdge(node.transportEdge));

    SaveEventData(null, "edgeEvent");
  }
};

export default useOnConnectStop;
