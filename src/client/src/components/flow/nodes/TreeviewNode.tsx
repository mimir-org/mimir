import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { Connector } from "../../../models";
import { HandleBox, TreeNodeNameBox } from "../../../compLibrary/treeView";
import { SetTerminalYPos } from "../helpers/common";
import {
  GetHandleType,
  IsInputConnector,
  IsPartOfTerminal,
} from "../helpers/common";

const TreeviewNode: FC<NodeProps> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);
  let inputCount = 0;
  let outputCount = 0;

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
      {data.connectors?.map((conn: Connector) => {
        const [typeHandler, positionHandler] = GetHandleType(conn);
        if (conn.visible && IsInputConnector(conn)) inputCount++;
        else if (conn.visible && !IsInputConnector(conn)) outputCount++;

        return (
          <HandleBox
            input={SetTerminalYPos(inputCount)}
            output={SetTerminalYPos(outputCount)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={"handle-treeview-" + conn.id}
            visible={connectorIsVisible(conn)}
            position={positionHandler}
          >
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={conn.id}
              className="function-treeview-handler"
            />
          </HandleBox>
        );
      })}
      <TreeNodeNameBox>{data.label ?? data.name}</TreeNodeNameBox>
    </div>
  );
};

export default memo(TreeviewNode);
