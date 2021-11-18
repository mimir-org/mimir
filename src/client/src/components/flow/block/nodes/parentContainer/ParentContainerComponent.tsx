import { Node } from "../../../../../models";
import { Banner, Block, Header, LogoBox } from "./styled";
import { OnResize } from "./handlers";
import { useEffect } from "react";
import { GetCompanyLogoForNode, IsLocation } from "../../../../../helpers";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  dispatch: any;
  node: Node;
  color: string;
  selected: boolean;
  width: number;
  height: number;
  hasChildren: boolean;
}

/**
 * Component for the parent node block in BlockView
 * @param interface
 * @returns a container that sits on top of a Flow node
 */
const ParentContainerComponent = ({ node, color, selected, dispatch, width, height, hasChildren }: Props) => {
  const company = process.env.REACT_APP_COMPANY;

  useEffect(() => {
    OnResize(node?.id);
  }, [node]);

  return (
    <Block id={"function-block-" + node?.id} selected={selected} width={width} height={height}>
      <Banner color={color}>
        <Header>
          <p className="text">={node?.label ?? node?.name}</p>
        </Header>
        <LogoBox hasChildren={hasChildren}>
          <img src={GetCompanyLogoForNode(company, node, hasChildren)} alt="logo" className="logo" />
        </LogoBox>
      </Banner>
      {/* <ResizeButton id="ResizeParent">
        <img src={ResizeIcon} alt="resize" className="icon" />
      </ResizeButton> */}
      {IsLocation(node) && <Background variant={BackgroundVariant.Lines} color={Color.Grey} gap={20} />}
      {!IsLocation(node) && <Background variant={BackgroundVariant.Dots} color={Color.Black} gap={20} />}
    </Block>
  );
};
export default ParentContainerComponent;
