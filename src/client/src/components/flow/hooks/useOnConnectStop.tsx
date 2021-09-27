import { EdgeEvent } from "../../../models/project";
import {
  LoadEventData,
  SaveEventData,
} from "../../../redux/store/localStorage";

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
    // const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();

    // const position = reactFlowInstance.project({
    //   x: e.clientX - reactFlowBounds?.left,
    //   y: e.clientY - reactFlowBounds?.top,
    // });

    // const node = CreateOffPageNode(
    //   projectState,
    //   createOffPageData
    // ) as OffPageNodeCreator;

    // dispatch(addNode(node.node));
    // dispatch(createEdge(node.partOfEdge));
    // dispatch(createEdge(node.transportEdge));

    SaveEventData(null, "edgeEvent");
  }
};

export default useOnConnectStop;
