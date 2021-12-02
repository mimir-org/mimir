import { BlockNodeSize, EdgeEvent } from "../../../models/project";
import { createEdge, addNode } from "../../../redux/store/project/actions";
import { LoadEventData, SaveEventData } from "../../../redux/store/localStorage";
import { CreateOffPageNode } from "../block/helpers";
import { CreateOffPageData } from "../block/helpers/CreateOffPageNode";
import { Project } from "../../../models";
import { IsOffPage } from "../../../helpers";
import { Size } from "../../../compLibrary/size";

const useOnConnectStop = (e, project: Project, dispatch: any, parentSize: BlockNodeSize) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;

  if (edgeEvent) {
    const sourceNode = project.nodes.find((n) => n.id === edgeEvent.nodeId);

    // Calculate the boundaries for OffPage dropzone
    const marginOffPageX = parentSize.width / 10;
    const leftBound = parentSize.width + Size.BlockMarginX - marginOffPageX;
    const rightBound = parentSize.width + Size.BlockMarginX - marginOffPageX + 200;
    const validDrop = !IsOffPage(sourceNode) && e.clientX > leftBound && e.clientX < rightBound;

    if (validDrop) {
      const offPageData = {
        sourceNodeId: edgeEvent.nodeId,
        sourceConnectorId: edgeEvent.sourceId,
        x: e.clientX,
        y: e.clientY,
      } as CreateOffPageData;

      const offPageNode = CreateOffPageNode(sourceNode, offPageData);

      dispatch(addNode(offPageNode.node));
      dispatch(createEdge(offPageNode.partOfEdge));
      dispatch(createEdge(offPageNode.transportEdge));

      SaveEventData(null, "edgeEvent");
    }
  }
};

export default useOnConnectStop;
