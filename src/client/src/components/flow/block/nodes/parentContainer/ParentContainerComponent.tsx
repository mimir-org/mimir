import { Node } from "../../../../../models";
import { Banner, Block, Header, LogoBox, ResizeButton } from "./styled";
import { GetCompanyLogoForNode, IsLocation, IsProduct } from "../../../../../helpers";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { ResizeIcon } from "../../../../../assets/icons/resize";
import { memo, useRef } from "react";
import { useResizeParentNode } from "./hooks";

interface Props {
  node: Node;
  color: string;
  selected: boolean;
  width: number;
  height: number;
  hasChildren: boolean;
  company: string;
  dispatch: any;
}

/**
 * Component for the parent node block in BlockView.
 * @param interface
 * @returns a container that sits on top of a Flow node.
 */
const ParentContainerComponent = ({ node, color, selected, width, height, hasChildren, company, dispatch }: Props) => {
  const resizePanelRef = useRef(null);
  useResizeParentNode(node.id, resizePanelRef, dispatch);

  return (
    <Block id={"block-" + node?.id} selected={selected} width={width} height={height}>
      <Banner color={color}>
        <Header>
          <p className="text">={node?.label ?? node?.name}</p>
        </Header>
        <LogoBox hasChildren={hasChildren}>
          <img src={GetCompanyLogoForNode(company, node, hasChildren)} alt="logo" className="logo" />
        </LogoBox>
      </Banner>
      {IsProduct(node) && (
        <ResizeButton id="ResizeParentNode" ref={resizePanelRef}>
          <img src={ResizeIcon} alt="resize" className="icon" />
        </ResizeButton>
      )}
      {IsLocation(node) && <Background variant={BackgroundVariant.Lines} color={Color.Grey} gap={20} />}
      {!IsLocation(node) && <Background variant={BackgroundVariant.Dots} color={Color.Black} gap={20} />}
    </Block>
  );
};

export default memo(ParentContainerComponent);
