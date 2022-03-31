import { Dispatch } from "redux";
import { Connector, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { updateBlockPosition } from "../../../../../../redux/store/project/actions";
import { IsInputTerminal } from "../../../../helpers/Connectors";

const UpdateOffPagePosition = (
  node: Node,
  parentBlockNode: Node,
  terminal: Connector,
  size: BlockNodeSize,
  dispatch: Dispatch
) => {
  const margin = 35;
  const inputTerminalPos = parentBlockNode?.positionBlockX + size.width;
  const outputTerminalPos = parentBlockNode?.positionBlockX - margin;

  const xPos = IsInputTerminal(terminal) ? inputTerminalPos : outputTerminalPos;
  let yPos = node?.positionBlockY;

  const yMin = 120;
  const yMax = window.innerHeight - yMin;

  if (yPos < yMin) yPos = yMin;
  if (yPos > yMax) yPos = yMax;

  dispatch(updateBlockPosition(node?.id, xPos, yPos));
};

export default UpdateOffPagePosition;
