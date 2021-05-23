import { memo, FC } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { RELATION_TYPE } from "../../../models/project";
import { GetHandleType } from "../helpers";
import { HandlerWrapper } from "../styled";

const FunctionTreeview: FC<NodeProps> = ({ data }) => {
  const handleHover = (e) => {
    console.log("HOVER");
  };

  return (
    <div onMouseEnter={(e) => handleHover(e)}>
      {data.connectors &&
        data.connectors.map((connector) => {
          const [typeHandler, positionHandler] = GetHandleType(connector);
          return (
            <HandlerWrapper key={connector.id} display={"true"}>
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
      <div>{data.label ?? data.name}</div>
    </div>
  );
};

export default memo(FunctionTreeview);
