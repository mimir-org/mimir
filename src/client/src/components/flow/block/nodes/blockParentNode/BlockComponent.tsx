import { Node } from "../../../../../models";
import { ResizeIcon } from "../../../../../assets/icons/resize";
import { Banner, Block, Header, ResizeButton } from "./styled";
import { OnResize } from "./handlers";
import { useEffect } from "react";

interface Props {
  dispatch: any;
  node: Node;
  color: string;
  selected: boolean;
}

/**
 * Component for the parent node block in BlockView
 * @param interface
 * @returns a container that sits on top of a Flow node
 */
const BlockComponent = ({ node, color, selected, dispatch }: Props) => {
  useEffect(() => {
    OnResize(node?.id, dispatch);
  }, [node, dispatch]);

  return (
    <Block id={"function-block-" + node?.id} selected={selected}>
      <Banner color={color}>
        <Header>
          <p className="text">={node?.label ?? node?.name}</p>
        </Header>
      </Banner>
      {/* <ResizeButton id="ResizeParent">
        <img src={ResizeIcon} alt="resize" className="icon" />
      </ResizeButton> */}
    </Block>
  );
};
export default BlockComponent;
