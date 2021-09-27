import { Connector, Node } from "../../../../models";
import { GetMenuIcon } from "./helpers";
import { OnTerminalMenuClick } from "./handlers";
import { TerminalsMenu, TerminalsElement, TerminalsBox } from "./styled";
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
 * Component for the terminals menu on a blockView nodes
 * @param param0
 * @returns a drop-down menu that displays all available terminals
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
      onClick={() => OnTerminalMenuClick(showTerminalMenu, terminalMenu)}
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
