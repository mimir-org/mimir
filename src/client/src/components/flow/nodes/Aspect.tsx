import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { ProductIcon, FunctionIcon, LocationIcon } from "../../../assets";
import { processType } from "../utils";

const icon = (icon: string) => {
  switch (icon) {
    case "FunctionIcon":
      return (
        <img
          src={FunctionIcon}
          className="aspect-icon"
          alt={icon}
          draggable={false}
        />
      );
    case "ProductIcon":
      return (
        <img
          src={ProductIcon}
          className="aspect-icon"
          alt={icon}
          draggable={false}
        />
      );
    case "LocationIcon":
      return (
        <img
          src={LocationIcon}
          className="aspect-icon"
          alt={icon}
          draggable={false}
        />
      );
    default:
      return (
        <img
          src={FunctionIcon}
          className="aspect-icon"
          alt={icon}
          draggable={false}
        />
      );
  }
};

const Aspect: FC<NodeProps> = ({ data }) => {
  return (
    <>
      {data.connectors &&
        data.connectors.map((connector) => {
          const [typeHandler, positionHandler] = processType(connector);
          return (
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={connector.id}
              key={connector.id}
            />
          );
        })}

      {icon(data.icon)}
      <div>{data.label ?? data.name}</div>
    </>
  );
};

export default memo(Aspect);
