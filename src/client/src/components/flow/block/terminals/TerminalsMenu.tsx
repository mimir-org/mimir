import { GetAspectColor } from "../../../../helpers";
import { AspectColorType, Connector, Node } from "../../../../models";
import { SetTerminalsMenuOffset } from "./helpers";
import { TerminalsBox } from "./styled";
import { electroSelector, useAppSelector } from "../../../../redux/store";
import { TerminalsMenuElement } from ".";

interface Props {
  node: Node;
  isInput?: boolean;
  terminals: Connector[];
  hasActiveTerminals: boolean;
  isParent: boolean;
  onClick: (conn: Connector, isInput: boolean) => void;
  onBlur: () => void;
}

/**
 * Component for the drop-down menu of terminals.
 * @param interface
 * @returns a drop-down menu with a node's input or output terminals.
 */
const TerminalsMenu = ({ node, isInput, terminals, hasActiveTerminals, isParent, onClick, onBlur }: Props) => {
  const isElectroViewEnabled = useAppSelector(electroSelector);
  const menuOffset = SetTerminalsMenuOffset(isElectroViewEnabled, hasActiveTerminals, isParent);

  return (
    <TerminalsBox
      id={"terminals-dropdown-" + node.id}
      tabIndex={0}
      onBlur={onBlur}
      color={GetAspectColor(node, AspectColorType.Selected)}
      isInput={isInput}
      menuOffset={menuOffset}
    >
      {terminals.map((conn) => (
        <TerminalsMenuElement key={conn.id} conn={conn} isInput={isInput} onClick={onClick} />
      ))}
    </TerminalsBox>
  );
};
export default TerminalsMenu;
