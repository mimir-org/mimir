import { EdgeEvent } from "../../../models/project";
import { createEdge, addNode } from "../../../redux/store/project/actions";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { CreateOffPageNode } from "../block/helpers";
import { CreateOffPageData } from "../block/helpers/CreateOffPageNode";
import { Project } from "../../../models";

const useOnConnectStop = (e, project: Project, dispatch: any) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const offPageData = {
      sourceNodeId: edgeEvent.nodeId,
      sourceConnectorId: edgeEvent.sourceId,
      x: e.clientX,
      y: e.clientY,
    } as CreateOffPageData;

    const node = CreateOffPageNode(project, offPageData);

    dispatch(addNode(node.node));
    dispatch(createEdge(node.partOfEdge));
    dispatch(createEdge(node.transportEdge));

    SaveEventData(null, "edgeEvent");
  }
};

export default useOnConnectStop;
