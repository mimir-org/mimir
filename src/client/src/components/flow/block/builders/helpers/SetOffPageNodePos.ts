import { Size } from "../../../../../compLibrary/size";
import { Edge, Node } from "../../../../../models";
import { GetParent, IsInputTerminal, IsOutputTerminal, IsPartOf, IsTransport } from "../../../helpers";

/**
 * Method to force an offpage node to fit on the border of the ParentBlockNode.
 * Note: an offpage node's parent is not the ParentBlockNode, but the ParentBlockNode sets the boundaries for
 * the OffPageNode's position
 * @param offPageNode
 * @param libOpen
 * @param explorerOpen
 * @param secondaryNode
 * @param edges
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (offPageNode: Node, libOpen: boolean, explorerOpen: boolean, secondaryNode: Node, edges: Edge[]) => {
  const width = secondaryNode ? window.innerWidth / 2.3 : window.innerWidth;
  const offPageParent = edges.find((edge) => IsPartOf(edge.fromConnector) && edge.toNodeId === offPageNode.id).fromNode;
  const parentBlockNode = GetParent(offPageParent);

  const inputConn = offPageNode.connectors.find((conn) => IsInputTerminal(conn) && IsTransport(conn));
  const outputConn = offPageNode.connectors.find((conn) => IsOutputTerminal(conn) && IsTransport(conn));

  const edgeInputConn = edges?.find((edge) => edge.toConnector.id === inputConn.id)?.toConnector;
  const edgeOutputConn = edges?.find((edge) => edge.fromConnector.id === outputConn.id)?.fromConnector;

  const terminal = edgeInputConn ?? edgeOutputConn;
  const isTargetNode = IsInputTerminal(terminal);

  const xMin =
    parentBlockNode.id === secondaryNode?.id
      ? SetSecondaryXMin(libOpen, explorerOpen, width, isTargetNode)
      : SetPrimaryXMin(libOpen, explorerOpen, secondaryNode, width, isTargetNode);

  let offPageX = offPageNode.positionBlockX;
  let offPageY = offPageNode.positionBlockY;

  if (offPageX < xMin || offPageX > xMin) offPageX = xMin;

  return { x: offPageX, y: offPageY };
};

// TODO: refactor
function SetPrimaryXMin(libOpen: boolean, explorerOpen: boolean, secondaryNode: Node, width: number, isTargetNode: boolean) {
  const marginLarge = 145;
  const marginSmall = 55;

  if (secondaryNode !== null) {
    if (isTargetNode) {
      if (libOpen && !explorerOpen) return width + 85;
      if (!libOpen && explorerOpen) return width + Size.ModuleOpen + 55;
      if ((!libOpen && !explorerOpen) || (libOpen && explorerOpen)) return width + Size.ModuleOpen - 115;
    }
    if (!libOpen && explorerOpen) return Size.ModuleOpen + 25;
    if (libOpen && !explorerOpen) return width + Size.ModuleOpen - 205;
    if ((libOpen && explorerOpen) || (!libOpen && !explorerOpen)) return width + Size.ModuleOpen - 75;
  }

  if (isTargetNode) {
    if (!libOpen && explorerOpen) return width + Size.ModuleOpen - 175;
    if ((libOpen && explorerOpen) || (libOpen && !explorerOpen)) return width - marginLarge;
    if (!libOpen && !explorerOpen) return width + marginLarge;
  }
  if ((!libOpen && explorerOpen) || (libOpen && explorerOpen)) return Size.ModuleOpen + 27;
  if ((libOpen && !explorerOpen) || (!libOpen && !explorerOpen)) return marginSmall;
}

function SetSecondaryXMin(libOpen: boolean, explorerOpen: boolean, width: number, isTargetNode: boolean) {
  if (isTargetNode) {
    if (libOpen && !explorerOpen) return width + 85;
    if (!libOpen && explorerOpen) return width * 2 + Size.ModuleOpen + 125;
    if ((!libOpen && !explorerOpen) || (libOpen && explorerOpen)) return width + Size.ModuleOpen - 115;
  }
  if (!libOpen && explorerOpen) return width + Size.ModuleOpen + 95;
  if (libOpen && !explorerOpen) return width + Size.ModuleOpen - 205;
  if ((libOpen && explorerOpen) || (!libOpen && !explorerOpen)) return width + Size.ModuleOpen - 75;
}

export default SetOffPageNodePos;
