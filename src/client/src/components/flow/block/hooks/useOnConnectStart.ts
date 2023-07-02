import React from "react";
import { EdgeEvent } from "../../../../models/project";
// import { SaveEventData } from "../../../../redux/store/localStorage/localStorage";

/**
 * Hook that runs when a user starts dragging a connection from a terminal in BlockView.
 * @param e
 * @param params
 */
const useOnConnectStart = (e: React.MouseEvent, { nodeId, handleType, handleId }) => {
  e.preventDefault();

  const eventdata = { nodeId, handleType, sourceId: handleId } as EdgeEvent;
  // SaveEventData(eventdata, "edgeEvent");
};

export default useOnConnectStart;
