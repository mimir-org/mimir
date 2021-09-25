import { Connector, Node } from "../../../../models";
import { GetMenuIcon } from "./helpers";
import { OnTerminalMenuClick } from "./handlers";
import { TerminalsMenu, TerminalsElement, TerminalsBox } from "./styled";
import { ArrowDown, ArrowUp } from "../../../../assets/icons/blockView";
import {
  GetConnectorIcon,
  GetConnectorName,
  IsAspectNode,
} from "../../helpers/common";

interface Props {
  node: Node;
  isMenuOpen: boolean;
  list: Connector[];
  width: number;
  isParent: boolean;
  isLocation: boolean;
  menuButton: boolean;
  showTerminalMenu: any;
  terminalMenu: boolean;
  isSplitView?: boolean;
  onClick: (conn: Connector) => void;
}

/**
 * Component for the terminals menu on nodes in BlockView. The menu is opened from the icon in the upper-right corner.
 * @param param0
 * @returns a drop-down menu where you can select from the nodes' terminals.
 */
const TerminalsComponent = ({
  node,
  isMenuOpen,
  list,
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
    >
      {isParent && (
        <>
          <img src={ArrowUp} alt="up" className="arrow" />
          <img src={ArrowDown} alt="down" className="arrow" />
        </>
      )}
      <img
        src={GetMenuIcon(node, isParent)}
        alt="menu"
        onClick={() => OnTerminalMenuClick(showTerminalMenu, terminalMenu)}
      />
    </TerminalsBox>

    {isMenuOpen && (
      <TerminalsMenu width={width} isParent={isParent} isLocation={isLocation}>
        {list.map((conn) => (
          <TerminalsElement key={conn.id}>
            <p className="text">{GetConnectorName(conn)}</p>
            <label className={"checkbox-block"}>
              <input
                type="checkbox"
                checked={conn.visible}
                onChange={() => onClick(conn)}
              />
              <span className="checkmark-block"></span>
            </label>
            <img
              src={GetConnectorIcon(conn.color)}
              alt="icon"
              className="button"
            />
          </TerminalsElement>
        ))}
      </TerminalsMenu>
    )}
  </>
);
export default TerminalsComponent;
