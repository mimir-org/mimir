import { Size } from "../../../../../compLibrary/size";
import { Edge, Node } from "../../../../../models";
import { IsInputTerminal, IsOutputTerminal, IsTransport } from "../../../helpers";

/**
 * Method to force an offpage node to fit on the border of the ParentBlockNode.
 * Note: an offpage node's parent is not the ParentBlockNode, but the ParentBlockNode sets the boundaries for
 * the OffPageNode's position
 * @param offPageNodePos
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePos = (node: Node, libOpen: boolean, explorerOpen: boolean, secondaryNode: boolean, edges: Edge[]) => {
  const width = secondaryNode ? window.innerWidth / 2.3 : window.innerWidth;

  const inputConn = node.connectors.find((conn) => IsInputTerminal(conn) && IsTransport(conn));
  const outputConn = node.connectors.find((conn) => IsOutputTerminal(conn) && IsTransport(conn));

  const edgeInputConn = edges?.find((edge) => edge.toConnector.id === inputConn.id)?.toConnector;
  const edgeOutputConn = edges?.find((edge) => edge.fromConnector.id === outputConn.id)?.fromConnector;

  const terminal = edgeInputConn ?? edgeOutputConn;
  const isTargetNode = IsInputTerminal(terminal);

  const xMin = SetXMin(libOpen, explorerOpen, secondaryNode, width, isTargetNode);

  // const yMin = 120;

  let offPageX = node.positionBlockX;
  let offPageY = node.positionBlockY;

  if (node.positionBlockX < xMin || node.positionBlockX > xMin) offPageX = xMin;
  // if (offPageNodePos.y < yMin) offPageY = yMin;
  // if (offPageNodePos.y > yMax) offPageY = yMax;

  return { x: offPageX, y: offPageY };
};

function SetXMin(libOpen: boolean, explorerOpen: boolean, secondaryNode: boolean, width: number, isTargetNode: boolean) {
  const marginLarge = 145;
  const marginSmall = 55;

  if (secondaryNode) {
    if (libOpen && !explorerOpen) return width + 85;
    if (!libOpen && explorerOpen) return width + Size.ModuleOpen + 55;
    if ((!libOpen && !explorerOpen) || (libOpen && explorerOpen)) return width + Size.ModuleOpen - 115;
  }

  if (isTargetNode) {
    if (explorerOpen && !libOpen) return width + Size.ModuleOpen - 175;
    if ((explorerOpen && libOpen) || (!explorerOpen && libOpen)) return width - marginLarge;
    if (!explorerOpen && !libOpen) return width + marginLarge;
  } else {
    if ((explorerOpen && !libOpen) || (explorerOpen && libOpen)) return Size.ModuleOpen + 27;
    if ((!explorerOpen && libOpen) || (!explorerOpen && !libOpen)) return marginSmall;
  }
}

export default SetOffPageNodePos;
