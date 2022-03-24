import { BidirectionalIcon } from "../../../../../assets/icons/bidirectional";
import { Color } from "../../../../../compLibrary/colors/Color";
import { Checkbox } from "../../../../../compLibrary/input/checkbox/common/Checkbox";
import { IsConnectorVisible } from "../../../../../helpers";
import { Connector } from "../../../../../models";
import { IsBidirectionalTerminal } from "../../../helpers";
import { GetTerminalColor } from "../../helpers";
import { BidirectionalBox, ColorTag, TerminalsElementBox } from "./TerminalsMenuElement.styled";

interface Props {
  conn: Connector;
  isInput: boolean;
  onClick: (conn: Connector, isInput: boolean) => void;
}

/**
 * Component for a single terminal in the TerminalsMenu.
 * @param interface
 * @returns a clickable terminal with a checkbox.
 */
export const TerminalsMenuElement = ({ conn, isInput, onClick }: Props) => (
  <TerminalsElementBox key={conn.id}>
    <Checkbox
      isChecked={IsConnectorVisible(conn)}
      onChange={() => onClick(conn, isInput)}
      color={Color.LIGHT_SILVER}
      id={conn.id}
    />
    {IsBidirectionalTerminal(conn) ? (
      <BidirectionalBox>
        <BidirectionalIcon fill={GetTerminalColor(conn)} className="icon" />
        {conn.name}
      </BidirectionalBox>
    ) : (
      <ColorTag color={GetTerminalColor(conn)}>{conn.name}</ColorTag>
    )}
  </TerminalsElementBox>
);
