import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { TreeHandleBox } from "../../../compLibrary/treeView";
import { GetFlowAspectIcon, GetHandleType } from "../helpers/common";

const Aspect: FC<NodeProps> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    if (timer) {
      const timer = window.setInterval(() => {
        setTimer(false);
        setIsHover(false);
      }, 5000);
      return () => {
        window.clearInterval(timer);
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
      {data.connectors?.map((connector) => {
        const [typeHandler, positionHandler] = GetHandleType(connector);
        return (
          <TreeHandleBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={connector.id}
            visible={isHover}
            position={positionHandler}
          >
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={connector.id}
              key={connector.id}
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
