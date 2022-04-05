import { FC, memo, useEffect, useState } from "react";
import { Handle, NodeProps } from "react-flow-renderer";
import { AspectColorType, Node } from "../../../../../models";
import { TreeNodeBox } from "./TreeNode.styled";
import { HandleBox } from "../styled/HandleBox";
import { GetHandleType } from "../helpers/GetHandleType";
import { IsPartOfTerminal } from "../../../helpers/Connectors";
import { TreeLogoComponent } from "./components/TreeLogoComponent";
import { GetAspectColor } from "../../../../../helpers";
import { SetTopPos } from "../helpers/SetTopPos";
import { nodeSelector, useParametricAppSelector } from "../../../../../redux/store";
// import { IsValidTreeConnection } from "./helpers/IsValidTreeConnection";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a Mimir Node in the FlowTree context.
 */
const TreeNode: FC<NodeProps<Node>> = ({ data }) => {
  // const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);
  const node = useParametricAppSelector(nodeSelector, data.id);

  useEffect(() => {
    if (timer) {
      const clock = window.setInterval(() => {
        setTimer(false);
        setIsHover(false);
      }, 5000);
      return () => window.clearInterval(clock);
    }
  }, [timer]);

  if (!node) return null;

  const mouseNodeLeave = () => setTimer(true);

  return (
    <TreeNodeBox
      colorMain={GetAspectColor(node, AspectColorType.Main)}
      colorSelected={GetAspectColor(node, AspectColorType.Selected)}
      isSelected={node.isSelected}
      visible={!node.isHidden}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => mouseNodeLeave()}
    >
      {node.connectors?.map((conn) => {
        const [type, pos] = GetHandleType(conn);

        return (
          <HandleBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={"handle-treeview-" + conn.id}
            visible={IsPartOfTerminal(conn) && isHover}
            position={pos}
            topPos={SetTopPos(pos)}
          >
            <Handle
              type={type}
              position={pos}
              id={conn.id}
              className="function-treeview-handler"
              // isValidConnection={(connection) => IsValidTreeConnection(node, connection, nodes, dispatch)}
            />
          </HandleBox>
        );
      })}
      <TreeLogoComponent node={node} />
    </TreeNodeBox>
  );
};

export default memo(TreeNode);
