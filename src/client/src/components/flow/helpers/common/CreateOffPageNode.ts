import { ProjectState } from "../../../../redux/store/project/types";
import { GetFlowRectData, CreateOffPageData, OffPageNodeCreator } from ".";
import {
  Connector,
  ConnectorType,
  Edge,
  Node,
  RelationType,
} from "../../../../models";
import {
  CreateId,
  IsInputConnector,
  IsPartOfTerminal,
} from "../../helpers/common";

const CreateOffPageNode = (
  projectState: ProjectState,
  data: CreateOffPageData
): OffPageNodeCreator => {
  const parentNode = projectState.project?.nodes.find(
    (x) => x.id === data.parentNodeId
  );
  const parentPartOfConnector = parentNode?.connectors.find(
    (x) => IsPartOfTerminal(x) && !IsInputConnector(x)
  );
  const fromNode = projectState.project?.nodes.find(
    (x) => x.id === data.fromNodeId
  );
  const fromNodeConnector = fromNode?.connectors.find(
    (x) => x.id === data.fromConnectorId
  );
  const [width] = GetFlowRectData();

  const node = {
    id: CreateId(),
    name: fromNodeConnector?.name,
    label: fromNodeConnector?.name,
    positionX: width - 25,
    positionY: data.y,
    connectors: [],
    attributes: [],
  } as Node;

  const targetConnector = {
    id: CreateId(),
    name: "TransportConnector",
    type: ConnectorType.Input,
    // terminalCategory: fromNodeConnector?.terminalCategory,
    // terminal: fromNodeConnector?.terminal as Terminal,
    relationType: fromNodeConnector?.relationType,
    nodeId: node.id,
    attributes: [],
    semanticReference: "",
  } as Connector;

  const partOfConnector = {
    id: CreateId(),
    name: "PartOfConnector",
    type: ConnectorType.Input,

    relationType: RelationType.PartOf,
    nodeId: node.id,
    attributes: [],
    semanticReference: "",
  } as Connector;

  node.connectors.push(targetConnector);
  node.connectors.push(partOfConnector);

  const partofEdge = {
    id: CreateId(),
    fromConnectorId: parentPartOfConnector?.id,
    toConnectorId: partOfConnector?.id,
    fromNodeId: parentNode?.id,
    toNodeId: node.id,
    isHidden: false,
  } as Edge;

  const transportEdge = {
    id: CreateId(),
    fromConnectorId: data.fromConnectorId,
    toConnectorId: targetConnector?.id,
    fromNodeId: data.fromNodeId,
    toNodeId: node.id,
    isHidden: false,
  } as Edge;

  return {
    node: node,
    partOfEdge: partofEdge,
    transportEdge: transportEdge,
  } as OffPageNodeCreator;
};

export default CreateOffPageNode;
