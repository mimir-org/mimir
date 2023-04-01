import { Aspect, AspectObject, Connection, Connector } from "lib";
import { Connection as FlowConnection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { setValidation } from "../../../../../redux/store/validation/validationSlice";

/**
 * Function to check if a connection/edge in BlockView is valid.
 * @param connection
 * @param nodes
 * @param edges
 * @param dispatch
 * @returns a boolean value.
 */
const IsValidBlockConnection = (connection: FlowConnection, nodes: AspectObject[], edges: Connection[], dispatch: Dispatch) => {
  const sourceNode = nodes.find((n) => n.id === connection.source);
  const sourceTerminal = sourceNode?.connectors.find((c) => c.id === connection.sourceHandle);
  const targetNode = nodes.find((n) => n.id === connection.target);
  const targetTerminal = targetNode?.connectors.find((c) => c.id === connection.targetHandle);

  const isValidTransport = ValidateTransport(sourceTerminal, targetTerminal, sourceNode, targetNode, edges);
  const isValidRelation = ValidateRelation(sourceTerminal, targetTerminal, sourceNode, targetNode, edges);

  document.addEventListener(
    "mouseup",
    () => onMouseUp(sourceTerminal, targetTerminal, isValidTransport, isValidRelation, dispatch),
    { once: true }
  );

  return isValidTransport && isValidRelation;
};

function IsRelationNode(node: AspectObject) {
  return node.aspect === Aspect.Location || node.aspect === Aspect.Product;
}

function ValidateTransport(
  source: Connector,
  target: Connector,
  sourceNode: AspectObject,
  targetNode: AspectObject,
  edges: Connection[]
) {
  if (IsRelationNode(sourceNode) || IsRelationNode(targetNode)) return true;

  return !edges.some(
    (edge) =>
      edge.fromConnector === source.id ||
      edge.toConnector === source.id ||
      edge.fromConnector === target.id ||
      edge.toConnector === target.id
  );
}

function ValidateRelation(
  source: Connector,
  target: Connector,
  sourceNode: AspectObject,
  targetNode: AspectObject,
  edges: Connection[]
) {
  if (IsRelationNode(sourceNode)) {
    const existingEdge = edges.find((e) => e.toConnector === target.id);
    if (existingEdge) return false;
  }
  if (IsRelationNode(targetNode)) {
    const existingEdge = edges.find((e) => e.fromConnector === source.id);
    if (existingEdge) return false;
  }
  return true;
}

const onMouseUp = (
  sourceTerminal: Connector,
  targetTerminal: Connector,
  validTransport: boolean,
  validRelation: boolean,
  dispatch: Dispatch
) => {
  if (!sourceTerminal || !targetTerminal) return;
  if (!validTransport || !validRelation) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));

  return document.removeEventListener("mouseup", () =>
    onMouseUp(sourceTerminal, targetTerminal, validTransport, validRelation, dispatch)
  );
};

export default IsValidBlockConnection;
