import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { processType } from "../utils";
import { RELATION_TYPE } from "../../../models/project";

const Function: FC<NodeProps> = ({ data }) => {
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
      <div>{data.label ?? data.name}</div>
    </>
  );
};

export default memo(Function);
