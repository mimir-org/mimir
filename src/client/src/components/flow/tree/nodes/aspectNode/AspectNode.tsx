import { FC, memo, useEffect, useState } from "react";
import { Handle, NodeProps } from "react-flow-renderer";
import { HandleBox } from "../styled/HandleBox";
import { AspectColorType, Connector, Node } from "../../../../../models";
import { GetHandleType } from "../helpers/GetHandleType";
import { GetFlowAspectIcon } from "./helpers/GetFlowAspectIcon";
import { OnMouseLeave } from "./handlers/OnMouseLeave";
import { AspectNodeStyled } from "./AspectNode.styled";
import { GetAspectColor, GetSelectedNode } from "../../../../../helpers";
import { SetTopPos } from "../helpers/SetTopPos";

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
    <AspectNodeStyled
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      isSelected={data === GetSelectedNode()}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => OnMouseLeave(setTimer)}
    >
      {data.connectors?.map((conn: Connector) => {
        const [typeHandler, positionHandler] = GetHandleType(conn);
        return (
          <HandleBox
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
          </HandleBox>
        );
      })}

      <div>{GetFlowAspectIcon(data.aspect)}</div>
      {data.label ?? data.name}
    </AspectNodeStyled>
  );
};

export default memo(AspectNode);
