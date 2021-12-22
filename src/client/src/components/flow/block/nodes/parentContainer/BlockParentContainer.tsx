import { Node } from "../../../../../models";
import { ParentBox, ResizeButton } from "./styled";
import { IsLocation, IsProduct } from "../../../../../helpers";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { ResizeIcon } from "../../../../../assets/icons/resize";
import { useRef } from "react";
import { useResizeParentNode } from "./hooks";
import { BlockParentBanner } from ".";
import { BlockNodeSize } from "../../../../../models/project";

interface Props {
  node: Node;
  size: BlockNodeSize;
  color: string;
  hasTerminals: boolean;
  isSecondaryNode?: boolean;
  onParentClick: () => void;
  onChildClick: () => void;
  dispatch: any;
}

/**
 * Component for the parent block node in BlockView.
 * @param interface
 * @returns a parent container with terminals menus and terminals. The component serves as a container for the
 * parent node's child nodes.
 */
const BlockParentContainer = ({
  node,
  size,
  color,
  hasTerminals,
  isSecondaryNode,
  onParentClick,
  onChildClick,
  dispatch,
}: Props) => {
  const resizePanelRef = useRef(null);
  useResizeParentNode(node.id, resizePanelRef, dispatch);
  const isLocation = IsLocation(node);

  return (
    <ParentBox id={"parent-block-" + node.id} selected={node.isBlockSelected} size={size}>
      <BlockParentBanner
        node={node}
        color={color}
        hasTerminals={hasTerminals}
        isSecondaryNode={isSecondaryNode}
        onParentClick={onParentClick}
        onChildClick={onChildClick}
      />
      {IsProduct(node) && (
        <ResizeButton id="ResizeParentNode" ref={resizePanelRef}>
          <img src={ResizeIcon} alt="resize" className="icon" />
        </ResizeButton>
      )}
      <Background
        variant={isLocation ? BackgroundVariant.Lines : BackgroundVariant.Dots}
        color={isLocation ? Color.Grey : Color.BlueDark}
        gap={isLocation ? 20 : 15}
        style={{ zIndex: 0 }}
      />
    </ParentBox>
  );
};

export default BlockParentContainer;
