import { BlockNodeSize, EdgeEvent } from "../../../models/project";
import { createEdge, addNode, setOffPageStatus } from "../../../redux/store/project/actions";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { BuildOffPageNode } from "../block/builders";
import { OffPageData } from "../block/builders/BuildOffPageNode";
import { Project } from "../../../models";
import { IsOffPage } from "../../../helpers";

const useOnConnectStop = (e, project: Project, dispatch: any, parentSize: BlockNodeSize) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);

    // Calculate the boundaries for OffPage dropzone
    const pixelCorrection = parentSize.width / 10;
    const dropZoneWidth = 100;
    const leftBound = parentSize.width + 450 - pixelCorrection; // TODO: fix magic numbers
    const rightBound = leftBound + dropZoneWidth;
    const validDrop = !IsOffPage(sourceNode) && e.clientX > leftBound && e.clientX < rightBound;

    if (validDrop) {
      const offPageData = {
        sourceNodeId: edgeEvent.nodeId,
        sourceConnectorId: edgeEvent.sourceId,
        x: e.clientX,
        y: e.clientY,
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

export default useOnConnectStop;
