import { EdgeEvent } from "../../../models/project";
import { createEdge, addNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { BuildOffPageNode } from "../block/builders";
import { OffPageData } from "../block/builders/BuildOffPageNode";
import { Project, Node } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { IsInputTerminal } from "../helpers";

const useOnConnectStop = (e, project: Project, dispatch: any) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);

    const validDrop = ValidateOffPageDrop(e.clientX, e.clientY, sourceNode, edgeEvent);

    if (validDrop) {
      const offPageData = {
        sourceNodeId: edgeEvent.nodeId,
        sourceConnectorId: edgeEvent.sourceId,
        x: e.clientX,
        y: e.clientY + 30,
      } as OffPageData;

      const offPageObject = BuildOffPageNode(sourceNode, offPageData);

      dispatch(addNode(offPageObject.node));
      dispatch(createEdge(offPageObject.partOfEdge));
      dispatch(createEdge(offPageObject.transportEdge));
      dispatch(setOffPageStatus(edgeEvent.nodeId, edgeEvent.sourceId, true));

      SaveEventData(null, "edgeEvent");
    }
  }
};

function ValidateOffPageDrop(clientX: number, clientY: number, sourceNode: Node, edgeEvent: EdgeEvent) {
  const sourceConnector = sourceNode.connectors.find((conn) => conn.id === edgeEvent.sourceId);
  console.log({ sourceConnector });

  // Calculate the boundaries for OffPage dropzone
  const dropZoneWidth = 100;
  const leftBound = IsInputTerminal(sourceConnector) ? 0 : window.innerWidth - 120;
  const rightBound = IsInputTerminal(sourceConnector) ? 350 : leftBound + dropZoneWidth;

  return !IsOffPage(sourceNode) && clientX > leftBound && clientX < rightBound;
}

export default useOnConnectStop;
