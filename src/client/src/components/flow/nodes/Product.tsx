import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { GetHandleType } from "../helpers";

const Product: FC<NodeProps> = ({ data }) => {
  return (
    <>
      {data.connectors?.map((connector) => {
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
      <div>{data.label ?? data.name}</div>
    </>
  );
};

export default memo(Product);
