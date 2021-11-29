import { Node } from "../../../../../models";
import { Banner, ParentBox, Header, LogoBox, Navigation, ResizeButton } from "./styled";
import { GetCompanyLogoForNode, GetRdsPrefix, IsAspectNode, IsLocation, IsProduct } from "../../../../../helpers";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { ResizeIcon } from "../../../../../assets/icons/resize";
import { memo, useRef } from "react";
import { useResizeParentNode } from "./hooks";
import { BlockNodeSize } from "../../../../../models/project";
import { ArrowDown, ArrowUp } from "../../../../../assets/icons/arrow";

interface Props {
  node: Node;
  color: string;
  size: BlockNodeSize;
  hasChildren: boolean;
  onParentClick: () => void;
  onChildClick: () => void;
  dispatch: any;
}

/**
 * Component for the parent block node in BlockView.
 * @param interface
 * @returns a container that sits on top of a Flow node.
 */
const ParentContainerComponent = ({ node, color, size, hasChildren, onParentClick, onChildClick, dispatch }: Props) => {
  const resizePanelRef = useRef(null);
  const prefix = GetRdsPrefix(node);
  const company = process.env.REACT_APP_COMPANY;
  useResizeParentNode(node.id, resizePanelRef, dispatch);

  return (
    <ParentBox id={"block-" + node?.id} selected={node.isBlockSelected} size={size}>
      <Banner color={color}>
        <Header>
          {prefix}
          {node?.label ?? node?.name}
        </Header>
        <Navigation>{!IsAspectNode(node) && <img src={ArrowUp} alt="up" onClick={() => onParentClick()} />}</Navigation>
        <Navigation>
          <img src={ArrowDown} alt="down" onClick={() => onChildClick()} />
        </Navigation>
        {!node.isRoot && (
          <LogoBox hasChildren={hasChildren}>
            <img src={GetCompanyLogoForNode(company, node)} alt="logo" />
          </LogoBox>
        )}
      </Banner>
      {IsProduct(node) && (
        <ResizeButton id="ResizeParentNode" ref={resizePanelRef}>
          <img src={ResizeIcon} alt="resize" className="icon" />
        </ResizeButton>
      )}
      <Background variant={IsLocation(node) ? BackgroundVariant.Lines : BackgroundVariant.Dots} color={Color.Grey} gap={20} />
    </ParentBox>
  );
};

export default memo(ParentContainerComponent);
