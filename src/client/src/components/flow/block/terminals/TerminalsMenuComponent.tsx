import { Connector, Node } from "../../../../models";
import { IsMainConnectNode } from "../../block/connectView/helpers";
import { GetMenuColor, GetTerminalColor } from "./helpers";
import { TerminalsMenu, TerminalsElement, ColorBar } from "./styled";
import { IsLocation } from "../../helpers";

interface Props {
  node: Node;
  parent: boolean;
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
const TerminalsMenuComponent = ({ node, parent, isInput, splitView, terminals, visible, onClick, onBlur }: Props) =>
  visible && (
    <TerminalsMenu
      splitView={splitView}
      parent={parent}
      location={IsLocation(node)}
      isInput={isInput}
      connectView={IsMainConnectNode(node.id)}
      tabIndex={0}
      onBlur={onBlur}
      color={GetMenuColor(node)}
    >
      {terminals.map((conn) => (
        <TerminalsElement key={conn.id}>
          <ColorBar color={GetTerminalColor(conn)} />
          <div className="text" onClick={() => onClick(conn)}>
            {conn.name}
          </div>
          <label className={"checkbox-block"}>
            <input type="checkbox" checked={conn.visible} onChange={() => onClick(conn)} />
            <span className="checkmark-block"></span>
          </label>
        </TerminalsElement>
      ))}
    </TerminalsMenu>
  );

export default TerminalsMenuComponent;
