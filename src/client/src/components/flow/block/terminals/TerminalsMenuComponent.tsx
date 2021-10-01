import { Connector, Node } from "../../../../models";
import { IsMainConnectNode } from "../../helpers/block/connectView";
import { GetConnectorIcon } from "../../helpers/common";
import { TerminalsMenu, TerminalsElement } from "./styled";

interface Props {
  node: Node;
  isParent: boolean;
  isLocation: boolean;
  isInput: boolean;
  splitView: boolean;
  terminals: Connector[];
  visible: boolean;
  onClick: (conn: Connector) => void;
  onBlur: () => void;
}

/**
 * Component for the drop-down menu of terminals.
 * @param param0
 * @returns a drop-down menu with a nodes' input or output terminals.
 */
const TerminalsMenuComponent = ({
  node,
  isParent,
  isLocation,
  isInput,
  splitView,
  terminals,
  visible,
  onClick,
  onBlur,
}: Props) =>
  visible && (
    <TerminalsMenu
      splitView={splitView}
      isParent={isParent}
      isLocation={isLocation}
      isInput={isInput}
      isConnectView={IsMainConnectNode(node.id)}
      tabIndex={0}
      onBlur={onBlur}
    >
      {terminals.map((conn) => (
        <TerminalsElement key={conn.id}>
          <div className="text" onClick={() => onClick(conn)}>
            {conn.name} {conn.type}
          </div>
          <label className={"checkbox-block"}>
            <input type="checkbox" checked={conn.visible} onChange={() => onClick(conn)} />
            <span className="checkmark-block"></span>
          </label>
          <img
            src={GetConnectorIcon(conn.color)}
            alt="icon"
            className="button"
            onClick={() => onClick(conn)}
          />
        </TerminalsElement>
      ))}
    </TerminalsMenu>
  );

export default TerminalsMenuComponent;
