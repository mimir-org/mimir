import { GetAspectColor } from "../../../../helpers";
import { AspectColorType, Connector, Node } from "../../../../models";
import { GetTerminalColor, SetMenuXPos } from "./helpers";
import { TerminalsBox, TerminalsElement, ColorBar } from "./styled";
import { Checkbox } from "../../../../compLibrary/input/checkbox/common";
import { Color } from "../../../../compLibrary/colors";
import { BlockNodeSize } from "../../../../models/project";

interface Props {
  node: Node;
  parent: boolean;
  input: boolean;
  terminals: Connector[];
  electro: boolean;
  onClick: (conn: Connector) => void;
  onBlur: () => void;
  parentBlockSize: BlockNodeSize;
}

/**
 * Component for the drop-down menu of terminals.
 * @param interface
 * @returns a drop-down menu with a node's input or output terminals.
 */
const TerminalsMenuComponent = ({ node, parent, input, terminals, onClick, onBlur, electro, parentBlockSize }: Props) => {
  const hasActiveTerminals = terminals.some((conn) => conn.visible);

  return (
    <TerminalsBox
      tabIndex={0}
      parent={parent}
      input={input}
      onBlur={onBlur}
      color={GetAspectColor(node, AspectColorType.Selected)}
      xPos={SetMenuXPos(parent, electro, hasActiveTerminals, node, parentBlockSize)}
    >
      {terminals.map((conn) => (
        <TerminalsElement key={conn.id}>
          <ColorBar color={GetTerminalColor(conn)} />
          <div className="text" onClick={() => onClick(conn)}>
            {conn.name}
          </div>
          <Checkbox isChecked={conn.visible} onChange={() => onClick(conn)} color={Color.GreyDark} id={conn.id} />
        </TerminalsElement>
      ))}
    </TerminalsBox>
  );
};

export default TerminalsMenuComponent;
