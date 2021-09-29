import { ArrowDown, ArrowUp } from "../../../../assets/icons/blockView";
import { Node } from "../../../../models";
import { IsAspectNode } from "../../helpers/common";
import { Arrow, Banner, Block, Header } from "./styled";

interface Props {
  node: Node;
  isLocation: boolean;
  isSplitView: boolean;
  isSelected: boolean;
  onParentClick: () => void;
  onChildClick: () => void;
}

/**
 * Component for the parent node block in BlockView
 * @param param0
 * @returns a container that sits on top of a Flow node
 */
const BlockComponent = ({
  node,
  isLocation,
  isSplitView,
  isSelected,
  onParentClick,
  onChildClick,
}: Props) => (
  <Block
    id={"function-block-" + node?.id}
    location={isLocation}
    splitView={isSplitView}
    selected={isSelected}
  >
    <Banner>
      <Header>={node?.label ?? node?.name}</Header>
      <Arrow left={205}>
        {!IsAspectNode(node) && (
          <img src={ArrowUp} alt="up" onClick={() => onParentClick()} />
        )}
      </Arrow>
      <Arrow left={220}>
        <img src={ArrowDown} alt="down" onClick={() => onChildClick()} />
      </Arrow>
    </Banner>
  </Block>
);
export default BlockComponent;
