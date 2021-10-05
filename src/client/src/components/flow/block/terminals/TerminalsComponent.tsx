import * as Click from "./handlers";
import { TerminalsMenuComponent } from ".";
import { Connector, Node } from "../../../../models";
import { GetMenuIcon } from "./helpers";
import { TerminalsBox } from "./styled";
import { IsAspectNode, IsInputTerminal } from "../../helpers";

interface Props {
  node: Node;
  isInputMenuOpen: boolean;
  isOutputMenuOpen: boolean;
  terminals: Connector[];
  isParent: boolean;
  isLocation: boolean;
  menuButton: boolean;
  showInputTerminalMenu: any;
  showOutputTerminalMenu: any;
  isSplitView: boolean;
  onClick: (conn: Connector) => void;
}

/**
 * Component for the terminals menu on the nodes in BlockView.
 * @param param0
 * @returns two buttons to activate two drop-down menus of input and output terminals.
 */
const TerminalsComponent = ({
  node,
  isInputMenuOpen,
  isOutputMenuOpen,
  terminals,
  isParent,
  isLocation,
  menuButton,
  showInputTerminalMenu,
  showOutputTerminalMenu,
  isSplitView,
  onClick,
}: Props) => {
  const inTerminals = terminals.filter((t) => IsInputTerminal(t));
  const outTerminals = terminals.filter((t) => !IsInputTerminal(t));

  return (
    <>
      <TerminalsBox
        visible={menuButton && !IsAspectNode(node) && inTerminals.length > 0}
        isSplitView={isSplitView}
        isParent={isParent}
        isInput={true}
      >
        <img
          src={GetMenuIcon(node, isParent, true)}
          alt="menu"
          onClick={() => Click.OnInputMenu(showInputTerminalMenu, isInputMenuOpen)}
        />
      </TerminalsBox>

      <TerminalsBox
        visible={menuButton && !IsAspectNode(node) && outTerminals.length > 0}
        isSplitView={isSplitView}
        isParent={isParent}
        isinput={false}
      >
        <img
          src={GetMenuIcon(node, isParent, false)}
          alt="menu"
          onClick={() => Click.OnOutputMenu(showOutputTerminalMenu, isOutputMenuOpen)}
        />
      </TerminalsBox>

      {isInputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          isParent={isParent}
          isLocation={isLocation}
          isInput={true}
          splitView={isSplitView}
          terminals={inTerminals}
          visible={isInputMenuOpen}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showInputTerminalMenu, isInputMenuOpen)}
        />
      )}
      {isOutputMenuOpen && (
        <TerminalsMenuComponent
          node={node}
          isParent={isParent}
          isLocation={isLocation}
          isInput={false}
          splitView={isSplitView}
          visible={isOutputMenuOpen}
          terminals={outTerminals}
          onClick={onClick}
          onBlur={() => Click.OnBlur(showOutputTerminalMenu, isOutputMenuOpen)}
        />
      )}
    </>
  );
};
export default TerminalsComponent;
