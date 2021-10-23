import * as Icons from "../../../../../assets/icons/arrow";
import { Node } from "../../../../../models";
import { HasChildren, IsAspectNode } from "../../../helpers";
import { ResizeIcon } from "../../../../../assets/icons/resize";
import { Navigation, Banner, Block, Header, ResizeButton } from "./styled";
import { OnResize } from "./handlers";
import { useEffect } from "react";

interface Props {
  dispatch: any;
  node: Node;
  color: string;
  selected: boolean;
  onParentClick: () => void;
  onChildClick: () => void;
}

/**
 * Component for the parent node block in BlockView
 * @param interface
 * @returns a container that sits on top of a Flow node
 */
const BlockComponent = ({ node, color, selected, onParentClick, onChildClick, dispatch }: Props) => {
  useEffect(() => {
    OnResize(node?.id, dispatch);
  }, [node, dispatch]);

  return (
    <Block id={"function-block-" + node?.id} selected={selected}>
      <Banner color={color}>
        <Header>
          <Navigation>
            <img
              src={IsAspectNode(node) ? Icons.ArrowUpInactive : Icons.ArrowUp}
              alt="up"
              onClick={() => onParentClick()}
            />
          </Navigation>
          <Navigation>
            <img
              src={HasChildren(node) ? Icons.ArrowDown : Icons.ArrowDownInactive}
              alt="down"
              onClick={() => onChildClick()}
            />
          </Navigation>
          <p className="text">={node?.label ?? node?.name}</p>
        </Header>
      </Banner>
      <ResizeButton id="ResizeParent">
        <img src={ResizeIcon} alt="resize" className="icon" />
      </ResizeButton>
    </Block>
  );
};
export default BlockComponent;
