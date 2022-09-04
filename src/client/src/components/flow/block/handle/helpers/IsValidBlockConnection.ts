import { Node, Edge, Connector } from "@mimirorg/modelbuilder-types";
import { Connection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { IsLocation, IsOffPage, IsProduct } from "../../../../../helpers/Aspects";
import { setValidation } from "../../../../../redux/store/validation/validationSlice";
import { IsLocationRelation, IsProductRelation } from "../../../helpers/Connectors";

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

  const isValidOffPage = ValidateOffPageNode(sourceNode, targetNode);
  const isValidTransport = ValidateTransport(sourceTerminal, targetTerminal, sourceNode, targetNode, edges);
  const isValidRelation = ValidateRelation(sourceTerminal, targetTerminal, sourceNode, targetNode, edges);

  document.addEventListener(
    "mouseup",
    () => onMouseUp(sourceTerminal, targetTerminal, isValidOffPage, isValidTransport, isValidRelation, dispatch),
    { once: true }
  );

  return isValidOffPage && isValidTransport && isValidRelation;
};

function IsRelationNode(node: Node) {
  return IsLocation(node) || IsProduct(node);
}

function IsRelationConnector(connector: Connector) {
  return IsLocationRelation(connector) || IsProductRelation(connector);
}

function ValidateOffPageNode(sourceNode: Node, targetNode: Node) {
  if (!IsOffPage(sourceNode) || !IsOffPage(targetNode)) return true;
  return IsOffPage(sourceNode) && IsOffPage(targetNode);
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
    const existingEdge = edges.find((e) => e.toConnectorId === target.id && IsRelationConnector(e.toConnector));
    if (existingEdge) return false;
  }
  if (IsRelationNode(targetNode)) {
    const existingEdge = edges.find((e) => e.fromConnectorId === source.id && IsRelationConnector(e.fromConnector));
    if (existingEdge) return false;
  }
  return true;
}

const onMouseUp = (
  sourceTerminal: Connector,
  targetTerminal: Connector,
  validOffPageNode: boolean,
  validTransport: boolean,
  validRelation: boolean,
  dispatch: Dispatch
) => {
  if (!sourceTerminal || !targetTerminal) return;
  if (!validOffPageNode) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_OFFPAGE }));
  if (!validTransport || !validRelation) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));

  return document.removeEventListener("mouseup", () =>
    onMouseUp(sourceTerminal, targetTerminal, validOffPageNode, validTransport, validRelation, dispatch)
  );
};

export default IsValidBlockConnection;
