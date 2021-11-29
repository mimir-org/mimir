import { IsAspectNode } from "../../../../helpers";
import { GetMenuIcon, SetButtonXPos } from "./helpers";
import { TerminalsButtonBox } from "./styled";
import { Connector, Node } from "../../../../models";

interface Props {
  node: Node;
  isParent: boolean;
  isInput: boolean;
  showMenuBox: boolean;
  terminals: Connector[];
  onClick: () => void;
}

/**
 * Component for the MenuBox that displays the drop-down menu for terminals.
 * @param interface
 * @returns a clickable box.
 */
const TerminalsMenuBox = ({ node, isParent, isInput, showMenuBox, terminals, onClick }: Props) => (
  <TerminalsButtonBox
    visible={showMenuBox && !IsAspectNode(node) && !!terminals.length}
    left={SetButtonXPos(isParent, isInput, false)}
    right={SetButtonXPos(isParent, isInput, true)}
    onClick={() => onClick()}
  >
    <img src={GetMenuIcon(node, isParent, isInput)} className="menu-icon" alt="menu" />
  </TerminalsButtonBox>
);

export default TerminalsMenuBox;
