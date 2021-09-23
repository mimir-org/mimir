import { Connector, Node } from "../../../models";
import { GetMenuIcon } from "../nodes/blockParentNode/helpers";
import { OnMenuClick } from "../nodes/blockParentNode/handlers";
import {
  TerminalsMenu,
  TerminalsElement,
  TerminalsBox,
} from "../../../compLibrary/blockView";
import {
  GetConnectorIcon,
  GetConnectorName,
  IsAspectNode,
} from "../helpers/common";

/** Component for the terminals menu. This is the menu in the upper-right corner of a node
 *  The component returns a drop-down menu where you can select from the nodes' terminals
 */

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
      parent={isParent}
      isSplitView={isSplitView}
      onClick={() => OnMenuClick(showTerminalMenu, terminalMenu)}
    >
      <img src={GetMenuIcon(node)} alt="options" />
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
