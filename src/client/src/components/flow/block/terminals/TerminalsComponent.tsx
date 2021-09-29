import * as Click from "./handlers";
import { TerminalsMenuComponent } from ".";
import { Connector, Node } from "../../../../models";
import { GetMenuIcon, SetTerminalsButtonPosition } from "./helpers";
import { TerminalsBox } from "./styled";
import { IsAspectNode, IsInputTerminal } from "../../helpers/common";

interface Props {
  node: Node;
  isMenuOpen: boolean;
  terminals: Connector[];
  width: number;
  isParent: boolean;
  isLocation: boolean;
  menuButton: boolean;
  showTerminalMenu: any;
  terminalMenu: boolean;
  isSplitView?: boolean;
  onClick: () => void;
}

/**
 * Component for the terminals menu on the nodes in BlockView.
 * @param param0
 * @returns two buttons to activate two drop-down menus of terminals.
 */
const TerminalsComponent = ({
  node,
  isMenuOpen,
  terminals,
  width,
  isParent,
  isLocation,
  menuButton,
  showTerminalMenu,
  terminalMenu,
  isSplitView,
  onClick,
}: Props) => (
  <>
    <TerminalsBox
      visible={menuButton && !IsAspectNode(node)}
      isSplitView={isSplitView}
      isParent={isParent}
      position={SetTerminalsButtonPosition(isSplitView, isParent, true)}
    >
      <img
        src={GetMenuIcon(node, isParent, true)}
        alt="menu"
        onClick={() => Click.OnInputMenu(showTerminalMenu, terminalMenu)}
      />
    </TerminalsBox>

    <TerminalsBox
      visible={menuButton && !IsAspectNode(node)}
      isSplitView={isSplitView}
      isParent={isParent}
      position={SetTerminalsButtonPosition(isSplitView, isParent, false)}
    >
      <img
        src={GetMenuIcon(node, isParent, false)}
        alt="menu"
        onClick={() => Click.OnOutputMenu(showTerminalMenu, terminalMenu)}
      />
    </TerminalsBox>

    {isMenuOpen && (
      <TerminalsMenuComponent
        width={width}
        isParent={isParent}
        isLocation={isLocation}
        isInput={true}
        terminals={terminals.filter((t) => IsInputTerminal(t))}
        onClick={onClick}
      />
    )}
    {isMenuOpen && (
      <TerminalsMenuComponent
        width={width}
        isParent={isParent}
        isLocation={isLocation}
        isInput={false}
        terminals={terminals.filter((t) => !IsInputTerminal(t))}
        onClick={onClick}
      />
    )}
  </>
);
export default TerminalsComponent;
