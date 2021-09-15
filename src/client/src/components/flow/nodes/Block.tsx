import { ArrowIcon } from "../../../assets/icons/blockView";
import { BlockParentBox } from "../../../compLibrary/blockView";
import { Node } from "../../../models";

interface Props {
  node: Node;
  isLocation: boolean;
  isSplitView: boolean;
  isSelected: boolean;
}

const Block = ({ node, isLocation, isSplitView, isSelected }: Props) => (
  <BlockParentBox
    id={"function-block-" + node.id}
    location={isLocation}
    splitView={isSplitView}
    selected={isSelected}
  >
    <img src={ArrowIcon} alt="arrow" className="icon"></img>
    <h3 className="header">{node.label ?? node.name}</h3>
    <div className="line" />
    <div className="content"></div>
  </BlockParentBox>
);

export default Block;
