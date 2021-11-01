import { EdgeEvent } from "../../../models/project";
import { createEdge, addNode } from "../../../redux/store/project/actions";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { CreateOffPageNode } from "../block/helpers";
import { CreateOffPageData } from "../block/helpers/CreateOffPageNode";
import { Project } from "../../../models";

const useOnConnectStop = (e, project: Project, reactFlowInstance, nodeId: string, dispatch: any) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const position = reactFlowInstance.project({
      x: e.clientX,
      y: e.clientY,
    });

    const createOffPageData = {
      parentNodeId: nodeId,
      fromNodeId: edgeEvent.nodeId,
      fromConnectorId: edgeEvent.sourceId,
      x: position.x,
      y: position.y,
    } as CreateOffPageData;

    const node = CreateOffPageNode(project, createOffPageData);

    dispatch(addNode(node.node));
    dispatch(createEdge(node.partOfEdge));
    dispatch(createEdge(node.transportEdge));

    SaveEventData(null, "edgeEvent");
  }
};

export default useOnConnectStop;
