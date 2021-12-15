import * as Click from "./handlers";
import { TerminalsMenuBox, TerminalsMenuComponent } from ".";
import { Connector, Node } from "../../../../models";
import { IsInputTerminal, IsPartOf } from "../../helpers";
import { BlockNodeSize } from "../../../../models/project";

interface Props {
  node: Node;
  size: BlockNodeSize;
  inputMenuOpen: boolean;
  outputMenuOpen: boolean;
  terminals: Connector[];
  electro: boolean;
  showInTerminalMenu: any;
  showOutTerminalMenu: any;
  onClick: (conn: Connector) => void;
  isParent?: boolean;
  showMenuBox?: boolean;
}

/**
 * Component for the terminals menu on the nodes in BlockView.
 * @param interface
 * @returns two buttons to activate two drop-down menus of input and output terminals.
 */
const TerminalsContainerComponent = ({
  node,
  size,
  inputMenuOpen,
  outputMenuOpen,
  terminals,
  electro,
  showInTerminalMenu,
  showOutTerminalMenu,
  onClick,
  isParent,
  showMenuBox = true,
}: Props) => {
  const inputTerminals = terminals.filter((t) => IsInputTerminal(t) && !IsPartOf(t));
  const outputTerminals = terminals.filter((t) => !IsInputTerminal(t) && !IsPartOf(t));

  return (
    <>
      <TerminalsMenuBox
        node={node}
        isParent={isParent}
        showMenuBox={showMenuBox}
        terminals={inputTerminals}
        onClick={() => Click.OnInputMenu(showInTerminalMenu, inputMenuOpen)}
        isInput
      />
      <TerminalsMenuBox
        node={node}
        isParent={isParent}
        isInput={false}
        showMenuBox={showMenuBox}
        terminals={outputTerminals}
        onClick={() => Click.OnOutputMenu(showOutTerminalMenu, outputMenuOpen)}
      />
      {inputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          size={size}
          isParent={isParent}
          terminals={inputTerminals}
          electro={electro}
          hasActiveTerminals={inputTerminals.some((conn) => conn.visible)}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showInTerminalMenu, inputMenuOpen)}
          IsInput
        />
      )}
      {outputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          size={size}
          isParent={isParent}
          IsInput={false}
          electro={electro}
          hasActiveTerminals={outputTerminals.some((conn) => conn.visible)}
          terminals={outputTerminals}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showOutTerminalMenu, outputMenuOpen)}
        />
      )}
    </>
  );
};
export default TerminalsContainerComponent;
