import * as Click from "./handlers";
import { TerminalsMenu, TerminalsMenuButton } from ".";
import { Connector, Node } from "../../../../models";
import { IsBidirectionalTerminal, IsInputTerminal, IsOutputTerminal, IsPartOf } from "../../helpers";
import { BlockNodeSize } from "../../../../models/project";

interface Props {
  node: Node;
  terminals: Connector[];
  size: BlockNodeSize;
  showInputMenu: boolean;
  showOutputMenu: boolean;
  setShowInputMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOutputMenu: React.Dispatch<React.SetStateAction<boolean>>;
  electro: boolean;
  onClick: (conn: Connector, isInput: boolean) => void;
  isParent?: boolean;
  showMenuButton?: boolean;
}

/**
 * Component for the terminals menu on the nodes in BlockView.
 * @param interface
 * @returns two buttons to activate two menus of input and output terminals.
 */
const TerminalsMenuComponent = ({
  node,
  size,
  showInputMenu,
  showOutputMenu,
  terminals,
  electro,
  setShowInputMenu,
  setShowOutputMenu,
  onClick,
  isParent,
  showMenuButton = true,
}: Props) => {
  const inputTerminals: Connector[] = [];
  const outputTerminals: Connector[] = [];

  terminals.forEach((t) => {
    if (!IsPartOf(t)) {
      if (IsInputTerminal(t) || IsBidirectionalTerminal(t)) inputTerminals.push(t);
      if (IsOutputTerminal(t) || IsBidirectionalTerminal(t)) outputTerminals.push(t);
    }
  });

  return (
    <>
      <TerminalsMenuButton
        node={node}
        isParent={isParent}
        showMenuButton={showMenuButton}
        terminals={inputTerminals}
        onClick={() => Click.OnInputMenu(setShowInputMenu, showInputMenu)}
        isInput
      />
      <TerminalsMenuButton
        node={node}
        isParent={isParent}
        showMenuButton={showMenuButton}
        terminals={outputTerminals}
        onClick={() => Click.OnOutputMenu(setShowOutputMenu, showOutputMenu)}
      />
      {showInputMenu && (
        <TerminalsMenu
          node={node}
          size={size}
          isParent={isParent}
          electro={electro}
          terminals={inputTerminals}
          hasActiveTerminals={inputTerminals.some((conn) => conn.visible)}
          onClick={onClick}
          onBlur={() => Click.OnBlur(setShowInputMenu, showInputMenu)}
          isInput
        />
      )}
      {showOutputMenu && (
        <TerminalsMenu
          node={node}
          size={size}
          isParent={isParent}
          electro={electro}
          terminals={outputTerminals}
          hasActiveTerminals={outputTerminals.some((conn) => conn.visible)}
          onClick={onClick}
          onBlur={() => Click.OnBlur(setShowOutputMenu, showOutputMenu)}
        />
      )}
    </>
  );
};
export default TerminalsMenuComponent;
