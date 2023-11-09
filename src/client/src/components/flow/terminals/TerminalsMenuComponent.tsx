import { useState } from "react";
import { TerminalMenuWrapper } from "./TerminalsMenuComponent.styled";
import { Block, Connector } from "lib";
import { TerminalsMenuButton } from "./TerminalsMenuButton";
import { TerminalsMenu } from "./TerminalsMenu";

interface Props {
  node: Block;
  connectors: Connector[];
  onClick: (conn: Connector, isInput: boolean, node: Block, isElectroView: boolean) => void;
  isInput: boolean;
  isElectroView: boolean;
  isParent?: boolean;
  showMenuButton?: boolean;
  onClickAddTerminal: (terminalId: string) => void;
  onClickRemoveTerminal: (terminalId: string) => void;
}

/**
 * The main component for the terminals menu on BlockView nodes.
 * @param interface
 * @returns a button to activate the menu, and a drop-down menu containing available terminals.
 */
export const TerminalsMenuComponent = ({
  node,
  connectors,
  onClick,
  isInput,
  isElectroView,
  isParent,
  showMenuButton = true,
  onClickAddTerminal,
  onClickRemoveTerminal,
}: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const OnInputMenuClick = (showTerminalMenu: (show: boolean) => void, terminalMenu: boolean) => {
    showTerminalMenu(!terminalMenu);
  };

  const OnBlur = (showInputTerminalMenu: (show: boolean) => void, isInputMenuOpen: boolean) => {
    showInputTerminalMenu(!isInputMenuOpen);
  };

  return (
    <TerminalMenuWrapper>
      <TerminalsMenuButton
        node={node}
        isParent={isParent}
        showMenuButton={showMenuButton}
        connectors={connectors}
        onClick={() => OnInputMenuClick(setShowMenu, showMenu)}
        isInput={isInput}
      />
      {showMenu && (
        <TerminalsMenu
          node={node}
          isInput={isInput}
          connectors={connectors}
          hasActiveTerminals={connectors.some((conn) => !conn.hidden)}
          isParent={isParent}
          isElectroView={isElectroView}
          onClick={onClick}
          onBlur={() => OnBlur(setShowMenu, showMenu)}
          onClickAddTerminal={onClickAddTerminal}
          onClickRemoveTerminal={onClickRemoveTerminal}
        />
      )}
    </TerminalMenuWrapper>
  );
};
