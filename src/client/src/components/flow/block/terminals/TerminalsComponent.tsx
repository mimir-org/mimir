import * as Click from "./handlers";
import { TerminalsMenuBox, TerminalsMenuComponent } from ".";
import { Connector, Node } from "../../../../models";
import { IsInputTerminal, IsPartOf } from "../../helpers";
import { nodeSizeSelector, productNodeSizeSelector, useAppSelector } from "../../../../redux/store";
import { IsProduct } from "../../../../helpers";

interface Props {
  node: Node;
  inputMenuOpen: boolean;
  outputMenuOpen: boolean;
  terminals: Connector[];
  electro: boolean;
  showMenuBox: boolean;
  showInTerminalMenu: any;
  showOutTerminalMenu: any;
  onClick: (conn: Connector) => void;
  isParent?: boolean;
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
  electro,
  showMenuBox,
  showInTerminalMenu,
  showOutTerminalMenu,
  onClick,
  isParent = false,
}: Props) => {
  const inTerminals = terminals.filter((t) => IsInputTerminal(t) && !IsPartOf(t));
  const outTerminals = terminals.filter((t) => !IsInputTerminal(t) && !IsPartOf(t));
  const parentBlockSize = useAppSelector(nodeSizeSelector);
  const parentProductBlockSize = useAppSelector(productNodeSizeSelector);

  return (
    <>
      <TerminalsMenuBox
        node={node}
        isParent={isParent}
        isInput={true}
        showMenuBox={showMenuBox}
        terminals={inTerminals}
        onClick={() => Click.OnInputMenu(showInTerminalMenu, inputMenuOpen)}
      />
      <TerminalsMenuBox
        node={node}
        isParent={isParent}
        isInput={false}
        showMenuBox={showMenuBox}
        terminals={outTerminals}
        onClick={() => Click.OnOutputMenu(showOutTerminalMenu, outputMenuOpen)}
      />
      {inputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          isParent={isParent}
          IsInput={true}
          terminals={inTerminals}
          electro={electro}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showInTerminalMenu, inputMenuOpen)}
          parentBlockSize={IsProduct(node) ? parentProductBlockSize : parentBlockSize}
        />
      )}
      {outputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          isParent={isParent}
          IsInput={false}
          electro={electro}
          terminals={outTerminals}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showOutTerminalMenu, outputMenuOpen)}
          parentBlockSize={IsProduct(node) ? parentProductBlockSize : parentBlockSize}
        />
      )}
    </>
  );
};
export default TerminalsContainerComponent;
