import { memo, FC } from "react";
import { Color } from "../../../compLibrary";
import { NodeProps, Handle } from "react-flow-renderer";
import { Terminal } from "../../../models/project";
import { OffPageBox } from "../../../compLibrary/blockView";
import {
  GetTransportTypeColor,
  GetHandleType,
  IsTransportTerminal,
  IsInputConnector,
} from "../helpers/common";

const OffPage: FC<NodeProps> = ({ data }) => {
  const transportConnectors = data.connectors?.filter((x) =>
    IsTransportTerminal(x)
  );

  const background = (): string => {
    const terminal = data.connectors.find(
      (x) => IsTransportTerminal(x) && IsInputConnector(x)
    )?.terminal as Terminal;
    return GetTransportTypeColor(terminal);
  };

  const fontColor = (): string => {
    let hexcolor = background();
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? `${Color.Black}` : `${Color.White}`;
  };

  return (
    <OffPageBox background={background} fontColor={fontColor}>
      {transportConnectors?.map((connector) => {
        const [typeHandler, positionHandler] = GetHandleType(connector);

        return (
          <Handle
            type={typeHandler}
            position={positionHandler}
            id={connector.id}
            key={connector.id}
          />
        );
      })}
      <div className="text">{data.label ?? data.name}</div>
    </OffPageBox>
  );
};

export default memo(OffPage);
