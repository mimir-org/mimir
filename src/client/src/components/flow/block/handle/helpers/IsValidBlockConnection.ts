import { Connection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { IsLocation, IsOffPage, IsProduct } from "../../../../../helpers/Aspects";
import { Connector, Node, Edge } from "../../../../../models";
import { setValidation } from "../../../../../redux/store/validation/validationSlice";
import { IsLocationTerminal, IsProductTerminal } from "../../../helpers/Connectors";

/**
 * Function to check if a connection/edge in BlockView is valid.
 * @param connection
 * @param nodes
 * @param edges
 * @param dispatch
 * @returns a boolean value.
 */
const IsValidBlockConnection = (connection: Connection, nodes: Node[], edges: Edge[], dispatch: Dispatch) => {
  const sourceNode = nodes.find((n) => n.id === connection.source);
  const sourceTerminal = sourceNode?.connectors.find((c) => c.id === connection.sourceHandle);
  const targetNode = nodes.find((n) => n.id === connection.target);
  const targetTerminal = targetNode?.connectors.find((c) => c.id === connection.targetHandle);

  const isValidTerminalType = ValidateTerminalType(sourceTerminal, targetTerminal);
  const isValidOffPage = ValidateOffPageNode(sourceNode, targetNode);
  const isValidTransport = ValidateTransport(sourceTerminal, targetTerminal, sourceNode, targetNode, edges);
  const isValidRelation = ValidateRelation(sourceTerminal, targetTerminal, sourceNode, targetNode, edges);

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

function ValidateTransport(source: Connector, target: Connector, sourceNode: Node, targetNode: Node, edges: Edge[]) {
  if (IsRelationNode(sourceNode) || IsRelationNode(targetNode)) return true;

  return !edges.some(
    (edge) =>
      edge.fromConnectorId === source.id ||
      edge.toConnectorId === source.id ||
      edge.fromConnectorId === target.id ||
      edge.toConnectorId === target.id
  );
}

function ValidateRelation(source: Connector, target: Connector, sourceNode: Node, targetNode: Node, edges: Edge[]) {
  if (IsRelationNode(sourceNode)) {
    const existingEdge = edges.find((e) => e.toConnectorId === target.id && IsRelationTerminal(e.toConnector));
    if (existingEdge) return false;
  }
  if (IsRelationNode(targetNode)) {
    const existingEdge = edges.find((e) => e.fromConnectorId === source.id && IsRelationTerminal(e.fromConnector));
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
