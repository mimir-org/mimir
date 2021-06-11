import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { Connector } from "../../../models/project";
import { GetHandleType, IsPartOfTerminal } from "../helpers/common";
import { HandlerBox } from "../../../componentLibrary/blockView";
import { TreeNodeNameBox } from "../../../componentLibrary/treeView";

const TreeviewNode: FC<NodeProps> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);

  const connectorIsVisible = (conn: Connector) => {
    return IsPartOfTerminal(conn) && isHover;
  };

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
          <HandlerBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={connector.id}
            visible={connectorIsVisible(connector)}
            pos={positionHandler}
          >
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={connector.id}
              key={connector.id}
              className="function-treeview-handler"
            />
          </HandlerBox>
        );
      })}
      <TreeNodeNameBox>{data.label ?? data.name}</TreeNodeNameBox>
    </div>
  );
};

export default memo(TreeviewNode);
