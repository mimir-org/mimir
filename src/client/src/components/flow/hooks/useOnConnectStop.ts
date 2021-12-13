import { EdgeEvent } from "../../../models/project";
import { createEdge, addNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { BuildOffPageNode } from "../block/builders";
import { OffPageData } from "../block/builders/BuildOffPageNode";
import { Project, Node } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { IsOutputTerminal } from "../helpers";

const useOnConnectStop = (e, project: Project, dispatch: any) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);
    const sourceConnector = sourceNode.connectors.find((conn) => conn.id === edgeEvent.sourceId);
    const isTarget = IsOutputTerminal(sourceConnector);
    const validDrop = ValidateOffPageDrop(e.clientX, e.clientY, sourceNode, isTarget);

    if (validDrop) {
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

function ValidateOffPageDrop(clientX: number, clientY: number, sourceNode: Node, isTarget: boolean) {
  const leftBound = GetLeftBoundary(isTarget);
  const rightBound = GetRightBoundary(isTarget, leftBound);

  return !IsOffPage(sourceNode) && clientX > leftBound && clientX < rightBound;
}

function GetLeftBoundary(isTarget: boolean) {
  const margin = 120;
  return isTarget ? window.innerWidth - margin : 0;
}

function GetRightBoundary(isTarget: boolean, leftBound: number) {
  const dropZoneWidth = 100;
  return isTarget ? leftBound + dropZoneWidth : 350;
}

export default useOnConnectStop;
