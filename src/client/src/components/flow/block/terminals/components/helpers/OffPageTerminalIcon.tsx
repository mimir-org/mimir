import { Connector } from "@mimirorg/modelbuilder-types";
import { BidirectionalIcon } from "../../../../../../assets/icons/bidirectional";
import { OffPageRequiredInputIcon, OffPageRequiredOutputIcon } from "../../../../../../assets/icons/offpage";
import { IsBidirectionalTerminal } from "../../../../helpers/Connectors";

interface Props {
  conn: Connector;
  color: string;
  className: string;
  isInput: boolean;
}

/**
 * Component for an OffPage terminal icon in a Node's drop-down menu for terminals in BlockView.
 * @param interface
 * @returns an icon.
 */
const OffPageTerminalIcon = ({ conn, color, className, isInput }: Props) => {
  if (IsBidirectionalTerminal(conn)) return <BidirectionalIcon style={{ fill: color }} className={className} />;
  return !isInput ? (
    <OffPageRequiredInputIcon style={{ fill: color }} className={className} />
  ) : (
    <OffPageRequiredOutputIcon style={{ fill: color }} className={className} />
  );
};

export default OffPageTerminalIcon;
