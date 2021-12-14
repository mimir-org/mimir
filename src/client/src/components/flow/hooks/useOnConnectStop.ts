import { EdgeEvent } from "../../../models/project";
import { createEdge, addNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { BuildOffPageNode } from "../block/builders";
import { OffPageData } from "../block/builders/BuildOffPageNode";
import { Project } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { IsOutputTerminal } from "../helpers";

const useOnConnectStop = (e, project: Project, dispatch: any) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);
    const sourceConnector = sourceNode.connectors.find((conn) => conn.id === edgeEvent.sourceId);
    const isTarget = IsOutputTerminal(sourceConnector);

    if (!IsOffPage(sourceNode)) {
      const offPageData = {
        sourceNode: sourceNode,
        sourceConnector: sourceConnector,
        position: { x: e.clientX, y: e.clientY },
        isTarget: isTarget,
      } as OffPageData;

      const offPageObject = BuildOffPageNode(offPageData);

      dispatch(addNode(offPageObject.node));
      dispatch(createEdge(offPageObject.partOfEdge));
      dispatch(createEdge(offPageObject.transportEdge));
      dispatch(setOffPageStatus(edgeEvent.nodeId, edgeEvent.sourceId, true));

      SaveEventData(null, "edgeEvent");
    }
  }
};

export default useOnConnectStop;
