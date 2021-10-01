import { ArrowDown, ArrowUp } from "../../../../assets/icons/blockView";
import { Node } from "../../../../models";
import { IsAspectNode } from "../../helpers/common";
import { Navigation, Banner, Block, Header } from "./styled";

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
  <Block id={"function-block-" + node?.id} splitView={isSplitView} selected={isSelected}>
    <Banner location={isLocation}>
      <Header>
        <Navigation>
          {!IsAspectNode(node) && <img src={ArrowUp} alt="up" onClick={() => onParentClick()} />}
        </Navigation>
        <Navigation>
          <img src={ArrowDown} alt="down" onClick={() => onChildClick()} />
        </Navigation>
        <p className="text">={node?.label ?? node?.name}</p>
      </Header>
    </Banner>
  </Block>
);
export default BlockComponent;
