import { Connector, Direction } from "lib";
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
 * Component for a terminal icon in a Node's drop-down menu for terminals in BlockView.
 * @param interface
 * @returns an icon.
 */
export const TerminalIcon = ({ connector, color, className, isElectroView }: Props) => {
  if (isElectroView) return VerticalIcon(connector, color, className);
  if (connector.direction === Direction.Bidirectional) return <BidirectionalIcon style={{ fill: color }} className={className} />;
  return <ConnectorIcon style={{ fill: color }} className={className} />;
};

function VerticalIcon(connector: Connector, color: string, className: string) {
  if (connector.direction === Direction.Bidirectional)
    return <BidirectionalVerticalIcon style={{ fill: color }} className={className} />;
  return <ConnectorVerticalIcon style={{ fill: color }} className={className} />;
}
