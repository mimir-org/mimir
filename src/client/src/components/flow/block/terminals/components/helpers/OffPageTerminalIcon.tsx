import { Connector } from "@mimirorg/modelbuilder-types";
import { BidirectionalIcon, BidirectionalVerticalIcon } from "../../../../../../assets/icons/connectors";
import { IsBidirectionalTerminal } from "../../../../helpers/Connectors";
import { OffPageRequiredIcon, OffPageRequiredVerticalIcon } from "../../../../../../assets/icons/offpage";

interface Props {
  conn: Connector;
  color: string;
  className: string;
  isElectroView: boolean;
}

/**
 * Component for an OffPage terminal icon in a Node's drop-down menu for terminals in BlockView.
 * @param interface
 * @returns an icon.
 */
const OffPageTerminalIcon = ({ conn, color, className, isElectroView }: Props) => {
  if (isElectroView) return OffPageVerticalTerminalIcon(conn, color, className);
  if (IsBidirectionalTerminal(conn)) return <BidirectionalIcon style={{ fill: color }} className={className} />;

  return <OffPageRequiredIcon style={{ fill: color }} className={className} />;
};

function OffPageVerticalTerminalIcon(connector: Connector, color: string, className: string) {
  if (IsBidirectionalTerminal(connector)) return <BidirectionalVerticalIcon style={{ fill: color }} className={className} />;
  return <OffPageRequiredVerticalIcon style={{ fill: color }} className={className} />;
}

export default OffPageTerminalIcon;
