import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { Connector } from "../../../models";
import { Symbol } from "../../../compLibrary/symbol";
import {
  TreeHandleBox,
  TreeNodeNameBox,
  TreeNodeWrapper,
} from "../../../compLibrary/treeView";
import {
  GetHandleType,
  IsInputTerminal,
  IsOutputTerminal,
  IsPartOfTerminal,
  SetTerminalYPos,
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
    <TreeNodeWrapper
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => mouseNodeLeave()}
    >
      {data.connectors?.map((conn: Connector) => {
        const [typeHandler, positionHandler] = GetHandleType(conn);
        if (conn.visible && IsInputTerminal(conn)) inputCount++;
        else if (conn.visible && IsOutputTerminal(conn)) outputCount++;

        return (
          <TreeHandleBox
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
          </TreeHandleBox>
        );
      })}
      <TreeNodeNameBox>{data.label ?? data.name}</TreeNodeNameBox>
      <Symbol base64={data.symbol?.data} text={data.symbol?.text} />
    </TreeNodeWrapper>
  );
};

export default memo(TreeviewNode);
