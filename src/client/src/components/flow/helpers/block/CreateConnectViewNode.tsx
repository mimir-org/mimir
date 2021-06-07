import { Node } from "../../../../models/project";
import { FlowElement } from "react-flow-renderer";
import { Size } from "../../../../componentLibrary";

const CreateConnectViewNode = (node: Node): FlowElement => {
  let connectionViewBlock = null;
  if (!node) return connectionViewBlock;

  if (!node.width || node.width === 0 || node.width === Size.Node_Width)
    node.width = Size.ConnectionView_Width;
  if (!node.length || node.length === 0 || node.length === Size.Node_Length)
    node.length = Size.ConnectionView_Length;
  node.height = 0; // Z-axis

  connectionViewBlock = {
    id: node.id,
    type: node.type,
    data: node,
    position: { x: node.positionBlockX, y: node.positionBlockY },
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  };

  return connectionViewBlock;
};

export default CreateConnectViewNode;
