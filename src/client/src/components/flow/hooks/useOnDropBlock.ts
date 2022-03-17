import { addNode, createEdge } from "../../../redux/store/project/actions";
import { ConvertToEdge, ConvertToNode } from "../converters";
import { Size } from "../../../compLibrary/size/Size";
import { LibraryState } from "../../../redux/store/library/types";
import { GetSelectedNode, IsFamily, IsLocation, IsProduct } from "../../../helpers";
import { Dispatch } from "redux";
import { Elements, FlowTransform, OnLoadParams } from "react-flow-renderer";
import { Attribute, BlobData, Connector, ConnectorVisibility, LibItem, Node, Project, Simple, User } from "../../../models";
import {
  CreateId,
  IsInputTerminal,
  IsOutputTerminal,
  IsLocationTerminal,
  IsPartOf,
  SetSiblingIndexOnNodeDrop,
  IsProductTerminal,
} from "../helpers";

export const DATA_TRANSFER_APPDATA_TYPE = "application/reactflow";

interface OnDropParameters {
  event: React.DragEvent<HTMLDivElement>;
  project: Project;
  user: User;
  icons: BlobData[];
  library: LibraryState;
  secondaryNode: Node;
  flowTransform: FlowTransform;
  reactFlowInstance: OnLoadParams;
  reactFlowWrapper: React.MutableRefObject<HTMLDivElement>;
  setElements: React.Dispatch<React.SetStateAction<Elements>>;
  dispatch: Dispatch;
}

/**
 * Hook that runs when a Node from the LibraryModule is dropped onto the Mimir canvas in BlockView.
 * A partOf Edge is created from the dropped Node to its parent.
 * The parent is the selectedNode or the secondaryParentNode.
 * @param params
 */
const useOnDropBlock = (params: OnDropParameters) => {
  const { event } = params;

  event.stopPropagation();
  event.preventDefault();

  if (DoesNotContainApplicationData(event)) return;

  handleNodeDrop(params);
};

const handleNodeDrop = ({ event, project, user, icons, library, secondaryNode, flowTransform, dispatch }: OnDropParameters) => {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibItem;
  let parentNode = GetSelectedNode();

  const position = { x: event.clientX, y: event.clientY };
  const targetNode = ConvertToNode(data, position, project.id, icons, user);

  if (!secondaryNode && !IsFamily(parentNode, targetNode)) return;

  // Handle drop in SplitView
  if (secondaryNode) {
    const dropZone = CalculateSecondaryNodeDropZone(flowTransform);
    parentNode = FindParent(targetNode, parentNode, secondaryNode, dropZone, event.clientX);
    if (!parentNode) return;
  }

  targetNode.simples?.forEach((simple) => initSimple(simple, targetNode));
  targetNode.connectors?.forEach((connector) => initConnector(connector, targetNode));
  targetNode.attributes?.forEach((attribute) => initNodeAttributes(attribute, targetNode));
  if (IsFamily(parentNode, targetNode)) handleCreatePartOfEdge(parentNode, targetNode, project, library, dispatch);

  dispatch(addNode(targetNode));
};

/**
 * Function to define the dropzone for a SecondaryNode.
 * A Node will have the SecondaryNode as parent if dropped over its area.
 * @param transform
 * @returns an X position where the SecondaryNode is placed.
 */
function CalculateSecondaryNodeDropZone(transform: FlowTransform) {
  const parentNodeWidthScaled = Size.BLOCK_NODE_WIDTH * transform.zoom;
  return transform.x + Size.SPLITVIEW_DISTANCE + parentNodeWidthScaled;
}

/**
 * Function to determine which parentNode in SplitView that will the parent of a dropped Node.
 * @param targetNode
 * @param selectedNode
 * @param secondaryNode
 * @param dropZone
 * @param clientX
 * @returns a Node.
 */
function FindParent(targetNode: Node, selectedNode: Node, secondaryNode: Node, dropZone: number, clientX: number) {
  if (!IsFamily(targetNode, selectedNode) && !IsFamily(targetNode, secondaryNode)) return null;
  if (!IsFamily(targetNode, selectedNode)) return secondaryNode;
  if (!IsFamily(targetNode, secondaryNode)) return selectedNode;
  return clientX < dropZone ? selectedNode : secondaryNode;
}

const handleCreatePartOfEdge = (
  sourceNode: Node,
  targetNode: Node,
  project: Project,
  library: LibraryState,
  dispatch: Dispatch
) => {
  targetNode.level = sourceNode.level + 1;
  const sourceConn = sourceNode.connectors?.find((x) => IsPartOf(x) && IsOutputTerminal(x));
  const targetConn = targetNode.connectors?.find((x) => IsPartOf(x) && IsInputTerminal(x));
  const partofEdge = ConvertToEdge(CreateId(), sourceConn, targetConn, sourceNode, targetNode, project.id, library);

  SetSiblingIndexOnNodeDrop(targetNode, project, sourceNode);
  dispatch(createEdge(partofEdge));
};

const initSimple = (simple: Simple, targetNode: Node) => {
  const simpleId = CreateId();
  simple.id = simpleId;
  simple.nodeId = targetNode.id;
  simple.attributes.forEach((a) => {
    a.simpleId = simpleId;
  });
};

const initConnector = (connector: Connector, targetNode: Node) => {
  connector.id = CreateId();
  connector.nodeId = targetNode.id;
  connector.attributes?.forEach((a) => {
    a.id = CreateId();
  });

  setInitConnectorVisibility(connector, targetNode);
};

const initNodeAttributes = (attribute: Attribute, targetNode: Node) => {
  attribute.nodeId = targetNode.id;
  attribute.id = CreateId();
};

const DoesNotContainApplicationData = (event: React.DragEvent<HTMLDivElement>) =>
  !event.dataTransfer.types.includes(DATA_TRANSFER_APPDATA_TYPE);

function setInitConnectorVisibility(conn: Connector, targetNode: Node) {
  const isLocationConn = IsLocation(targetNode) && IsLocationTerminal(conn);
  const isProductConn = IsProduct(targetNode) && IsProductTerminal(conn);

  // Location and Product terminals are visible by default.
  if (isLocationConn || isProductConn) {
    if (IsInputTerminal(conn)) conn.connectorVisibility = ConnectorVisibility.InputVisible;
    if (IsOutputTerminal(conn)) conn.connectorVisibility = ConnectorVisibility.OutputVisible;
  } else conn.connectorVisibility = ConnectorVisibility.None;
}

export default useOnDropBlock;
