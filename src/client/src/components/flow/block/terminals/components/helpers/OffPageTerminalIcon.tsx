import { Connector } from "@mimirorg/modelbuilder-types";
import { BidirectionalIcon, BidirectionalVerticalIcon } from "../../../../../../assets/icons/connectors";
import { IsBidirectionalTerminal } from "../../../../helpers/Connectors";
import {
  OffPageRequiredInputIcon,
  OffPageRequiredOutputIcon,
  OffPageRequiredVerticalInputIcon,
  OffPageRequiredVerticalOutputIcon,
} from "../../../../../../assets/icons/offpage";

interface Props {
  conn: Connector;
  color: string;
  className: string;
  isInput: boolean;
  isElectroView: boolean;
}

/**
 * Component for an OffPage terminal icon in a Node's drop-down menu for terminals in BlockView.
 * @param interface
 * @returns an icon.
 */
const OffPageTerminalIcon = ({ conn, color, className, isInput, isElectroView }: Props) => {
  if (isElectroView) return OffPageVerticalTerminalIcon(conn, color, className, isInput);
  if (IsBidirectionalTerminal(conn)) return <BidirectionalIcon style={{ fill: color }} className={className} />;

  return isInput ? (
    <OffPageRequiredInputIcon style={{ fill: color }} className={className} />
  ) : (
    <OffPageRequiredOutputIcon style={{ fill: color }} className={className} />
  );
};

function OffPageVerticalTerminalIcon(connector: Connector, color: string, className: string, isInput: boolean) {
  if (IsBidirectionalTerminal(connector)) return <BidirectionalVerticalIcon style={{ fill: color }} className={className} />;

  return isInput ? (
    <OffPageRequiredVerticalInputIcon style={{ fill: color }} className={className} />
  ) : (
    <OffPageRequiredVerticalOutputIcon style={{ fill: color }} className={className} />
  );
}

export default OffPageTerminalIcon;
