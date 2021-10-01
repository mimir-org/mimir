import { OnHover, OnMouseOut, OnBlur } from "./handlers";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Connector, Node, Edge } from "../../../../models";
import { Size } from "../../../../compLibrary";
import { IsLocation } from "../../helpers/common";
import { NodeBox } from "../../styled";
import { TerminalsComponent, HandleComponent } from "../../block/terminals";
import { ConnectViewComponent } from "../../block/connectView";
import { IsChildConnectNode, IsConnectNodeChecked } from "./helpers";
import { changeActiveConnector, removeEdge } from "../../../../redux/store/project/actions";
import { SetTerminalOrder, FilterTerminals, FindAllEdges } from "../../helpers/block";
import { Symbol } from "../../../../compLibrary/symbol";
import { BlockNodeNameBox } from "../../block/styled";
import {
  GetConnectChildren,
  IsMainConnectNode,
  SetMainConnectNodeColor,
  ResizeMainConnectNode,
} from "../../helpers/block/connectView";
import {
  addConnectNode,
  addMainNode,
  removeConnectNode,
  removeMainNode,
} from "../../../../redux/store/connectView/actions";

/**
 * Component for a Function Node in BlockView.
 * @param data the data for the node.
 * @returns a Function Node of the Flow node type with Mimir styling and functionality.
 */
const BlockFunctionNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const [terminalBox, showTerminalBox] = useState(false);
  const [connectBox, showConnectBox] = useState(false);
  const [connectMenu, showConnectMenu] = useState(false);

  const nodes = useSelector<RootState>((state) => state.projectState.project.nodes) as Node[];
  const edges = useSelector<RootState>((state) => state.projectState.project.edges) as Edge[];
  const splitView = useSelector<RootState>((state) => state.splitView.visible) as boolean;

  const mainConnectNodes = useSelector<RootState>(
    (state) => state.connectView?.mainNodes
  ) as Node[];

  const connectChildren = GetConnectChildren(data, nodes, edges);
  const sortedTerminals = FilterTerminals(data, splitView);

  const mainConnectNode = mainConnectNodes.find((x) => x.id === data.id);
  const connectNodes = mainConnectNode?.connectNodes;
  if (!mainConnectNode) data.width = Size.Node_Width;

  // Terminals click
  const onConnectorClick = (conn: Connector) => {
    showConnectMenu(false);
    const order = SetTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));

    if (conn.visible) {
      const edge = edges.find(
        (e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id
      );
      if (edge) dispatch(removeEdge(edge.id));
    }
  };

  // ConnectView click
  const onConnectNodeClick = (node: Node) => {
    if (!IsConnectNodeChecked(node, connectNodes)) {
      if (!IsMainConnectNode(data.id)) dispatch(addMainNode(data));
      dispatch(addConnectNode(data, node));
    } else {
      if (connectNodes.length === 1) {
        showConnectMenu(false);
        dispatch(removeMainNode(data));
      }
      dispatch(removeConnectNode(data, node));
    }
  };

  useEffect(() => {
    ResizeMainConnectNode(connectNodes?.length, mainConnectNode?.id, data);
    SetMainConnectNodeColor(mainConnectNode?.id, data.id, connectNodes);
  }, [mainConnectNode, data, connectNodes]);

  // Force z-index to display edges in ConnectView
  useEffect(() => {
    if (mainConnectNode) {
      const allEdges = FindAllEdges();
      allEdges.style.zIndex = "3";
    }
  }, [mainConnectNode]);

  return (
    <>
      <NodeBox
        id={"BlockFunctionNode-" + data.id}
        onMouseOver={() => OnHover(showTerminalBox, showConnectBox, data.id)}
        onMouseOut={() => OnMouseOut(showTerminalBox, showConnectBox, data.id)}
      >
        <BlockNodeNameBox>{data.label ?? data.name}</BlockNodeNameBox>
        <Symbol base64={data.symbol} text={data.name} />

        <TerminalsComponent
          node={data}
          isInputMenuOpen={inTerminalMenu}
          isOutputMenuOpen={outTerminalMenu}
          terminals={sortedTerminals}
          isParent={false}
          isLocation={IsLocation(data)}
          isSplitView={splitView}
          onClick={(conn) => onConnectorClick(conn)}
          menuButton={terminalBox}
          showInputTerminalMenu={showInTerminalMenu}
          showOutputTerminalMenu={showOutTerminalMenu}
        />
        {!IsChildConnectNode(mainConnectNodes, data.id) && (
          <ConnectViewComponent
            node={data}
            visible={connectMenu}
            children={connectChildren}
            connectNodes={connectNodes}
            handleClick={onConnectNodeClick}
            isChecked={IsConnectNodeChecked}
            connectBox={connectBox}
            showConnectMenu={showConnectMenu}
            dispatch={dispatch}
            onBlur={() => OnBlur(showConnectMenu, connectMenu)}
          />
        )}
      </NodeBox>

      <HandleComponent
        node={data}
        nodes={nodes}
        terminals={sortedTerminals}
        isParent={false}
        splitView={splitView}
      />
    </>
  );
};

export default memo(BlockFunctionNode);
