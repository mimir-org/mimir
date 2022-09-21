import { Connector } from "@mimirorg/modelbuilder-types";
import { BidirectionalIcon } from "../../../../../../assets/icons/bidirectional";
import { InputConnectorIcon, OutputConnectorIcon } from "../../../../../../assets/icons/connectors";
import { IsBidirectionalTerminal } from "../../../../helpers/Connectors";

interface Props {
  conn: Connector;
  color: string;
  isInput: boolean;
}

/**
 * Component for the terminal icon in the drop-down menu for a Node in BlockView.
 * @param interface
 * @returns an icon.
 */
export const TerminalIcon = ({ conn, color, isInput }: Props) => {
  if (IsBidirectionalTerminal(conn)) return <BidirectionalIcon style={{ fill: color }} className={"icon"} />;
  return isInput ? (
    <InputConnectorIcon style={{ fill: color }} className={"icon"} />
  ) : (
    <OutputConnectorIcon style={{ fill: color }} className={"icon"} />
  );
};
