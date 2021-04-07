import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { GetAspectIcon } from "../helpers/";
import { AspectWrapper } from "../styled/";
import { processType } from "../utils";

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
      <AspectWrapper visible={true}>
        {GetAspectIcon(data.icon)}
        <div>{data.label ?? data.name}</div>
      </AspectWrapper>
    </>
  );
};

export default memo(Aspect);
