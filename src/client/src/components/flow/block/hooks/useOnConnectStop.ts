import { Dispatch } from "redux";
import { EdgeEvent } from "../../../../models/project";
// import { LoadEventData, SaveEventData } from "../../../../redux/store/localStorage";
// import { setValidation } from "../../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../../assets/text/TextResources";
import { AspectObject, Connector, ConnectorTerminal, Project } from "lib";

const useOnConnectStop = (e: MouseEvent, project: Project, dispatch: Dispatch) => {
  e.preventDefault();
  const edgeEvent = null; // = LoadEventData("edgeEvent") as EdgeEvent;
  if (!edgeEvent) return;

  const nodes = project?.aspectObjects ?? [];
  const edges = project?.connections ?? [];

  const sourceNode = nodes.find((n) => n.id === edgeEvent.nodeId);
  const sourceConnector = sourceNode?.connectors.find((conn) => conn.id === edgeEvent.sourceId);
  const [_, targetConnector] = ResolveTarget(project, e);

  const existingEdge = edges.find(
    (edge) =>
      edge.fromConnector === sourceConnector?.id ||
      edge.toConnector === sourceConnector?.id ||
      edge.fromConnector === targetConnector?.id ||
      edge.toConnector === targetConnector?.id
  );

  if (existingEdge) {
    // dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));
    return;
  }

  if (
    sourceConnector instanceof ConnectorTerminal &&
    targetConnector instanceof ConnectorTerminal &&
    sourceConnector.terminalType !== targetConnector.terminalType
  ) {
    // dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_TERMINALS }));
    return;
  }

  // SaveEventData(null, "edgeEvent");
};

export const ResolveTarget = (project: Project, e: MouseEvent): [targetNode: AspectObject, targetConnector: Connector] => {
  let data: [AspectObject, Connector] = [null, null];

  const element = e.target as HTMLElement;
  if (element == null) return data;

  const targetNodeId = element.getAttribute("data-nodeid");
  const targetConnectorId = element.getAttribute("data-handleid");
  const targetNode = project?.aspectObjects.find((x) => x.id === targetNodeId);
  const targetConnector = targetNode?.connectors.find((x) => x.id === targetConnectorId);
  data = [targetNode, targetConnector];
  return data;
};

export default useOnConnectStop;
