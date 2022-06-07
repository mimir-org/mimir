import { Node, User } from "../../../models";
import { Size } from "../../../assets/size/Size";
import { GetDateNowUtc } from "../../../helpers";
import { Position } from "../../../models/project";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
import { ConvertAttributeLibCmToAttribute, ConvertTerminalLibCmToConnectorz, ConvertSimpleLibCmToSimple } from "./";

/**
 * Function to convert a libNode dropped from the Library to a Mimir Node.
 * The libNode is of the type NodeLibCm.
 * @param libNode
 * @param parentNode
 * @param treePosition
 * @param blockPosition
 * @param projectId
 * @param user
 * @returns a Node.
 */
const ConvertLibNodeToNode = (
  libNode: NodeLibCm,
  parentNode: Node,
  treePosition: Position,
  blockPosition: Position,
  projectId: string,
  user: User
) => {
  const now = GetDateNowUtc();
  const connectors = ConvertTerminalLibCmToConnectorz(libNode.nodeTerminals, libNode.id);
  const attributes = ConvertAttributeLibCmToAttribute(libNode.attributes);
  const simples = ConvertSimpleLibCmToSimple(libNode.simples);

  return {
    id: libNode.id,
    rds: libNode.rdsCode,
    projectId: projectId,
    name: libNode.name,
    label: libNode.name, // TODO: label?
    positionX: treePosition.x,
    positionY: treePosition.y,
    positionBlockX: blockPosition.x,
    positionBlockY: blockPosition.y,
    connectors,
    attributes,
    simples,
    aspect: libNode.aspect,
    statusId: "",
    version: libNode.version,
    masterProjectId: projectId,
    symbol: libNode.symbol,
    level: 0,
    height: Size.BLOCK_NODE_HEIGHT, // Only used in BlockView
    width: Size.BLOCK_NODE_WIDTH, // Only used in BlockView
    purpose: libNode.purposeName,
    created: libNode.created,
    createdBy: libNode.createdBy,
    updated: now,
    updatedBy: user?.name,
    libraryTypeId: libNode.id,
    kind: libNode.kind,
    hidden: false,
    blockHidden: false,
    parentNodeId: parentNode.id,
  } as Node;
};

export default ConvertLibNodeToNode;

// if (node.connectors) {
//   node.connectors.forEach((connector) => {
//     const connectorId = CreateId();
//     connector.id = connectorId;
//     connector.nodeId = node.id;

//     if (connector.attributes) {
//       connector.attributes.forEach((attribute) => {
//         attribute.id = CreateId();
//         attribute.terminalId = connectorId;
//       });
//     }
//   });
// }

// if (node.attributes) {
//   node.attributes.forEach((attribute) => {
//     attribute.id = CreateId();
//     attribute.nodeId = node.id;
//   });
// }

// if (node.simples) {
//   node.simples.forEach((simple) => {
//     const simpleId = CreateId();
//     simple.id = simpleId;
//     simple.nodeId = node.id;

//     if (simple.attributes) {
//       simple.attributes.forEach((attribute) => {
//         attribute.id = CreateId();
//         attribute.simpleId = simpleId;
//       });
//     }
//   });
// }
