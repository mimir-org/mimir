import { BidirectionalIcon } from "../../../../assets/icons/bidirectional";
import { Color } from "../../../../compLibrary/colors";
import { Checkbox } from "../../../../compLibrary/input/checkbox/common";
import { IsConnectorVisible } from "../../../../helpers";
import { Connector } from "../../../../models";
import { IsBidirectionalTerminal } from "../../helpers";
import { GetTerminalColor } from "./helpers";
import { BidirectionalBox, ColorTag, TerminalsElement } from "./styled";

interface Props {
  conn: Connector;
  isInput: boolean;
  onClick: (conn: Connector, isInput: boolean) => void;
}

/**
 * Component for one, single terminal in the TerminalsMenu.
 * @param interface
 * @returns a clickable terminal.
 */
const TerminalsMenuElement = ({ conn, isInput, onClick }: Props) => (
  <TerminalsElement key={conn.id}>
    <Checkbox isChecked={IsConnectorVisible(conn)} onChange={() => onClick(conn, isInput)} color={Color.GreyDark} id={conn.id} />
    {IsBidirectionalTerminal(conn) ? (
      <BidirectionalBox>
        <BidirectionalIcon fill={GetTerminalColor(conn)} className="icon" />
        {conn.name}
      </BidirectionalBox>
    ) : (
      <ColorTag color={GetTerminalColor(conn)}>{conn.name}</ColorTag>
    )}
  </TerminalsElement>
);

export default TerminalsMenuElement;
