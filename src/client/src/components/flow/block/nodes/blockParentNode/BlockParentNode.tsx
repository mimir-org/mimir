import { memo, FC, useState, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { HandleComponent, TerminalsContainerComponent } from "../../terminals";
import { Size } from "../../../../../compLibrary";
import { GetParentColor } from "./helpers";
import { OnParentClick, OnChildClick, OnConnectorClick } from "./handlers";
import { BlockComponent } from "./";
import { FilterTerminals, GetNodeByDataId, FindAllEdges } from "../../helpers";
import { Node } from "../../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { edgeSelector, isElectroSelector, nodeSelector, splitNodeSelector } from "../../../../../redux/store";

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
  const splitNode = useAppSelector(splitNodeSelector) as Node;
  const electro = useAppSelector(isElectroSelector);
  const updateNodeInternals = useUpdateNodeInternals();
  const node = nodes?.find((x) => x.id === data.id);
  if (node) node.width = Size.BlockView_Width;

  // Enforce size change of node
  useEffect(() => {
    const parentNode = GetNodeByDataId(data.id);
    parentNode.style.width = `${Size.BlockView_Width}px`;
  }, [data]);

  // Force z-index to display edges in ConnectView
  useEffect(() => {
    const allEdges = FindAllEdges();
    allEdges.style.zIndex = "3";
  }, []);

  useEffect(() => {
    updateNodeInternals(node?.id);
  }, [node, updateNodeInternals]);

  return (
    <>
      <BlockComponent
        dispatch={dispatch}
        node={node}
        color={GetParentColor(node)}
        selected={node?.isBlockSelected}
        onParentClick={() => OnParentClick(dispatch, node)}
        onChildClick={() => OnChildClick(dispatch, node, nodes, edges)}
      />
      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        parent={true}
        electro={electro}
        terminals={FilterTerminals(node, false, splitNode)}
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
        terminals={FilterTerminals(node, false, splitNode)}
        splitView={false}
        electro={electro}
        mainConnectNode={false}
      />
    </>
  );
};

export default memo(BlockParentNode);
