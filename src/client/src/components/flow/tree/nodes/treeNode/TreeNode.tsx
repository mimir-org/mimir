import { FC, memo, useEffect, useState } from "react";
import { Handle, NodeProps } from "react-flow-renderer";
import { AspectColorType, Node } from "../../../../../models";
import { TreeNodeStyled } from "./TreeNode.styled";
import { HandleBox } from "../styled/HandleBox";
import { GetHandleType } from "../helpers/GetHandleType";
import { IsPartOfTerminal } from "../../../helpers/Connectors";
import { TreeLogoComponent } from "./components/TreeLogoComponent";
import { GetAspectColor } from "../../../../../helpers";
import { IsValidTreeConnection } from "./helpers/IsValidTreeConnection";
import { SetTopPos } from "../helpers/SetTopPos";
import { nodesSelector, useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { GetSelectedNode } from "../../../../../helpers/Selected";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a Mimir Node in the FlowTree context.
 */
const TreeNode: FC<NodeProps<Node>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);
  const nodes = useAppSelector(nodesSelector);
  const node = nodes?.find((x) => x.id === data.id);

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

  if (!node) return null;

  const mouseNodeLeave = () => setTimer(true);

  return (
    <TreeNodeStyled
      colorMain={GetAspectColor(node, AspectColorType.Main)}
      colorSelected={GetAspectColor(node, AspectColorType.Selected)}
      isSelected={node === GetSelectedNode()}
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
              isValidConnection={(connection) => IsValidTreeConnection(node, connection, nodes, dispatch)}
            />
          </HandleBox>
        );
      })}
      <TreeLogoComponent node={node} />
    </TreeNodeStyled>
  );
};

export default memo(TreeNode);
