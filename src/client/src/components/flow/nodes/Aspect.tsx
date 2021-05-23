import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { GetFlowAspectIcon } from "../helpers";
import { GetHandleType } from "../helpers";
import { HandlerWrapper } from "../styled";

const Aspect: FC<NodeProps> = ({ data }) => {
  return (
    <>
      {data.connectors?.map((connector) => {
        const [typeHandler, positionHandler] = GetHandleType(connector);
        return (
          <HandlerWrapper
            key={connector.id}
            display="true"
            position={positionHandler}
          >
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={connector.id}
              key={connector.id}
              className="function-treeview-handler"
            />
          </HandlerWrapper>
        );
      })}

      {GetFlowAspectIcon(data.icon)}
      <div>{data.label ?? data.name}</div>
    </>
  );
};

export default memo(Aspect);
