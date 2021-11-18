import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { HandleComponent, TerminalsContainerComponent } from "../../terminals";
import { OnConnectorClick, ResizeHandler } from "../handlers";
import { ParentContainerComponent } from "../parentContainer";
import { FilterTerminals, GetNodeByDataId } from "../../helpers";
import { AspectColorType, Connector } from "../../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { edgeSelector, electroSelector, nodeSelector, nodeSizeSelector } from "../../../../../redux/store";
import { GetAspectColor } from "../../../../../helpers";

/**
 * Component for a parent Product Node in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentProductNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const [terminals, setTerminals]: [Connector[], any] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const electro = useAppSelector(electroSelector);
  const parentNodeSize = useAppSelector(nodeSizeSelector);
  const node = nodes?.find((x) => x.id === data.id);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, null));
    ResizeHandler(setScreenWidth);
  }, [node?.connectors, screenWidth]);

  if (!node) return null;

  // Update the Flow parentNode
  const parentNode = GetNodeByDataId(node?.id);
  if (parentNode) {
    parentNode.style.width = `${screenWidth}px`;
    parentNode.style.height = `${1290}px`;
  }

  node.blockWidth = parentNodeSize?.width;
  node.blockHeight = parentNodeSize?.height;

  return (
    <>
      <ParentContainerComponent
        dispatch={dispatch}
        node={node}
        color={GetAspectColor(node, AspectColorType.Header)}
        selected={node.isBlockSelected}
        width={screenWidth}
        height={parentNodeSize?.height}
        hasChildren={terminals.length > 0}
      />

      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        parent={true}
        electro={electro}
        terminals={terminals}
        onClick={(conn) => OnConnectorClick(conn, dispatch, edges, nodes)}
        showMenuBox={true}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
      />
      <HandleComponent
        parent={true}
        nodes={nodes}
        height={node.blockHeight}
        width={screenWidth}
        terminals={terminals}
        electro={electro}
      />
    </>
  );
};

export default memo(BlockParentProductNode);
