import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../../assets/text";
import { Node, Edge } from "../../../../../models";
import { RootState } from "../../../../../redux/store";
import { HandleComponent, TerminalsComponent } from "../../terminals";
import { Size } from "../../../../../compLibrary";
import { GetParentColor } from "./helpers";
import { OnParentClick, OnChildClick, OnConnectorClick } from "./handlers";
import { BlockComponent } from "./";
import { BlockMessageBox } from "../../styled";
import { FilterTerminals, GetNodeByDataId, FindAllEdges } from "../../helpers";

/**
 * Component for the large parent block in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const nodes = useSelector<RootState>((s) => s.projectState.project?.nodes) as Node[];
  const edges = useSelector<RootState>((s) => s.projectState.project?.edges) as Edge[];
  const splitView = useSelector<RootState>((s) => s.splitView.visible) as boolean;
  const splitNode = useSelector<RootState>((s) => s.splitView.node) as Node;
  const electro = useSelector<RootState>((s) => s.electro.visible) as boolean;
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
      <TerminalsComponent
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