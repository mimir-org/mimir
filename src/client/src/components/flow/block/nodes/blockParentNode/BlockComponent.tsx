import { Node } from "../../../../../models";
import { Banner, Block, Header, LogoBox } from "./styled";
import { OnResize } from "./handlers";
import { useEffect } from "react";
import { GetCompanyLogo } from "../../../../../helpers";

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
const BlockComponent = ({ node, color, selected, dispatch, width, height, hasChildren }: Props) => {
  const company = process.env.REACT_APP_COMPANY;

  useEffect(() => {
    OnResize(node?.id, dispatch);
  }, [node, dispatch]);

  return (
    <Block id={"function-block-" + node?.id} selected={selected} width={width} height={height}>
      <Banner color={color}>
        <Header>
          <p className="text">={node?.label ?? node?.name}</p>
        </Header>
        <LogoBox hasChildren={hasChildren}>
          <img src={GetCompanyLogo(company, node, hasChildren)} alt="logo" className="logo" />
        </LogoBox>
      </Banner>
      {/* <ResizeButton id="ResizeParent">
        <img src={ResizeIcon} alt="resize" className="icon" />
      </ResizeButton> */}
    </Block>
  );
};
export default BlockComponent;
