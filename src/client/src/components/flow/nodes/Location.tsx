import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { LocationBlockBox } from "../../../componentLibrary/blockView";
import { GetHandleType } from "../helpers/common";

const Location: FC<NodeProps> = ({ data }) => {
  return (
    <>
      <LocationBlockBox width={data.width} height={data.height}>
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
      </LocationBlockBox>
    </>
  );
};

export default memo(Location);
