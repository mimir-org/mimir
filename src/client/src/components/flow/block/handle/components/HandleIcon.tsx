import { IsBidirectionalTerminal } from "../../../helpers/Connectors";
import { BidirectionalTerminal } from "../../../../../assets/icons/bidirectional";
import { Connector } from "@mimirorg/modelbuilder-types";
import { InputConnectorIcon, OutputConnectorIcon } from "../../../../../assets/icons/connectors";

interface Props {
  conn: Connector;
  color: string;
  className: string;
  isInput: boolean;
}

/**
 * Component for the handle (terminal) icon in BlockView.
 * @param params
 * @returns an icon.
 */
export const HandleIcon = ({ conn, color, className, isInput }: Props) => {
  if (IsBidirectionalTerminal(conn)) return <BidirectionalTerminal style={{ fill: color }} className={className} />;
  return isInput ? (
    <InputConnectorIcon style={{ fill: color }} className={className} />
  ) : (
    <OutputConnectorIcon style={{ fill: color }} className={className} />
  );
};
