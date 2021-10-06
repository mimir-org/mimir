import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { TextResources } from "../../../../assets/text";
import { Connector, Node, Edge } from "../../../../models";
import { RootState } from "../../../../redux/store";
import { HandleComponent, TerminalsComponent } from "../../block/terminals";
import { IsLocation } from "../../helpers";
import { Size } from "../../../../compLibrary";
import { GetParentColor } from "./helpers";
import { OnParentClick, OnChildClick } from "./handlers";
import { BlockComponent } from "./";
import { BlockMessageBox } from "../../block/styled";
import { changeActiveConnector, removeEdge } from "../../../../redux/store/project/actions";
import { SetTerminalOrder, FilterTerminals, FindNodeByDataId, FindAllEdges } from "../../block/helpers";

/**
 * Component for the large parent block in BlockView.
 * @param data the data for the node.
 * @returns a parent node of the Flow node type with Mimir styling and functionality.
 */
const BlockParentNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const nodes = useSelector<RootState>((s) => s.projectState.project.nodes) as Node[];
  const edges = useSelector<RootState>((s) => s.projectState.project.edges) as Edge[];
  const splitView = useSelector<RootState>((s) => s.splitView.visible) as boolean;
  const splitNode = useSelector<RootState>((s) => s.splitView.node) as Node;
  const node = nodes.find((x) => x.id === data.id);

  // Enforce size change of node
  useEffect(() => {
    const parentNode = FindNodeByDataId(data.id);
    if (splitView) {
      parentNode.style.width = `${Size.SplitView_Width}px`;
    } else parentNode.style.width = `${Size.BlockView_Width}px`;
  }, [data, splitView]);

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
      const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
      if (edge) dispatch(removeEdge(edge.id));
    }
  };

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
        isParent={true}
        splitView={splitView}
        isLocation={IsLocation(node)}
        terminals={FilterTerminals(node, splitView, splitNode)}
        onClick={(conn) => onConnectorClick(conn)}
        menuBox={true}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
      />
      <HandleComponent
        node={node}
        isParent={true}
        nodes={nodes}
        terminals={FilterTerminals(node, splitView, splitNode)}
        splitView={splitView}
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
