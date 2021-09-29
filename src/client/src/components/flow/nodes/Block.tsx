import { ArrowDown, ArrowUp } from "../../../assets/icons/blockView";
import { BlockParentBox } from "../../../compLibrary/blockView";
import { Node } from "../../../models";
import { IsAspectNode } from "../helpers/common";

interface Props {
  node: Node;
  isLocation: boolean;
  isSplitView: boolean;
  isSelected: boolean;
  onParentClick: () => void;
  onChildClick: () => void;
}

/**
 * A component for the parent node block in BlockView
 * @param param0
 * @returns a container that sits on top of a Flow node
 */
const Block = ({
  node,
  isLocation,
  isSplitView,
  isSelected,
  onParentClick,
  onChildClick,
}: Props) => (
  <BlockParentBox
    id={"function-block-" + node?.id}
    location={isLocation}
    splitView={isSplitView}
    selected={isSelected}
  >
    <div className="banner">
      <h3 className="header">{node?.label ?? node?.name}</h3>
      {!IsAspectNode(node) && (
        <img
          src={ArrowUp}
          alt="up"
          className="arrow"
          onClick={() => onParentClick()}
        />
      )}
      <img
        src={ArrowDown}
        alt="down"
        className="arrow"
        onClick={() => onChildClick()}
      />
    </div>
  </BlockParentBox>
);
export default Block;
