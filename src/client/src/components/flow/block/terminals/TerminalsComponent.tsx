import * as Click from "./handlers";
import { TerminalsMenuBox, TerminalsMenuComponent } from ".";
import { Connector, Node } from "../../../../models";
import { IsInputTerminal, IsPartOf } from "../../helpers";
import { nodeSizeSelector, useAppSelector } from "../../../../redux/store";

interface Props {
  node: Node;
  inputMenuOpen: boolean;
  outputMenuOpen: boolean;
  terminals: Connector[];
  parent: boolean;
  electro: boolean;
  showMenuBox: boolean;
  showInTerminalMenu: any;
  showOutTerminalMenu: any;
  onClick: (conn: Connector) => void;
}

/**
 * Component for the terminals menu on the nodes in BlockView.
 * @param interface
 * @returns two buttons to activate two drop-down menus of input and output terminals.
 */
const TerminalsContainerComponent = ({
  node,
  inputMenuOpen,
  outputMenuOpen,
  terminals,
  parent,
  electro,
  showMenuBox,
  showInTerminalMenu,
  showOutTerminalMenu,
  onClick,
}: Props) => {
  const inTerminals = terminals.filter((t) => IsInputTerminal(t) && !IsPartOf(t));
  const outTerminals = terminals.filter((t) => !IsInputTerminal(t) && !IsPartOf(t));
  const parentBlockSize = useAppSelector(nodeSizeSelector);

  return (
    <>
      <TerminalsMenuBox
        node={node}
        isParent={parent}
        isInput={true}
        showMenuBox={showMenuBox}
        terminals={inTerminals}
        onClick={() => Click.OnInputMenu(showInTerminalMenu, inputMenuOpen)}
      />
      <TerminalsMenuBox
        node={node}
        isParent={parent}
        isInput={false}
        showMenuBox={showMenuBox}
        terminals={outTerminals}
        onClick={() => Click.OnOutputMenu(showOutTerminalMenu, outputMenuOpen)}
      />
      {inputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          parent={parent}
          input={true}
          terminals={inTerminals}
          visible={inputMenuOpen}
          electro={electro}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showInTerminalMenu, inputMenuOpen)}
          parentBlockSize={parentBlockSize}
        />
      )}
      {outputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          parent={parent}
          input={false}
          visible={outputMenuOpen}
          electro={electro}
          terminals={outTerminals}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showOutTerminalMenu, outputMenuOpen)}
          parentBlockSize={parentBlockSize}
        />
      )}
    </>
  );
};
export default TerminalsContainerComponent;
