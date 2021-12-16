import { IsAspectNode } from "../../../../helpers";
import { GetMenuIcon, SetButtonXPos } from "./helpers";
import { TerminalsButtonBox } from "./styled";
import { Connector, Node } from "../../../../models";

interface Props {
  node: Node;
  isParent: boolean;
  isInput?: boolean;
  showMenuButton: boolean;
  terminals: Connector[];
  onClick: () => void;
}

/**
 * Component for the MenuButton that displays the drop-down menu for terminals.
 * @param interface
 * @returns a clickable box.
 */
const TerminalsMenuButton = ({ node, isParent, isInput, showMenuButton, terminals, onClick }: Props) => (
  <TerminalsButtonBox
    id={"terminals-menu-button-" + node.id}
    visible={showMenuButton && !IsAspectNode(node) && !!terminals.length}
    left={SetButtonXPos(isParent, isInput)}
    right={SetButtonXPos(isParent, isInput, true)}
    onClick={() => onClick()}
  >
    <img src={GetMenuIcon(node, isParent, isInput)} className="menu-icon" alt="menu" />
  </TerminalsButtonBox>
);

export default TerminalsMenuButton;
