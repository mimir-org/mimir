import { IsBidirectionalTerminal } from "../../../helpers/Connectors";
import { BidirectionalTerminal } from "../../../../../assets/icons/bidirectional";
import { ConnectorIcon } from "../../../../../assets/icons/connectors";
import { Connector } from "@mimirorg/modelbuilder-types";

interface Props {
  conn: Connector;
  color: string;
  className: string;
}

/**
 * Component for the handle (terminal) icon in BlockView.
 * @param params
 * @returns an icon.
 */
export const HandleIcon = ({ conn, color, className }: Props) => {
  if (IsBidirectionalTerminal(conn)) return <BidirectionalTerminal style={{ fill: color }} className={className} />;
  return <ConnectorIcon style={{ fill: color }} className={className} />;
};
