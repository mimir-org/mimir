import { FC, memo, useEffect, useState } from "react";
import { Handle, NodeProps } from "react-flow-renderer";
import { TreeHandleBox } from "../treeNode/styled";
import { AspectColorType, Connector, Node } from "../../../../../models";
import { GetFlowAspectIcon, GetHandleType } from "../../../helpers";
import { OnMouseLeave } from "./handlers";
import { AspectNodeBox } from "./styled";
import { GetAspectColor, GetSelectedNode } from "../../../../../helpers";
import { SetTopPos } from "../treeNode/helpers";

const AspectNode: FC<NodeProps<Node>> = ({ data }) => {
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
    <AspectNodeBox
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      isSelected={data === GetSelectedNode()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => OnMouseLeave(setTimer)}
    >
      {data.connectors?.map((conn: Connector) => {
        const [typeHandler, positionHandler] = GetHandleType(conn);
        return (
          <TreeHandleBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={conn.id}
            visible={isHover}
            position={positionHandler}
            topPos={SetTopPos(positionHandler)}
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

      <div>{GetFlowAspectIcon(data.aspect)}</div>
      {data.label ?? data.name}
    </AspectNodeBox>
  );
};

export default memo(AspectNode);
