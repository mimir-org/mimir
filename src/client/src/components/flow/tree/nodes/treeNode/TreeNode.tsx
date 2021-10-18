import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { Connector, Node } from "../../../../../models";
import { Symbol } from "../../../../../compLibrary/symbol";
import { TreeNodeWrapper, TreeHandleBox, TreeNodeNameBox } from "./styled";
import { GetHandleType, IsPartOfTerminal } from "../../../helpers";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a node in the FlowTree context.
 */
const TreeNode: FC<NodeProps<Node>> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);

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

  const mouseNodeLeave = () => setTimer(true);

  return (
    <TreeNodeWrapper onMouseEnter={() => setIsHover(true)} onMouseLeave={() => mouseNodeLeave()}>
      {data.connectors?.map((conn: Connector) => {
        const [typeHandler, positionHandler] = GetHandleType(conn);

        return (
          <TreeHandleBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={"handle-treeview-" + conn.id}
            visible={connectorIsVisible(conn)}
            position={positionHandler}
          >
            <Handle type={typeHandler} position={positionHandler} id={conn.id} className="function-treeview-handler" />
          </TreeHandleBox>
        );
      })}
      <TreeNodeNameBox>{data.label ?? data.name}</TreeNodeNameBox>
      <Symbol base64={data.symbol} text={data.name} />
    </TreeNodeWrapper>
  );
};

export default memo(TreeNode);