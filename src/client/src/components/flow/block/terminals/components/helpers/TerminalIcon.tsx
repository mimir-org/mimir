import { Connector } from "@mimirorg/modelbuilder-types";
import { BidirectionalIcon } from "../../../../../../assets/icons/bidirectional";
import { ConnectorIcon } from "../../../../../../assets/icons/connectors";
import { IsBidirectionalTerminal } from "../../../../helpers/Connectors";

interface Props {
  conn: Connector;
  color: string;
}

/**
 * Component for the terminal icon in the drop-down menu for a Node in BlockView.
 * @param interface
 * @returns an icon.
 */
export const TerminalIcon = ({ conn, color }: Props) => {
  if (IsBidirectionalTerminal(conn)) return <BidirectionalIcon style={{ fill: color }} className={"icon"} />;
  return <ConnectorIcon style={{ fill: color }} className={"icon"} />;
};
