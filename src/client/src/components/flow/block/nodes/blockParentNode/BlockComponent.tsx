import { Node } from "../../../../../models";
import { Banner, Block, Header } from "./styled";
import { OnResize } from "./handlers";
import { useEffect } from "react";

interface Props {
  dispatch: any;
  node: Node;
  color: string;
  selected: boolean;
  width: number;
  length: number;
}

/**
 * Component for the parent node block in BlockView
 * @param interface
 * @returns a container that sits on top of a Flow node
 */
const BlockComponent = ({ node, color, selected, dispatch, width, length }: Props) => {
  useEffect(() => {
    OnResize(node?.id, dispatch);
  }, [node, dispatch]);

  return (
    <Block id={"function-block-" + node?.id} selected={selected} width={width} length={length}>
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
