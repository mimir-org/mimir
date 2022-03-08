import { Connection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { IsLocation, IsOffPage, IsProduct } from "../../../../../helpers";
import { Connector, Node, Project } from "../../../../../models";
import { setValidation } from "../../../../../redux/store/validation/validationSlice";

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
  const isValidTerminalType = ValidateTerminalType(sourceTerminal, targetTerminal);
  const isRelation = IsLocation(sourceNode) || IsLocation(targetNode) || IsProduct(sourceNode) || IsProduct(targetNode);
  const isValidConnector = !isRelation ? ValidateTerminalHasNoEdge(sourceTerminal, targetTerminal, project) : true;
  const isValidOffPage = isOffPage ? ValidateOffPageNode(sourceNode, targetNode) : true;

  document.addEventListener(
    "mouseup",
    () => onMouseUp(sourceTerminal, targetTerminal, isValidTerminalType, isValidOffPage, isValidConnector, dispatch),
    { once: true }
  );

  return isValidTerminalType && isValidOffPage && isValidConnector;
};

function ValidateOffPageNode(sourceNode: Node, targetNode: Node) {
  return IsOffPage(sourceNode) && IsOffPage(targetNode);
}

function ValidateTerminalType(sourceTerminal: Connector, targetTerminal: Connector) {
  return sourceTerminal?.terminalTypeId === targetTerminal?.terminalTypeId;
}

function ValidateTerminalHasNoEdge(source: Connector, target: Connector, project: Project) {
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
  validTerminalType: boolean,
  validOffPageNode: boolean,
  validConnectors: boolean,
  dispatch: Dispatch
) => {
  if (!sourceTerminal || !targetTerminal) return;
  if (!validTerminalType) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_TERMINALS }));
  if (!validOffPageNode) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_OFFPAGE }));
  if (!validConnectors) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_ONE_CONNECTION }));

  return document.removeEventListener("mouseup", () =>
    onMouseUp(sourceTerminal, targetTerminal, validTerminalType, validOffPageNode, validConnectors, dispatch)
  );
};

export default IsValidBlockConnection;
