import { EdgeEvent } from "../../../models/project";
import { SaveEventData } from "../../../redux/store/localStorage/localStorage";

/**
 * Hook that runs when a user starts dragging a connection from a terminal.
 * @param e
 * @param params
 */
const onConnectStart = (e, { nodeId, handleType, handleId }) => {
  e.preventDefault();

  const eventdata = {
    nodeId: nodeId,
    handleType: handleType,
    sourceId: handleId,
  } as EdgeEvent;

  SaveEventData(eventdata, "edgeEvent");
};

export default onConnectStart;
