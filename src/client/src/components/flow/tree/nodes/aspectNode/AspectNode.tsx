import { FC, memo, useEffect, useState } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { TreeHandleBox } from "../styled/TreeHandleBox";
import { AspectNodeBox } from "./AspectNode.styled";
import { Aspect, Connector } from "@mimirorg/modelbuilder-types";
import { MimirNode } from "../../../../../lib/classes/MimirNode";

const AspectNode: FC<NodeProps<MimirNode>> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    if (timer) {
      const clock = window.setInterval(() => {
        setTimer(false);
        setIsHover(false);
      }, 3000);
      return () => {
        window.clearInterval(clock);
      };
    }
  }, [timer]);

  return (
    <AspectNodeBox colorMain={data.getMainColor()} selected={data.selected} onMouseEnter={() => setIsHover(true)}>
      {data.connectors?.map((conn: Connector) => {
        return (
          <TreeHandleBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            position={Position.Top}
            key={conn.id}
            visible={isHover}
            topPos={Position.Top}
            isFunctionAspect={data.aspect === Aspect.Function}
          >
            <Handle type={"source"} position={Position.Bottom} id={conn.id} key={conn.id} />
          </TreeHandleBox>
        );
      })}

      <img src={data.getAspectIcon()} className="aspect-icon" alt="" draggable={false} />
      {data.label ?? data.name}
    </AspectNodeBox>
  );
};

export default memo(AspectNode);
