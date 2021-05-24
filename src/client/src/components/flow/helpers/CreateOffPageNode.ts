import { CreateId } from "../helpers";
import { ProjectState } from "../../../redux/store/project/types";
import { GetFlowRectData, CreateOffPageData, OffPageNodeCreator } from ".";
import {
  Node,
  Edge,
  NODE_TYPE,
  NodeType,
  ICON_TYPE,
  IconType,
  CONNECTOR_TYPE,
  ConnectorType,
  TERMINAL_CATEGORY,
  TerminalCategory,
  TERMINAL,
  Terminal,
  RELATION_TYPE,
  RelationType,
} from "../../../models/project";

const CreateOffPageNode = (
  projectState: ProjectState,
  data: CreateOffPageData
): OffPageNodeCreator => {
  const parentNode = projectState.project?.nodes.find(
    (x) => x.id === data.parentNodeId
  );
  const parentPartOfConnector = parentNode.connectors.find(
    (x) =>
      x.relationType === RELATION_TYPE.PartOf &&
      x.type === CONNECTOR_TYPE.OUTPUT
  );
  const fromNode = projectState.project.nodes.find(
    (x) => x.id === data.fromNodeId
  );
  const fromNodeConnector = fromNode.connectors.find(
    (x) => x.id === data.fromConnectorId
  );
  const [width] = GetFlowRectData();

  const node = {
    id: CreateId(),
    name: fromNodeConnector.name,
    label: fromNodeConnector.name,
    type: NODE_TYPE.OFF_PAGE as NodeType,
    positionX: width - 25,
    positionY: data.y,
    connectors: [],
    attributes: [],
    icon: ICON_TYPE.FUNCTION_ICON as IconType,
  } as Node;

  const targetConnector = {
    id: CreateId(),
    name: "TransportConnector",
    type: CONNECTOR_TYPE.INPUT as ConnectorType,
    terminalCategory: fromNodeConnector.terminalCategory,
    terminal: fromNodeConnector.terminal as Terminal,
    relationType: fromNodeConnector.relationType,
    nodeId: node.id,
    attributes: [],
    semanticReference: "",
    mediaColor: "",
    transportColor: "",
  };

  const partOfConnector = {
    id: CreateId(),
    name: "PartOfConnector",
    type: CONNECTOR_TYPE.INPUT as ConnectorType,
    terminalCategory: TERMINAL_CATEGORY.NotSet as TerminalCategory,
    terminal: TERMINAL.NotSet as Terminal,
    relationType: RELATION_TYPE.PartOf as RelationType,
    nodeId: node.id,
    attributes: [],
    semanticReference: "",
    mediaColor: "",
    transportColor: "",
  };

  node.connectors.push(targetConnector);
  node.connectors.push(partOfConnector);

  const partofEdge = {
    id: CreateId(),
    fromConnector: parentPartOfConnector.id,
    toConnector: partOfConnector.id,
    fromNode: parentNode.id,
    toNode: node.id,
    isHidden: false,
    parentType: parentNode.type,
    targetType: node.type,
  } as Edge;

  const transportEdge = {
    id: CreateId(),
    fromConnector: data.fromConnectorId,
    toConnector: targetConnector.id,
    fromNode: data.fromNodeId,
    toNode: node.id,
    isHidden: false,
    parentType: fromNode.type,
    targetType: node.type,
  } as Edge;

  return {
    node: node,
    partOfEdge: partofEdge,
    transportEdge: transportEdge,
  } as OffPageNodeCreator;
};

export default CreateOffPageNode;
