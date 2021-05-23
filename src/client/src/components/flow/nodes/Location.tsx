import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { GetHandleType } from "../helpers";
import { LocationBlockWrapper } from "../styled";

const Location: FC<NodeProps> = ({ data }) => {
  return (
    <>
      <LocationBlockWrapper width={data.width} height={data.height}>
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

        {data.label ?? data.name}
      </LocationBlockWrapper>
    </>
  );
};

export default memo(Location);
