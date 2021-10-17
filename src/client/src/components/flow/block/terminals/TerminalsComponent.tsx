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
  menuBox: boolean;
  mainConnectNode: boolean;
  showInTerminalMenu: any;
  showOutTerminalMenu: any;
  splitView: boolean;
  onClick: (conn: Connector) => void;
}

/**
 * Component for the terminals menu on the nodes in BlockView.
 * @param param0
 * @returns two buttons to activate two drop-down menus of input and output terminals.
 */
const TerminalsComponent = ({
  node,
  inputMenuOpen,
  outputMenuOpen,
  terminals,
  parent,
  menuBox,
  mainConnectNode,
  showInTerminalMenu,
  showOutTerminalMenu,
  splitView,
  onClick,
}: Props) => {
  const inTerminals = terminals.filter((t) => IsInputTerminal(t));
  const outTerminals = terminals.filter((t) => !IsInputTerminal(t));

  return (
    <>
      <TerminalsBox
        visible={menuBox && !IsAspectNode(node) && inTerminals.length > 0}
        parent={parent || mainConnectNode}
        input={true}
        mainConnectNode={mainConnectNode}
      >
        <img
          src={GetMenuIcon(node, parent, true, mainConnectNode)}
          alt="menu"
          onClick={() => Click.OnInputMenu(showInTerminalMenu, inputMenuOpen)}
        />
      </TerminalsBox>

      <TerminalsBox
        visible={menuBox && !IsAspectNode(node) && outTerminals.length > 0}
        parent={parent || mainConnectNode}
        input={false}
        mainConnectNode={mainConnectNode}
      >
        <img
          src={GetMenuIcon(node, parent, false, mainConnectNode)}
          alt="menu"
          onClick={() => Click.OnOutputMenu(showOutTerminalMenu, outputMenuOpen)}
        />
      </TerminalsBox>

      {inputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          parent={parent}
          input={true}
          splitView={splitView}
          terminals={inTerminals}
          visible={inputMenuOpen}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showInTerminalMenu, inputMenuOpen)}
        />
      )}
      {outputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          parent={parent}
          input={false}
          splitView={splitView}
          visible={outputMenuOpen}
          terminals={outTerminals}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showOutTerminalMenu, outputMenuOpen)}
        />
      )}
    </>
  );
};
export default TerminalsComponent;
