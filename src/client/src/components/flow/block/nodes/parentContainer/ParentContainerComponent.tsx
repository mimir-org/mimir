import { Node } from "../../../../../models";
import { ParentBox, ResizeButton } from "./styled";
import { IsLocation, IsProduct } from "../../../../../helpers";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { ResizeIcon } from "../../../../../assets/icons/resize";
import { memo, useRef } from "react";
import { useResizeParentNode } from "./hooks";
import { BlockNodeSize } from "../../../../../models/project";
import { ParentBannerComponent } from ".";

interface Props {
  node: Node;
  color: string;
  size: BlockNodeSize;
  hasTerminals: boolean;
  isSecondaryNode: boolean;
  explorerOpen: boolean;
  onParentClick: () => void;
  onChildClick: () => void;
  dispatch: any;
}

/**
 * Component for the parent block node in BlockView.
 * @param interface
 * @returns a container that sits on top of a Flow node.
 */
const ParentContainerComponent = ({
  node,
  color,
  size,
  hasTerminals,
  isSecondaryNode,
  explorerOpen,
  onParentClick,
  onChildClick,
  dispatch,
}: Props) => {
  const resizePanelRef = useRef(null);
  useResizeParentNode(node.id, resizePanelRef, dispatch);

  return (
    <ParentBox id={"parent-block-" + node.id} selected={node.isBlockSelected} size={size} explorerOpen={explorerOpen}>
      <ParentBannerComponent
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
        variant={IsLocation(node) ? BackgroundVariant.Lines : BackgroundVariant.Dots}
        color={Color.Grey}
        gap={20}
        style={{ zIndex: 0 }}
      />
    </ParentBox>
  );
};

export default memo(ParentContainerComponent);
