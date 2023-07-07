import { AspectObject, Connector } from "lib";
import { GetMenuIcon } from "assets/icons/GetMenuIcon";
import { TerminalsButtonBox } from "components/flow/terminals/TerminalsMenuComponent.styled";

interface Props {
  node: AspectObject;
  isParent: boolean;
  isInput?: boolean;
  showMenuButton: boolean;
  connectors: Connector[];
  onClick: () => void;
}

/**
 * Component for the MenuButton for TerminalsMenu.
 * @param interface
 * @returns a clickable button that toggles the display of the terminals menu.
 */
export const TerminalsMenuButton = ({ node, isParent, isInput, showMenuButton, connectors, onClick }: Props) => (
  <TerminalsButtonBox
    id={`terminals-menu-button-${node.id}`}
    visible={showMenuButton && !node.isRoot() && !!connectors.length}
    isInput={isInput}
    onClick={() => onClick()}
  >
    <img src={GetMenuIcon(node, isParent, isInput)} className="menu-icon" alt="menu" />
  </TerminalsButtonBox>
);
