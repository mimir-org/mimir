import { TerminalsMenu, TerminalsMenuButton } from "./components";
import { Connector, Node } from "../../../../models";
import { useState } from "react";
import { TerminalMenuWrapper } from "./TerminalsMenuComponent.styled";
import { IsConnectorVisible, IsLocationTerminal, IsPartOfTerminal } from "../../helpers/Connectors";
import { OnBlur, OnInputMenuClick } from "./handlers/OnTerminals";

interface Props {
  node: Node;
  terminals: Connector[];
  onClick: (conn: Connector, isInput: boolean) => void;
  isParent?: boolean;
  isInput?: boolean;
  showMenuButton?: boolean;
}

/**
 * The main component for the terminals menu on BlockView nodes.
 * @param interface
 * @returns a button to active the menu, and a drop-down menu containing available terminals.
 */
export const TerminalsMenuComponent = ({ node, terminals, onClick, isParent, isInput, showMenuButton = true }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <TerminalMenuWrapper>
      <TerminalsMenuButton
        node={node}
        isParent={isParent}
        showMenuButton={showMenuButton}
        terminals={terminals.filter((t) => !IsPartOfTerminal(t) && !IsLocationTerminal(t))}
        onClick={() => OnInputMenuClick(setShowMenu, showMenu)}
        isInput={isInput}
      />
      {showMenu && (
        <TerminalsMenu
          node={node}
          isInput={isInput}
          terminals={terminals.filter((t) => !IsPartOfTerminal(t) && !IsLocationTerminal(t))}
          hasActiveTerminals={terminals.some((conn) => IsConnectorVisible(conn))}
          isParent={isParent}
          onClick={onClick}
          onBlur={() => OnBlur(setShowMenu, showMenu)}
        />
      )}
    </TerminalMenuWrapper>
  );
};
