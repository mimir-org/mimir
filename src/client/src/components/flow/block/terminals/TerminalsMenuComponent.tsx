import { GetAspectColor } from "../../../../helpers";
import { AspectColorType, Connector, Node } from "../../../../models";
import { GetTerminalColor, SetMenuXPos } from "./helpers";
import { TerminalsMenu, TerminalsElement, ColorBar } from "./styled";
import { Checkbox } from "../../../../compLibrary/checkbox/common";
import { Color } from "../../../../compLibrary";

interface Props {
  node: Node;
  parent: boolean;
  input: boolean;
  terminals: Connector[];
  visible: boolean;
  electro: boolean;
  onClick: (conn: Connector) => void;
  onBlur: () => void;
}

/**
 * Component for the drop-down menu of terminals.
 * @param interface
 * @returns a drop-down menu with a node's input or output terminals.
 */
const TerminalsMenuComponent = ({ node, parent, input, terminals, visible, onClick, onBlur, electro }: Props) => {
  const hasActiveTerminals = terminals.some((conn) => conn.visible);

  return (
    visible && (
      <TerminalsMenu
        tabIndex={0}
        parent={parent}
        input={input}
        onBlur={onBlur}
        color={GetAspectColor(node, AspectColorType.Selected)}
        xPos={SetMenuXPos(parent, electro, hasActiveTerminals, node)}
      >
        {terminals.map((conn) => (
          <TerminalsElement key={conn.id}>
            <ColorBar color={GetTerminalColor(conn)} />
            <div className="text" onClick={() => onClick(conn)}>
              {conn.name}
            </div>
            <Checkbox isChecked={conn.visible} onChange={() => onClick(conn)} color={Color.DarkGrey} />
          </TerminalsElement>
        ))}
      </TerminalsMenu>
    )
  );
};

export default TerminalsMenuComponent;
