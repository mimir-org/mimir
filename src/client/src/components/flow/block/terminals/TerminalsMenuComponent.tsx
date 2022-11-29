import { TerminalsMenu, TerminalsMenuButton } from "./components";
import { useState } from "react";
import { TerminalMenuWrapper } from "./TerminalsMenuComponent.styled";
import { IsConnectorVisible } from "../../helpers/Connectors";
import { OnBlur, OnInputMenuClick } from "./handlers/OnTerminalClick";
import { Node, Connector, ConnectorDirection } from "@mimirorg/modelbuilder-types";

interface Props {
  node: Node;
  connectors: Connector[];
  onClick: (conn: Connector, isInput: boolean, node: Node, isElectroView: boolean) => void;
  isInput: boolean;
  isElectroView: boolean;
  isParent?: boolean;
  showMenuButton?: boolean;
  onClickAddTerminal: (typeId: string, nodeId: string, direction: ConnectorDirection) => void;
  onClickRemoveTerminal: (nodeId: string, terminalId: string) => void;
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
          hasActiveTerminals={connectors.some((conn) => IsConnectorVisible(conn))}
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
