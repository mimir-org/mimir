import { Connector } from "@mimirorg/modelbuilder-types";
import { IsBidirectionalTerminal } from "../../../../helpers/Connectors";
import {
  ConnectorIcon,
  ConnectorVerticalIcon,
  BidirectionalIcon,
  BidirectionalVerticalIcon,
  OffPageRequiredIcon,
  OffPageRequiredVerticalIcon,
} from "../../../../../../assets/icons/connectors";

interface Props {
  connector: Connector;
  color: string;
  className: string;
  isElectroView: boolean;
}

/**
 * Component for a terminal icon in a Node's drop-down menu for terminals in BlockView.
 * @param interface
 * @returns an icon.
 */
export const TerminalIcon = ({ connector, color, className, isElectroView }: Props) => {
  if (isElectroView) return VerticalIcon(connector, color, className);
  if (IsBidirectionalTerminal(connector)) return <BidirectionalIcon style={{ fill: color }} className={className} />;
  return <ConnectorIcon style={{ fill: color }} className={className} />;
};

function VerticalIcon(connector: Connector, color: string, className: string) {
  if (IsBidirectionalTerminal(connector)) return <BidirectionalVerticalIcon style={{ fill: color }} className={className} />;
  return <ConnectorVerticalIcon style={{ fill: color }} className={className} />;
}

/**
 * Component for an OffPage terminal icon in a Node's drop-down menu for terminals in BlockView.
 * @param interface
 * @returns an icon.
 */
export const OffPageTerminalIcon = ({ connector, color, className, isElectroView }: Props) => {
  if (isElectroView) return OffPageVerticalTerminalIcon(connector, color, className);
  if (IsBidirectionalTerminal(connector)) return <BidirectionalIcon style={{ fill: color }} className={className} />;

  return <OffPageRequiredIcon style={{ fill: color }} className={className} />;
};

function OffPageVerticalTerminalIcon(connector: Connector, color: string, className: string) {
  if (IsBidirectionalTerminal(connector)) return <BidirectionalVerticalIcon style={{ fill: color }} className={className} />;
  return <OffPageRequiredVerticalIcon style={{ fill: color }} className={className} />;
}