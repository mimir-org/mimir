import { BlockParentBox } from "../../../compLibrary/blockView";
import { Node } from "../../../models";

interface Props {
  node: Node;
  isLocation: boolean;
  isSplitView: boolean;
  isSelected: boolean;
}

/** Component for the node block in BlockView.
 *  Block serves as a container for a Mimir node in BlockView.
 */
const Block = ({ node, isLocation, isSplitView, isSelected }: Props) => (
  <BlockParentBox
    id={"function-block-" + node?.id}
    location={isLocation}
    splitView={isSplitView}
    selected={isSelected}
  >
    <div className="banner">
      <h3 className="header">{node?.label ?? node?.name}</h3>
    </div>
  </BlockParentBox>
);
export default Block;
