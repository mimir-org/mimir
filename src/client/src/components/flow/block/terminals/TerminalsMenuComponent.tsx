import { TerminalsMenu, TerminalsMenuButton } from "./components";
import { useState } from "react";
import { TerminalMenuWrapper } from "./TerminalsMenuComponent.styled";
import { IsConnectorVisible } from "../../helpers/Connectors";
import { OnBlur, OnInputMenuClick } from "./handlers/OnTerminalClick";
import { Node, Connector } from "@mimirorg/modelbuilder-types";

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
 * @returns a button to activate the menu, and a drop-down menu containing available terminals.
 */
export const TerminalsMenuComponent = ({ node, terminals, onClick, isParent, isInput, showMenuButton = true }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <TerminalMenuWrapper>
      <TerminalsMenuButton
        node={node}
        isParent={isParent}
        showMenuButton={showMenuButton}
        terminals={terminals}
        onClick={() => OnInputMenuClick(setShowMenu, showMenu)}
        isInput={isInput}
      />
      {showMenu && (
        <TerminalsMenu
          node={node}
          isInput={isInput}
          terminals={terminals}
          hasActiveTerminals={terminals.some((conn) => IsConnectorVisible(conn))}
          isParent={isParent}
          onClick={onClick}
          onBlur={() => OnBlur(setShowMenu, showMenu)}
        />
      )}
    </TerminalMenuWrapper>
  );
};
