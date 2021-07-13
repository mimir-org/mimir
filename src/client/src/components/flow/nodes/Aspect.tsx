import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { TreeHandleBox } from "../../../compLibrary/treeView";
import { Connector } from "../../../models";
import { GetFlowAspectIcon, GetHandleType } from "../helpers/common";

const Aspect: FC<NodeProps> = ({ data }) => {
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

  const mouseNodeLeave = () => {
    setTimer(true);
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => mouseNodeLeave()}
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
      {/* TODO: Fix inline styling */}
      <div style={{ paddingTop: "12px" }}>{GetFlowAspectIcon(data.aspect)}</div>
      <div>{data.label ?? data.name}</div>
    </div>
  );
};

export default memo(Aspect);
