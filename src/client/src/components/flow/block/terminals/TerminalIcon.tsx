import { Connector } from "../../../../models";
import { IsBidirectionalTerminal } from "../../helpers";
import { BidirectionalTerminal } from "../../../../assets/icons/bidirectional";
import { ConnectorIcon } from "../../../../assets/icons/connectors";

interface Props {
  conn: Connector;
  color: string;
  className: string;
}

/**
 * Component for the terminal icon in BlockView.
 * @param params
 * @returns an icon.
 */
const TerminalsIcon = ({ conn, color, className }: Props) => {
  if (IsBidirectionalTerminal(conn)) return <BidirectionalTerminal style={{ fill: color }} className={className} />;
  return <ConnectorIcon style={{ fill: color }} className={className} />;
};

export default TerminalsIcon;
