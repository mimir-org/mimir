import { Dispatch } from "redux";
import { EdgeEvent } from "../../../../models/project";
import { LoadEventData, SaveEventData } from "../../../../redux/store/localStorage";
import { Project } from "@mimirorg/modelbuilder-types";
import { IsTerminal } from "../../helpers/Connectors";
import { setValidation } from "../../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../../assets/text/TextResources";

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
