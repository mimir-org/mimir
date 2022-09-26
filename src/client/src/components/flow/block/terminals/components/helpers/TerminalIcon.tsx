import { Connector } from "@mimirorg/modelbuilder-types";
import { BidirectionalIcon } from "../../../../../../assets/icons/bidirectional";
import { InputConnectorIcon, OutputConnectorIcon } from "../../../../../../assets/icons/connectors";
import { IsBidirectionalTerminal } from "../../../../helpers/Connectors";

interface Props {
  conn: Connector;
  color: string;
  className: string;
  isInput: boolean;
}

/**
 * Component for a terminal icon in BlockView.
 * @param interface
 * @returns an icon.
 */
const TerminalIcon = ({ conn, color, className, isInput }: Props) => {
  if (IsBidirectionalTerminal(conn)) return <BidirectionalIcon style={{ fill: color }} className={className} />;
  return isInput ? (
    <InputConnectorIcon style={{ fill: color }} className={className} />
  ) : (
    <OutputConnectorIcon style={{ fill: color }} className={className} />
  );
};

export default TerminalIcon;
