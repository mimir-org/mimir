import { addNode, createEdge } from "../../../redux/store/project/actions";
import { ConvertToEdge, ConvertToNode } from "../converters";
import { Size } from "../../../compLibrary/size";
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
 * The parent is the selectedBlockNode or the secondaryParentNode.
 * @param params
 */
const useOnDrop = (params: OnDropParameters) => {
  const { event } = params;

  event.stopPropagation();
  event.preventDefault();

  if (DoesNotContainApplicationData(event)) return;

  handleNodeDrop(params);
};

const handleNodeDrop = ({ event, project, user, icons, library, secondaryNode, flowTransform, dispatch }: OnDropParameters) => {
  const data = JSON.parse(event.dataTransfer.getData(DATA_TRANSFER_APPDATA_TYPE)) as LibItem;
  let parentNode = GetSelectedNode();

  if (secondaryNode) {
    const dropZone = CalculateSecondaryNodeDropZone(flowTransform);
    parentNode = FindParent(parentNode, secondaryNode, dropZone, event.clientX);
  }

  const position = { x: event.clientX, y: event.clientY };
  const targetNode = ConvertToNode(data, position, project.id, icons, user);

  targetNode.simples?.forEach((simple) => initSimple(simple, targetNode));
  targetNode.connectors?.forEach((connector) => initConnector(connector, targetNode));
  targetNode.attributes?.forEach((attribute) => initNodeAttributes(attribute, targetNode));
  if (IsFamily(parentNode, targetNode)) handleCreatePartOfEdge(parentNode, targetNode, project, library, dispatch);

  dispatch(addNode(targetNode));
};

/**
 * A Node will have the SecondaryNode as parent if dropped over its area.
 * @param transform
 * @returns an X position where the SecondaryNode is placed.
 */
function CalculateSecondaryNodeDropZone(transform: FlowTransform) {
  const parentNodeWidthScaled = Size.BLOCK_NODE_WIDTH * transform.zoom;
  return transform.x + Size.SPLITVIEW_DISTANCE + parentNodeWidthScaled;
}

function FindParent(selectedNode: Node, secondaryNode: Node, dropZone: number, clientX: number) {
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
  const sourceConn = sourceNode.connectors?.find((x) => IsPartOf(x) && !IsInputTerminal(x));
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

function setInitConnectorVisibility(connector: Connector, targetNode: Node) {
  const isLocationConnector = IsLocation(targetNode) && IsLocationTerminal(connector);
  const isProductConnector = IsProduct(targetNode) && IsProductTerminal(connector);

  if (isLocationConnector || isProductConnector) {
    if (IsInputTerminal(connector)) connector.connectorVisibility = ConnectorVisibility.InputVisible;
    if (IsOutputTerminal(connector)) connector.connectorVisibility = ConnectorVisibility.OutputVisible;
  } else connector.connectorVisibility = ConnectorVisibility.None;
}

export default useOnDrop;
