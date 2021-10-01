import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Connector, Node, Edge } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { HandleComponent, TerminalsComponent } from "../../block/terminals";
import { IsLocation } from "../../helpers/common";
import { Size } from "../../../../compLibrary";
import { OnParentClick, OnChildClick } from "./handlers";
import { BlockComponent } from "./";
import { BlockMessageBox } from "../../block/styled";
import { changeActiveConnector, removeEdge } from "../../../../redux/store/project/actions";
import {
  SetTerminalOrder,
  FilterTerminals,
  FindNodeByDataId,
  FindAllEdges,
} from "../../helpers/block";

/**
 * Component for the large parent block in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const [inputTerminalMenu, showInputTerminalMenu] = useState(false);
  const [outputTerminalMenu, showOutputTerminalMenu] = useState(false);

  const dispatch = useDispatch();
  const nodes = useSelector<RootState>((state) => state.projectState.project.nodes) as Node[];
  const edges = useSelector<RootState>((state) => state.projectState.project.edges) as Edge[];
  const isSplitView = useSelector<RootState>((state) => state.splitView.visible) as boolean;
  const splitViewNode = useSelector<RootState>((state) => state.splitView.node) as Node;
  const node = nodes.find((x) => x.id === data.id);

  // Enforce size change of node
  useEffect(() => {
    const parentNode = FindNodeByDataId(data.id);
    if (isSplitView) {
      parentNode.style.width = `${Size.SplitView_Width}px`;
    } else parentNode.style.width = `${Size.BlockView_Width}px`;
  }, [data, isSplitView]);

  // Force z-index to display edges in ConnectView
  useEffect(() => {
    const allEdges = FindAllEdges();
    allEdges.style.zIndex = "3";
  }, []);

  const onConnectorClick = (conn: Connector) => {
    const actualNode = nodes.find((x) => x.id === conn.nodeId);
    const order = SetTerminalOrder(actualNode, 0, conn.relationType);
    dispatch(changeActiveConnector(actualNode, conn.id, !conn.visible, order));

    if (conn.visible) {
      const edge = edges.find(
        (e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id
      );
      if (edge) dispatch(removeEdge(edge.id));
    }
  };

  return (
    <>
      <BlockComponent
        node={node}
        isLocation={IsLocation(node)}
        isSplitView={isSplitView}
        isSelected={node?.isBlockSelected}
        onParentClick={() => OnParentClick(dispatch, node, nodes, edges)}
        onChildClick={() => OnChildClick(dispatch, node, nodes, edges)}
      />
      <TerminalsComponent
        node={node}
        isInputMenuOpen={inputTerminalMenu}
        isOutputMenuOpen={outputTerminalMenu}
        isParent={true}
        isSplitView={isSplitView}
        isLocation={IsLocation(node)}
        terminals={FilterTerminals(node, isSplitView)}
        onClick={(conn) => onConnectorClick(conn)}
        menuButton={true}
        showInputTerminalMenu={showInputTerminalMenu}
        showOutputTerminalMenu={showOutputTerminalMenu}
      />
      <HandleComponent
        node={node}
        isParent={true}
        nodes={nodes}
        terminals={FilterTerminals(node, isSplitView)}
        splitView={isSplitView}
      />

      {isSplitView && !splitViewNode && (
        <BlockMessageBox>
          <p>{TextResources.BlockView_Select_Message}</p>
        </BlockMessageBox>
      )}
    </>
  );
};

export default memo(BlockParentNode);
