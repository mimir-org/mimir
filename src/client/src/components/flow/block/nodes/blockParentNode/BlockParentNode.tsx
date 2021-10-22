import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { TextResources } from "../../../../../assets/text";
import { HandleComponent, TerminalsContainerComponent } from "../../terminals";
import { Size } from "../../../../../compLibrary";
import { GetParentColor } from "./helpers";
import { OnParentClick, OnChildClick, OnConnectorClick } from "./handlers";
import { BlockComponent } from "./";
import { BlockMessageBox } from "../../styled";
import { FilterTerminals, GetNodeByDataId, FindAllEdges } from "../../helpers";
import {
  edgeSelector,
  isElectroVisibleSelector,
  nodeSelector,
  splitViewNodeSelector,
  splitViewSelector,
  useAppDispatch,
  useAppSelector,
} from "../../../../../redux/store";

/**
 * Component for the large parent block in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const splitView = useAppSelector(splitViewSelector);
  const splitNode = useAppSelector(splitViewNodeSelector);
  const electro = useAppSelector(isElectroVisibleSelector);
  const node = nodes?.find((x) => x.id === data.id);
  if (node) node.width = Size.BlockView_Width;

  // Enforce size change of node
  useEffect(() => {
    const parentNode = GetNodeByDataId(data.id);
    if (splitView) {
      parentNode.style.width = `${Size.SplitView_Width}px`;
    } else parentNode.style.width = `${Size.BlockView_Width}px`;
  }, [data, splitView]);

  // Force z-index to display edges in ConnectView
  useEffect(() => {
    const allEdges = FindAllEdges();
    allEdges.style.zIndex = "3";
  }, []);

  if (splitView) node.width = Size.SplitView_Width;

  return (
    <>
      <BlockComponent
        node={node}
        color={GetParentColor(node)}
        splitView={splitView}
        selected={node?.isBlockSelected}
        onParentClick={() => OnParentClick(dispatch, node, nodes, edges)}
        onChildClick={() => OnChildClick(dispatch, node, nodes, edges)}
      />
      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        parent={true}
        splitView={splitView}
        terminals={FilterTerminals(node, splitView, splitNode)}
        onClick={(conn) => OnConnectorClick(conn, dispatch, edges, nodes)}
        menuBox={true}
        mainConnectNode={false}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
      />
      <HandleComponent
        node={node}
        parent={true}
        nodes={nodes}
        length={node?.length}
        width={node?.width}
        terminals={FilterTerminals(node, splitView, splitNode)}
        splitView={splitView}
        electro={electro}
        mainConnectNode={false}
      />

      {splitView && !splitNode && (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Message}</p>
        </BlockMessageBox>
      )}
    </>
  );
};

export default memo(BlockParentNode);
