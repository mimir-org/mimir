import { FlowElement } from "react-flow-renderer";
import { TextResources } from "../../../assets/text";
import { Position } from "../../../compLibrary";
import { Node } from "../../../models";

/**  Component to draw the parent node in BlockView. The component returns an instance of FlowElement */

const CreateParentBlockNode = (node: Node) => {
  if (!node) return null;

  const type = TextResources.Type_BlockParentNode;
  const position = { x: Position.FunctionBlock_xPos, y: 100 };

  return {
    id: node.id,
    type: type,
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: false,
    draggable: false,
    selectable: true,
  } as FlowElement;
};

export default CreateParentBlockNode;
