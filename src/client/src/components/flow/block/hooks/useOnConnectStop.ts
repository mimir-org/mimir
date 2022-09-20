import { Dispatch } from "redux";
import { EdgeEvent } from "../../../../models/project";
import { LoadEventData, SaveEventData } from "../../../../redux/store/localStorage";
import { Project } from "@mimirorg/modelbuilder-types";
import { IsTerminal } from "../../helpers/Connectors";
import { setValidation } from "../../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../../assets/text/TextResources";

/**
 * Hook that runs when a user drags a connection line from a terminal and releases the mouse button in BlockView.
 * If a connection is completed between two terminals, the hook useOnConnect runs.
 * An OffPageNode is created if the connection line is released within the dropzone for an OffPageNode.
 * The dropzone is located to the left or right of the ParentBlockNode, depending on the OffPageNode type.
 * @param e
 * @param project
 * @param dispatch
 */
const useOnConnectStop = (e: MouseEvent, project: Project, dispatch: Dispatch) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;
  if (!edgeEvent) return;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  const sourceNode = nodes.find((n) => n.id === edgeEvent.nodeId);
  const sourceConnector = sourceNode?.connectors.find((conn) => conn.id === edgeEvent.sourceId);

  const existingEdge = edges.find(
    (edge) =>
      (edge.fromConnectorId === sourceConnector.id && IsTerminal(edge.fromConnector)) ||
      (edge.toConnectorId === sourceConnector.id && IsTerminal(edge.toConnector))
  );

  if (existingEdge) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));
    return;
  }

  SaveEventData(null, "edgeEvent");
};

export default useOnConnectStop;
