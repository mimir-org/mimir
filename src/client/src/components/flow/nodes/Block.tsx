import { ArrowIcon, TerminalsIcon } from "../../../assets/icons/blockView";
import { BlockParentBox, TerminalsMenu } from "../../../compLibrary/blockView";
import { Node } from "../../../models";

interface Props {
  node: Node;
  isLocation: boolean;
  isSplitView: boolean;
  isSelected: boolean;
  showTerminalMenu: boolean;
  onClick: () => void;
}

const Block = ({
  node,
  isLocation,
  isSplitView,
  isSelected,
  showTerminalMenu,
  onClick,
}: Props) => (
  <BlockParentBox
    id={"function-block-" + node.id}
    location={isLocation}
    splitView={isSplitView}
    selected={isSelected}
  >
    <img src={ArrowIcon} alt="arrow" className="icon"></img>
    <h3 className="header">{node.label ?? node.name}</h3>
    <TerminalsMenu visible={true} onClick={onClick}>
      <img src={TerminalsIcon} alt="options" />
    </TerminalsMenu>
  </BlockParentBox>
);

export default Block;
