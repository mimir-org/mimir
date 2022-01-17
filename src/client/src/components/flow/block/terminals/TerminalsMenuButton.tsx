import { IsAspectNode } from "../../../../helpers";
import { GetMenuIcon } from "./helpers";
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
 * Component for the MenuButton for TerminalsMenu.
 * @param interface
 * @returns a clickable button that toggles the display of the terminals menu.
 */
const TerminalsMenuButton = ({ node, isParent, isInput, showMenuButton, terminals, onClick }: Props) => (
  <TerminalsButtonBox
    id={"terminals-menu-button-" + node.id}
    visible={showMenuButton && !IsAspectNode(node) && !!terminals.length}
    onClick={() => onClick()}
  >
    <img src={GetMenuIcon(node, isParent, isInput)} className="menu-icon" alt="menu" />
  </TerminalsButtonBox>
);

export default TerminalsMenuButton;
