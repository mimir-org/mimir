import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import {
  RELATION_TYPE,
  TerminalType,
  CONNECTOR_TYPE,
} from "../../../models/project";
import { OffPageWrapper } from "../styled";
import { GetTransportTypeColor, GetHandleType } from "../helpers";

const OffPage: FC<NodeProps> = ({ data }) => {
  const transportConnectors = data.connectors?.filter(
    (x) => x.relationType === RELATION_TYPE.Transport
  );

  const background = (): string => {
    const terminalType = data.connectors.find(
      (x) =>
        x.relationType === RELATION_TYPE.Transport &&
        x.type === CONNECTOR_TYPE.INPUT
    )?.terminalType as TerminalType;
    return GetTransportTypeColor(terminalType);
  };

  const fontColor = (): string => {
    let hexcolor = background();
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#ffffff";
  };

  return (
    <OffPageWrapper background={background} fontColor={fontColor}>
      {transportConnectors &&
        transportConnectors.map((connector) => {
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
    </OffPageWrapper>
  );
};

export default memo(OffPage);
