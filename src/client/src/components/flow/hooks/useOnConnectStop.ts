import { BlockNodeSize, EdgeEvent } from "../../../models/project";
import { createEdge, addNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { BuildOffPageNode } from "../block/builders";
import { OffPageData } from "../block/builders/BuildOffPageNode";
import { Project, Node } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { GetParent, IsOutputTerminal } from "../helpers";

const useOnConnectStop = (e, project: Project, parentNodeSize: BlockNodeSize, dispatch: any) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);
    const sourceConnector = sourceNode.connectors.find((conn) => conn.id === edgeEvent.sourceId);
    const parentBlockNode = GetParent(sourceNode);
    const isTarget = IsOutputTerminal(sourceConnector);
    const validDrop = IsValidDrop(sourceNode, e.clientX, parentNodeSize, isTarget, parentBlockNode?.positionBlockX);

    if (validDrop) {
      const offPageData = {
        sourceNode: sourceNode,
        sourceConnector: sourceConnector,
        position: { x: e.clientX, y: e.clientY },
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

function IsValidDrop(sourceNode: Node, clientX: number, parentNodeSize: BlockNodeSize, isTarget: boolean, parentXPos: number) {
  const marginX = 90;
  clientX += marginX;

  const leftBound = isTarget ? parentXPos + parentNodeSize?.width : parentXPos;
  const dropZoneWidth = 200;
  const rightBound = leftBound + dropZoneWidth;

  const validLeftBound = isTarget
    ? clientX > leftBound && clientX < rightBound
    : clientX < leftBound && clientX > leftBound - dropZoneWidth;

  return !IsOffPage(sourceNode) && validLeftBound;
}

export default useOnConnectStop;
