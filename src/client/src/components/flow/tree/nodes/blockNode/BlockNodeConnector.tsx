import { Handle, Connection as FlowConnection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { HandleBox } from "./BlockNode.styled";
import { TerminalIcon } from "../../../block/terminals/components/helpers/TerminalIcon";
import { Aspect, AspectObject, Connector, ConnectorDirection, Project, Connection } from "lib";
import { ConnectorPartOf } from "../../../../../lib/classes/Connector";

interface Props {
  project: Project;
  node: AspectObject;
  connector: Connector;
  dispatch: Dispatch;
  isElectroView: boolean;
  isParent: boolean;
  visible: boolean;
}

/**
 * Component for a BlockNode connector. React Flow's connector is of the type Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const BlockNodeConnector = ({ project, node, connector, dispatch, isElectroView, isParent, visible }: Props) => {
  const [type, pos] = connector.GetHandleType();
  const color = connector.getColor();
  const className = "react-flow__handle-block";

  return (
    <HandleBox
      id={`handle-${connector.id}`}
      visible={visible}
      top={GetHandleTopPosition(node, connector, isElectroView, isParent)}
      left={GetHandleLeftPosition(node, connector, isElectroView, isParent)}
      isPartOf={connector instanceof ConnectorPartOf}
      onMouseEnter={null}
      onMouseLeave={null}
    >
      <TerminalIcon connector={connector} color={color} className={className} isElectroView={isElectroView} />
      <Handle
        type={type}
        position={pos}
        id={connector.id}
        className={className}
        isValidConnection={(connection) =>
          IsValidBlockConnection(connection, project.aspectObjects, project.connections, dispatch)
        }
      />
    </HandleBox>
  );
};

/**
 * Function to check if a connection/edge in BlockView is valid.
 * @param connection
 * @param nodes
 * @param edges
 * @param dispatch
 * @returns a boolean value.
 */
export const IsValidBlockConnection = (
  connection: FlowConnection,
  nodes: AspectObject[],
  edges: Connection[],
  dispatch: Dispatch
) => {
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
  // if (!validTransport || !validRelation) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_CONNECTION }));

  return document.removeEventListener("mouseup", () =>
    onMouseUp(sourceTerminal, targetTerminal, validTransport, validRelation, dispatch)
  );
};

/**
 * Component to get the left position of a connector in BlockView.
 * This component is called from the BlockNodeTerminal.
 * @param node
 * @param connector
 * @param isElectro
 * @param isParent
 * @returns a string representing the left position.
 */
export const GetHandleLeftPosition = (node: AspectObject, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (connector instanceof ConnectorPartOf) return "revert";
  if (isElectro) return GetElectroLeftPosition(node, connector, isParent);
  return isParent ? "50%" : "46%";
};

/**
 * Component to get the top position of a connector in BlockView.
 * This component is called from the BlockNodeTerminal.
 * @param node
 * @param connector
 * @param isElectro
 * @param isParent
 * @returns
 */
export const GetHandleTopPosition = (node: AspectObject, connector: Connector, isElectro: boolean, isParent: boolean) => {
  if (!(connector instanceof ConnectorPartOf)) return "0px";
  if (isElectro) return GetElectroTopPosition(isParent);

  if (connector.direction === ConnectorDirection.Input) return isParent ? 100 + "px" : "0px";
  if (connector.direction === ConnectorDirection.Output) return isParent ? "0px" : "115px";
};

function GetElectroLeftPosition(node: AspectObject, connector: Connector, isParent: boolean) {
  if (isParent) return connector.direction === ConnectorDirection.Input ? 100 + "px" : "0px";
  return connector.direction === ConnectorDirection.Input ? "0px" : "180x";
}

function GetElectroTopPosition(isParent: boolean) {
  if (isParent) return "500px";
  return "50px";
}
