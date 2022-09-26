import { Connector } from "@mimirorg/modelbuilder-types";
import { BidirectionalIcon } from "../../../../../../assets/icons/bidirectional";
import { IsBidirectionalTerminal } from "../../../../helpers/Connectors";
import {
  InputConnectorIcon,
  OutputConnectorIcon,
  InputConnectorVerticalIcon,
  OutputConnectorVerticalIcon,
} from "../../../../../../assets/icons/connectors";

interface Props {
  connector: Connector;
  color: string;
  className: string;
  isInput: boolean;
  isElectroView: boolean;
}

/**
 * Component for a terminal icon in BlockView.
 * @param interface
 * @returns an icon.
 */
const TerminalIcon = ({ connector, color, className, isInput, isElectroView }: Props) => {
  if (isElectroView) return VerticalIcon(connector, isInput, color, className);
  if (IsBidirectionalTerminal(connector)) return <BidirectionalIcon style={{ fill: color }} className={className} />;

  return isInput ? (
    <InputConnectorIcon style={{ fill: color }} className={className} />
  ) : (
    <OutputConnectorIcon style={{ fill: color }} className={className} />
  );
};

function VerticalIcon(connector: Connector, isInput: boolean, color: string, className: string) {
  if (IsBidirectionalTerminal(connector)) return <BidirectionalIcon style={{ fill: color }} className={className} />;
  return isInput ? (
    <InputConnectorVerticalIcon style={{ fill: color }} className={className} />
  ) : (
    <OutputConnectorVerticalIcon style={{ fill: color }} className={className} />
  );
}

export default TerminalIcon;
