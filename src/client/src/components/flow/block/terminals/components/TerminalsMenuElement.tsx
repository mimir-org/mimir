import { BidirectionalIcon } from "../../../../../assets/icons/bidirectional";
import { Color } from "../../../../../assets/color/Color";
import { Checkbox } from "../../../../../compLibrary/input/checkbox/common/Checkbox";
import { IsBidirectionalTerminal, IsConnectorVisible } from "../../../helpers/Connectors";
import { GetConnectorColor } from "../../helpers";
import { BidirectionalBox, ColorTag, TerminalsElementBox } from "./TerminalsMenuElement.styled";
import { Connector } from "@mimirorg/modelbuilder-types";

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
        <BidirectionalIcon fill={GetConnectorColor(conn)} className="icon" />
        {conn.name}
      </BidirectionalBox>
    ) : (
      <ColorTag color={GetConnectorColor(conn)}>{conn.name}</ColorTag>
    )}
  </TerminalsElementBox>
);
