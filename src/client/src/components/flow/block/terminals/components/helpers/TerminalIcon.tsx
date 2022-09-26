import { Connector } from "@mimirorg/modelbuilder-types";
import { IsBidirectionalTerminal } from "../../../../helpers/Connectors";
import {
  ConnectorIcon,
  ConnectorVerticalIcon,
  BidirectionalIcon,
  BidirectionalVerticalIcon,
} from "../../../../../../assets/icons/connectors";

interface Props {
  connector: Connector;
  color: string;
  className: string;
  isElectroView: boolean;
}

/**
 * Component for a terminal icon in BlockView.
 * @param interface
 * @returns an icon.
 */
const TerminalIcon = ({ connector, color, className, isElectroView }: Props) => {
  if (isElectroView) return VerticalIcon(connector, color, className);
  if (IsBidirectionalTerminal(connector)) return <BidirectionalIcon style={{ fill: color }} className={className} />;
  return <ConnectorIcon style={{ fill: color }} className={className} />;
};

function VerticalIcon(connector: Connector, color: string, className: string) {
  if (IsBidirectionalTerminal(connector)) return <BidirectionalVerticalIcon style={{ fill: color }} className={className} />;
  return <ConnectorVerticalIcon style={{ fill: color }} className={className} />;
}

export default TerminalIcon;
