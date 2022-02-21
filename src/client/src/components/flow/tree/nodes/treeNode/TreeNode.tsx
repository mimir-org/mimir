import { FC, memo, useEffect, useState } from "react";
import { Handle, NodeProps } from "react-flow-renderer";
import { AspectColorType, Connector, Node } from "../../../../../models";
import { TreeHandleBox, TreeNodeBox } from "./styled";
import { GetHandleType, IsPartOf } from "../../../helpers";
import { TreeLogoComponent } from "./components/TreeLogoComponent";
import { GetAspectColor, GetSelectedNode } from "../../../../../helpers";
import { IsValidTreeConnection, SetTopPos } from "./helpers";
import { nodeSelector, useAppDispatch, useAppSelector } from "../../../../../redux/store";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a Mimir Node in the FlowTree context.
 */
const TreeNode: FC<NodeProps<Node>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);
  const nodes = useAppSelector(nodeSelector);

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
    <TreeNodeBox
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      isSelected={data === GetSelectedNode()}
      visible={!data.isHidden}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => mouseNodeLeave()}
    >
      {data.connectors?.map((conn: Connector) => {
        const [typeHandler, positionHandler] = GetHandleType(conn);

        return (
          <TreeHandleBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={"handle-treeview-" + conn.id}
            visible={IsPartOf(conn) && isHover}
            position={positionHandler}
            topPos={SetTopPos(positionHandler)}
          >
            <Handle
              type={typeHandler}
              position={positionHandler}
              id={conn.id}
              className="function-treeview-handler"
              isValidConnection={(connection) => IsValidTreeConnection(data, connection, nodes, dispatch)}
            />
          </TreeHandleBox>
        );
      })}
      <TreeLogoComponent node={data} />
    </TreeNodeBox>
  );
};

export default memo(TreeNode);
