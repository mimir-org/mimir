import { EdgeEvent } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";

const onConnectStart = (e, { nodeId, handleType, handleId }) => {
  //   e.preventDefault();

  const eventdata = {
    nodeId: nodeId,
    handleType: handleType,
    sourceId: handleId,
  } as EdgeEvent;

  SaveEventData(eventdata, "edgeEvent");
};

export default onConnectStart;
