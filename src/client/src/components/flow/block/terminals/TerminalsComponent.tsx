import * as Click from "./handlers";
import { TerminalsMenuComponent } from ".";
import { Connector, Node } from "../../../../models";
import { GetMenuIcon } from "./helpers";
import { TerminalsBox } from "./styled";
import { IsAspectNode, IsInputTerminal } from "../../helpers";

interface Props {
  node: Node;
  inputMenuOpen: boolean;
  outputMenuOpen: boolean;
  terminals: Connector[];
  parent: boolean;
  electro: boolean;
  menuBox: boolean;
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
  menuBox,
  showInTerminalMenu,
  showOutTerminalMenu,
  onClick,
}: Props) => {
  const inTerminals = terminals.filter((t) => IsInputTerminal(t));
  const outTerminals = terminals.filter((t) => !IsInputTerminal(t));

  return (
    <>
      <TerminalsBox visible={menuBox && !IsAspectNode(node) && inTerminals.length > 0} parent={parent} input={true}>
        <img
          src={GetMenuIcon(node, parent, true)}
          alt="menu"
          onClick={() => Click.OnInputMenu(showInTerminalMenu, inputMenuOpen)}
        />
      </TerminalsBox>

      <TerminalsBox visible={menuBox && !IsAspectNode(node) && outTerminals.length > 0} parent={parent} input={false}>
        <img
          src={GetMenuIcon(node, parent, false)}
          alt="menu"
          onClick={() => Click.OnOutputMenu(showOutTerminalMenu, outputMenuOpen)}
        />
      </TerminalsBox>

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
        />
      )}
    </>
  );
};
export default TerminalsContainerComponent;
