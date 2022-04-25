/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useCallback, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType, Connector, Node } from "../../../../../models";
import { TreeNodeBox } from "./TreeNode.styled";
import { TreeLogoComponent } from "./components/TreeLogoComponent";
import { GetAspectColor } from "../../../../../helpers";
import { useAppDispatch } from "../../../../../redux/store";
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

  useEffect(() => {
    if (timer) {
      const clock = window.setInterval(() => {
        setTimer(false);
        setIsHover(false);
      }, 5000);
      return () => window.clearInterval(clock);
    }
  }, [timer]);

  // This callback prevents all terminals from fetching on each render
  const GetTerminal = useCallback((conn: Connector) => {
    return GetTreeNodeTerminal(data, conn, dispatch, setIsHover, isHover);
  }, []);

  if (!data) return null;

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
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      selected={data.selected}
      visible={!data.hidden}
      onMouseEnter={() => mouseEnter()}
      onMouseLeave={() => mouseNodeLeave()}
      onMouseUp={() => mouseUp()}
      onMouseDown={() => mouseDown()}
    >
      {renderTerminals &&
        data.connectors?.map((conn) => {
          return GetTerminal(conn);
        })}
      <TreeLogoComponent node={data} />
    </TreeNodeBox>
  );
};

export default memo(TreeNode);
