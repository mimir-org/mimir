import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { TreeHandleBox } from "../../../../compLibrary/treeView";
import { Connector } from "../../../../models";
import { GetFlowAspectIcon, GetHandleType } from "../../helpers";
import { OnMouseLeave } from "./handlers";
import { AspectNodeBox } from "./styled";

const AspectNode: FC<NodeProps> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    if (timer) {
      const clock = window.setInterval(() => {
        setTimer(false);
        setIsHover(false);
      }, 5000);
      return () => {
        window.clearInterval(clock);
      };
    }
  }, [timer]);

  return (
    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => OnMouseLeave(setTimer)}>
      {data.connectors?.map((conn: Connector) => {
        const [typeHandler, positionHandler] = GetHandleType(conn);
        return (
          <TreeHandleBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={conn.id}
            visible={isHover}
            position={positionHandler}
          >
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={conn.id}
              key={conn.id}
              className="function-treeview-handler"
            />
          </TreeHandleBox>
        );
      })}

      <AspectNodeBox>
        <div>{GetFlowAspectIcon(data.aspect)}</div>
        {data.label ?? data.name}
      </AspectNodeBox>
    </div>
  );
};

export default memo(AspectNode);
