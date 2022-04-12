/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useCallback, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType, Connector, Node } from "../../../../../models";
import { TreeNodeBox } from "./TreeNode.styled";
import { TreeLogoComponent } from "./components/TreeLogoComponent";
import { GetAspectColor } from "../../../../../helpers";
import { nodeSelector, useAppDispatch, useParametricAppSelector } from "../../../../../redux/store";
import { GetTreeNodeTerminal } from "./helpers/GetTreeNodeTerminal";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a Mimir Node in the FlowTree context.
 */
const TreeNode: FC<NodeProps<Node>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);
  const [renderTerminals, setRenderTerminals] = useState(true);
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

  const GetTerminal = useCallback((conn: Connector) => {
    return GetTreeNodeTerminal(node, conn, dispatch, setIsHover, isHover);
  }, []);

  if (!node) return null;

  const mouseNodeLeave = () => {
    setTimer(true);
    setRenderTerminals(false);
  };

  const mouseUp = () => {
    setRenderTerminals(true);
  };

  const mouseDown = () => {
    setRenderTerminals(false);
  };

  const mouseEnter = () => {
    setIsHover(true);
    setRenderTerminals(false);
  };

  return (
    <TreeNodeBox
      colorMain={GetAspectColor(node, AspectColorType.Main)}
      colorSelected={GetAspectColor(node, AspectColorType.Selected)}
      selected={node.selected}
      visible={!node.hidden}
      onMouseEnter={() => mouseEnter()}
      onMouseLeave={() => mouseNodeLeave()}
      onMouseUp={() => mouseUp()}
      onMouseDown={() => mouseDown()}
    >
      {renderTerminals &&
        node?.connectors?.map((conn) => {
          return GetTerminal(conn);
        })}
      <TreeLogoComponent node={node} />
    </TreeNodeBox>
  );
};

export default memo(TreeNode);
