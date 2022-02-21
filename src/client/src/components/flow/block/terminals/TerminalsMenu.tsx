import { GetAspectColor, IsConnectorVisible } from "../../../../helpers";
import { AspectColorType, Connector, Node } from "../../../../models";
import { GetTerminalColor } from "./helpers";
import { BidirectionalBox, ColorTag, TerminalsBox, TerminalsElement } from "./styled";
import { Checkbox } from "../../../../compLibrary/input/checkbox/common";
import { Color } from "../../../../compLibrary/colors";
import { electroSelector, useAppSelector } from "../../../../redux/store";
import { IsBidirectionalTerminal } from "../../helpers";
import { BidirectionalIcon } from "../../../../assets/icons/bidirectional";

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
  let menuOffset = !isElectroViewEnabled && hasActiveTerminals ? "25px" : "8px";
  if (isParent) menuOffset = "-195px";

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
        <TerminalsElement key={conn.id}>
          <Checkbox
            isChecked={IsConnectorVisible(conn)}
            onChange={() => onClick(conn, isInput)}
            color={Color.GreyDark}
            id={conn.id}
          />
          {!IsBidirectionalTerminal(conn) ? (
            <ColorTag color={GetTerminalColor(conn)}>{conn.name}</ColorTag>
          ) : (
            <BidirectionalBox>
              <BidirectionalIcon fill={GetTerminalColor(conn)} className="icon" />
              {conn.name}
            </BidirectionalBox>
          )}
        </TerminalsElement>
      ))}
    </TerminalsBox>
  );
};
export default TerminalsMenu;
