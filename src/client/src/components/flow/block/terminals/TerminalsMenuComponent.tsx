import { GetAspectColor } from "../../../../helpers";
import { AspectColorType, Connector, Node } from "../../../../models";
import { GetTerminalColor, SetMenuXPos } from "./helpers";
import { TerminalsBox, TerminalsElement, ColorTag } from "./styled";
import { Checkbox } from "../../../../compLibrary/input/checkbox/common";
import { Color } from "../../../../compLibrary/colors";

interface Props {
  node: Node;
  isParent: boolean;
  IsInput: boolean;
  terminals: Connector[];
  electro: boolean;
  hasActiveTerminals: boolean;
  onClick: (conn: Connector) => void;
  onBlur: () => void;
}

/**
 * Component for the drop-down menu of terminals.
 * @param interface
 * @returns a drop-down menu with a node's input or output terminals.
 */
const TerminalsMenuComponent = ({ node, isParent, IsInput, terminals, electro, hasActiveTerminals, onClick, onBlur }: Props) => (
  <TerminalsBox
    id={"terminals-dropdown-" + node.id}
    tabIndex={0}
    isParent={isParent}
    isInput={IsInput}
    onBlur={onBlur}
    color={GetAspectColor(node, AspectColorType.Selected)}
    xPos={SetMenuXPos(isParent, electro, hasActiveTerminals, node)}
  >
    {terminals.map((conn) => (
      <TerminalsElement key={conn.id}>
        <Checkbox isChecked={conn.visible} onChange={() => onClick(conn)} color={Color.GreyDark} id={conn.id} />
        <ColorTag color={GetTerminalColor(conn)}>{conn.name}</ColorTag>
      </TerminalsElement>
    ))}
  </TerminalsBox>
);
export default TerminalsMenuComponent;
