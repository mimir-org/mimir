import { Connection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { IsLocation, IsOffPage, IsProduct } from "../../../../../helpers";
import { Connector, Node, Project } from "../../../../../models";
import { setValidation } from "../../../../../redux/store/validation/validationSlice";
import { IsLocationTerminal, IsProductTerminal } from "../../../helpers";

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

  const isValidTerminalType = ValidateTerminalType(sourceTerminal, targetTerminal);
  const isValidOffPage = ValidateOffPageNode(sourceNode, targetNode);
  const isValidTransport = ValidateTransport(sourceTerminal, targetTerminal, sourceNode, targetNode, project);
  const isValidRelation = ValidateRelation(sourceTerminal, targetTerminal, sourceNode, targetNode, project);

  document.addEventListener(
    "mouseup",
    () =>
      onMouseUp(sourceTerminal, targetTerminal, isValidTerminalType, isValidOffPage, isValidTransport, isValidRelation, dispatch),
    { once: true }
  );

  return isValidTerminalType && isValidOffPage && isValidTransport && isValidRelation;
};

function IsRelationNode(node: Node) {
  return IsLocation(node) || IsProduct(node);
}

function IsRelationTerminal(connector: Connector) {
  return IsLocationTerminal(connector) || IsProductTerminal(connector);
}

function ValidateOffPageNode(sourceNode: Node, targetNode: Node) {
  if (!IsOffPage(sourceNode) || !IsOffPage(targetNode)) return true;
  return IsOffPage(sourceNode) && IsOffPage(targetNode);
}

function ValidateTerminalType(sourceTerminal: Connector, targetTerminal: Connector) {
  return sourceTerminal?.terminalTypeId === targetTerminal?.terminalTypeId;
}

function ValidateTransport(source: Connector, target: Connector, sourceNode: Node, targetNode: Node, project: Project) {
  if (IsRelationNode(sourceNode) || IsRelationNode(targetNode)) return true;

  return !project.edges.some(
    (edge) =>
      edge.fromConnectorId === source.id ||
      edge.toConnectorId === source.id ||
      edge.fromConnectorId === target.id ||
      edge.toConnectorId === target.id
  );
}

function ValidateRelation(source: Connector, target: Connector, sourceNode: Node, targetNode: Node, project: Project) {
  if (IsRelationNode(sourceNode)) {
    const existingEdge = project.edges.find((x) => x.toConnectorId === target.id && IsRelationTerminal(x.toConnector));
    if (existingEdge) return false;
  }
  if (IsRelationNode(targetNode)) {
    const existingEdge = project.edges.find((x) => x.fromConnectorId === source.id && IsRelationTerminal(x.fromConnector));
    if (existingEdge) return false;
  }
  return true;
}

const onMouseUp = (
  sourceTerminal: Connector,
  targetTerminal: Connector,
  validTerminalType: boolean,
  validOffPageNode: boolean,
  validTransport: boolean,
  validRelation: boolean,
  dispatch: Dispatch
) => {
  if (!sourceTerminal || !targetTerminal) return;
  if (!validTerminalType) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_TERMINALS }));
  if (!validOffPageNode) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_OFFPAGE }));
  if (!validTransport || !validRelation) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));

  return document.removeEventListener("mouseup", () =>
    onMouseUp(sourceTerminal, targetTerminal, validTerminalType, validOffPageNode, validTransport, validRelation, dispatch)
  );
};

export default IsValidBlockConnection;
