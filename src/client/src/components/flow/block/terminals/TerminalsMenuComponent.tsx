import * as Click from "./handlers";
import { TerminalsMenu, TerminalsMenuButton } from ".";
import { Connector, Node } from "../../../../models";
import { useState } from "react";
import { TerminalMenuWrapper } from "./styled";

interface Props {
  node: Node;
  terminals: Connector[];
  onClick: (conn: Connector) => void;
  isParent?: boolean;
  isInput?: boolean;
  showMenuButton?: boolean;
}

/**
 * Component for the terminals menu on the nodes in BlockView.
 * @param interface
 * @returns a button to active the menu for the terminal supplied
 */
const TerminalsMenuComponent = ({ node, terminals, onClick, isParent, isInput, showMenuButton = true }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <TerminalMenuWrapper>
      <TerminalsMenuButton
        node={node}
        isParent={isParent}
        showMenuButton={showMenuButton}
        terminals={terminals}
        onClick={() => Click.OnInputMenu(setShowMenu, showMenu)}
        isInput={isInput}
      />
      {showMenu && (
        <TerminalsMenu
          node={node}
          isInput={isInput}
          terminals={terminals}
          hasActiveTerminals={terminals.some((conn) => conn.visible)}
          onClick={onClick}
          onBlur={() => Click.OnBlur(setShowMenu, showMenu)}
        />
      )}
    </TerminalMenuWrapper>
  );
};

export default TerminalsMenuComponent;
