import { Dispatch } from "redux";
import { EdgeEvent } from "../../../../models/project";
import { LoadEventData, SaveEventData } from "../../../../redux/store/localStorage";
import { Connector, Project, Node } from "@mimirorg/modelbuilder-types";
import { setValidation } from "../../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../../assets/text/TextResources";
import { IsTerminal } from "../../../../services";

const useOnConnectStop = (e: MouseEvent, project: Project, dispatch: Dispatch) => {
  e.preventDefault();
  const edgeEvent = LoadEventData("edgeEvent") as EdgeEvent;
  if (!edgeEvent) return;

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  const sourceNode = nodes.find((n) => n.id === edgeEvent.nodeId);
  const sourceConnector = sourceNode?.connectors.find((conn) => conn.id === edgeEvent.sourceId);
  const [_, targetConnector] = ResolveTarget(project, e);

  const existingEdge = edges.find(
    (edge) =>
      (edge.fromConnectorId === sourceConnector?.id && IsTerminal(edge.fromConnector)) ||
      (edge.toConnectorId === sourceConnector?.id && IsTerminal(edge.toConnector)) ||
      (edge.fromConnectorId === targetConnector?.id && IsTerminal(edge.fromConnector)) ||
      (edge.toConnectorId === targetConnector?.id && IsTerminal(edge.toConnector))
  );

  if (existingEdge) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));
    return;
  }

  if (
    IsTerminal(sourceConnector) &&
    IsTerminal(targetConnector) &&
    sourceConnector.terminalTypeId !== targetConnector.terminalTypeId
  ) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_TERMINALS }));
    return;
  }

  SaveEventData(null, "edgeEvent");
};

export const ResolveTarget = (project: Project, e: MouseEvent): [targetNode: Node, targetConnector: Connector] => {
  let data: [Node, Connector] = [null, null];

  const element = e.target as HTMLElement;
  if (element == null) return data;

  const targetNodeId = element.getAttribute("data-nodeid");
  const targetConnectorId = element.getAttribute("data-handleid");
  const targetNode = project?.nodes.find((x) => x.id === targetNodeId);
  const targetConnector = targetNode?.connectors.find((x) => x.id === targetConnectorId);
  data = [targetNode, targetConnector];
  return data;
};

export default useOnConnectStop;
