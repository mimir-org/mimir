import { Connection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text";
import { IsOffPage } from "../../../../../helpers";
import { Connector, Node, Project } from "../../../../../models";
import { setValidation } from "../../../../../redux/store/validation/validationSlice";
import { IsLocationConnection, IsProductConnection } from "../../../helpers";

/**
 * Function to check if a connection/edge in BlockView is valid.
 * @param connection
 * @param project
 * @param dispatch
 * @returns a boolean value.
 */
const IsValidBlockConnection = (connection: Connection, project: Project, dispatch: Dispatch) => {
  const sourceNode = project.nodes.find((x) => x.id === connection.source);
  const sourceTerminal = sourceNode.connectors.find((x) => x.id === connection.sourceHandle);
  const targetNode = project.nodes.find((x) => x.id === connection.target);
  const targetTerminal = targetNode?.connectors.find((x) => x.id === connection.targetHandle);

  const isOffPage = IsOffPage(sourceNode) || IsOffPage(targetNode);
  const isRelations = IsProductConnection(sourceTerminal, targetTerminal) || IsLocationConnection(sourceTerminal, targetTerminal);

  const isValidNode = ValidateNode(sourceTerminal, targetTerminal);
  const isValidConnector = !isRelations ? ValidateConnectors(sourceTerminal, targetTerminal, project) : true;
  const isValidRelationsConnector = isRelations ? ValidateRelationsConnectors(sourceTerminal, targetTerminal, project) : true;
  const isValidOffPage = isOffPage ? ValidateOffPageNode(sourceNode, targetNode) : true;

  document.addEventListener(
    "mouseup",
    () =>
      onMouseUp(
        sourceTerminal,
        targetTerminal,
        isValidNode,
        isValidOffPage,
        isValidConnector,
        isValidRelationsConnector,
        dispatch
      ),
    { once: true }
  );

  return isValidNode && isValidOffPage && isValidConnector && isValidRelationsConnector;
};

function ValidateOffPageNode(sourceNode: Node, targetNode: Node) {
  return IsOffPage(sourceNode) && IsOffPage(targetNode);
}

function ValidateNode(sourceTerminal: Connector, targetTerminal: Connector) {
  return sourceTerminal?.terminalTypeId === targetTerminal?.terminalTypeId;
}

function ValidateRelationsConnectors(source: Connector, target: Connector, project: Project) {
  return !project.edges.some((edge) => edge.fromConnectorId === source.id && edge.toConnectorId === target.id);
}

function ValidateConnectors(source: Connector, target: Connector, project: Project) {
  return !project.edges.some(
    (edge) =>
      edge.fromConnectorId === source.id ||
      edge.toConnectorId === source.id ||
      edge.fromConnectorId === target.id ||
      edge.toConnectorId === target.id
  );
}

const onMouseUp = (
  sourceTerminal: Connector,
  targetTerminal: Connector,
  validNode: boolean,
  validOffPageNode: boolean,
  validConnectors: boolean,
  validRelationsConnectors: boolean,
  dispatch: Dispatch
) => {
  if (!sourceTerminal || !targetTerminal) return;
  if (!validNode) dispatch(setValidation({ valid: false, message: TextResources.Validation_Terminals }));
  if (!validOffPageNode) dispatch(setValidation({ valid: false, message: TextResources.Validation_OffPage }));
  if (!validConnectors) dispatch(setValidation({ valid: false, message: TextResources.Validation_Connectors }));
  if (!validRelationsConnectors)
    dispatch(setValidation({ valid: false, message: TextResources.Validation_Relations_Connectors }));

  return document.removeEventListener("mouseup", () =>
    onMouseUp(sourceTerminal, targetTerminal, validNode, validOffPageNode, validConnectors, validRelationsConnectors, dispatch)
  );
};

export default IsValidBlockConnection;
