import * as Click from "./handlers";
import { TerminalsMenuComponent } from ".";
import { Connector, Node } from "../../../../models";
import { GetMenuIcon } from "./helpers";
import { TerminalsBox } from "./styled";
import { IsAspectNode, IsInputTerminal } from "../../helpers/common";

interface Props {
  node: Node;
  isInputMenuOpen: boolean;
  isOutputMenuOpen: boolean;
  terminals: Connector[];
  width: number;
  isParent: boolean;
  isLocation: boolean;
  menuButton: boolean;
  showInputTerminalMenu: any;
  showOutputTerminalMenu: any;
  isSplitView?: boolean;
  onClick: () => void;
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
  width,
  isParent,
  isLocation,
  menuButton,
  showInputTerminalMenu,
  showOutputTerminalMenu,
  isSplitView,
  onClick,
}: Props) => (
  <>
    <TerminalsBox
      visible={menuButton && !IsAspectNode(node)}
      isSplitView={isSplitView}
      isParent={isParent}
      isInput={true}
    >
      <img
        src={GetMenuIcon(node, isParent, true)}
        alt="menu"
        onClick={() =>
          Click.OnInputMenu(showInputTerminalMenu, isInputMenuOpen)
        }
      />
    </TerminalsBox>

    <TerminalsBox
      visible={menuButton && !IsAspectNode(node)}
      isSplitView={isSplitView}
      isParent={isParent}
      isinput={false}
    >
      <img
        src={GetMenuIcon(node, isParent, false)}
        alt="menu"
        onClick={() =>
          Click.OnOutputMenu(showOutputTerminalMenu, isOutputMenuOpen)
        }
      />
    </TerminalsBox>

    {isInputMenuOpen && (
      <TerminalsMenuComponent
        width={width}
        isParent={isParent}
        isLocation={isLocation}
        isInput={true}
        terminals={terminals.filter((t) => IsInputTerminal(t))}
        onClick={onClick}
      />
    )}
    {isOutputMenuOpen && (
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
