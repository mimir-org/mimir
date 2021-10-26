import { Connector, Node } from "../../../../models";
import { GetMenuColor, GetTerminalColor, SetMenuXPos } from "./helpers";
import { TerminalsMenu, TerminalsElement, ColorBar } from "./styled";

interface Props {
  node: Node;
  parent: boolean;
  input: boolean;
  splitView: boolean;
  terminals: Connector[];
  visible: boolean;
  electro: boolean;
  onClick: (conn: Connector) => void;
  onBlur: () => void;
}

/**
 * Component for the drop-down menu of terminals.
 * @param param0
 * @returns a drop-down menu with a nodes' input or output terminals.
 */
const TerminalsMenuComponent = ({ node, parent, input, terminals, visible, onClick, onBlur, electro }: Props) => {
  const hasActiveTerminals = terminals.some((conn) => conn.visible);

  return (
    visible && (
      <TerminalsMenu
        parent={parent}
        input={input}
        tabIndex={0}
        onBlur={onBlur}
        color={GetMenuColor(node)}
        xPos={SetMenuXPos(parent, electro, hasActiveTerminals, node?.width)}
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
    )
  );
};

export default TerminalsMenuComponent;
