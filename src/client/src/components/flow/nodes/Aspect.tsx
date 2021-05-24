import { memo, FC, useState } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { GetFlowAspectIcon } from "../helpers";
import { GetHandleType } from "../helpers";
import { HandlerWrapper } from "../styled";

const Aspect: FC<NodeProps> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);

  const connectorIsVisible = () => {
    if (isHover) return "true";
    return "false";
  };

  const mouseNodeLeave = () => {
    setTimeout(() => {
      setIsHover(false);
    }, 5 * 1000);
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => mouseNodeLeave()}
    >
      {data.connectors?.map((connector) => {
        const [typeHandler, positionHandler] = GetHandleType(connector);
        return (
          <HandlerWrapper
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={connector.id}
            display={connectorIsVisible()}
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
    </div>
  );
};

export default memo(Aspect);
