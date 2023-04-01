import { AspectObject, Connector } from "lib";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import { GetMenuIcon } from "../helpers/GetMenuIcon";
import { TerminalsButtonBox } from "./TerminalsMenuButton.styled";

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
    visible={showMenuButton && !IsAspectNode(node) && !!connectors.length}
    isInput={isInput}
    onClick={() => onClick()}
  >
    <img src={GetMenuIcon(node, isParent, isInput)} className="menu-icon" alt="menu" />
  </TerminalsButtonBox>
);
