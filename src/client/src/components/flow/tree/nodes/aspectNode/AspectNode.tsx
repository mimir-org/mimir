import { FC, memo, useState, useEffect } from "react";
import { Handle, NodeProps } from "react-flow-renderer";
import { TreeHandleBox } from "../styled/TreeHandleBox";
import { AspectColorType } from "../../../../../models";
import { GetHandleType } from "../helpers/GetHandleType";
import { AspectNodeBox } from "./AspectNode.styled";
import { GetAspectColor } from "../../../../../helpers";
import { SetTopPos } from "../helpers/SetTopPos";
import { Connector, Aspect } from "@mimirorg/modelbuilder-types";
import { GetHandleClassName } from "../helpers/GetHandleClassName";
import { OnMouseLeave } from "./handlers/OnMouseLeave";
import {MimirNode} from "../../../../../lib/types/MimirNode";

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
    <AspectNodeBox
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      selected={data.selected}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => OnMouseLeave(setTimer)}
    >
      {data.connectors?.map((conn: Connector) => {
        const [typeHandler, positionHandler] = GetHandleType(conn);
        const className = GetHandleClassName(conn);

        return (
          <TreeHandleBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={conn.id}
            visible={isHover}
            position={positionHandler}
            topPos={SetTopPos(positionHandler)}
            isFunctionAspect={data.aspect === Aspect.Function}
          >
            <Handle type={typeHandler} position={positionHandler} id={conn.id} key={conn.id} className={className} />
          </TreeHandleBox>
        );
      })}

      <img src={data.getAspectIcon()} className="aspect-icon" alt="" draggable={false} />
      {data.label ?? data.name}
    </AspectNodeBox>
  );
};

export default memo(AspectNode);
