import * as Actions from "../../block/connectView/redux/actions";
import * as Helpers from "../../block/connectView/helpers";
import { OnHover, OnMouseOut, OnBlur } from "./handlers";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Connector, Node, Edge } from "../../../../models";
import { Size } from "../../../../compLibrary";
import { IsLocation } from "../../helpers";
import { NodeBox } from "../../styled";
import { TerminalsComponent, HandleComponent } from "../../block/terminals";
import { ConnectViewComponent } from "../../block/connectView";
import { IsChildConnectNode, IsConnectNodeChecked } from "./helpers";
import { changeActiveConnector, removeEdge } from "../../../../redux/store/project/actions";
import { SetTerminalOrder, FilterTerminals, FindAllEdges } from "../../block/helpers";
import { Symbol } from "../../../../compLibrary/symbol";
import { BlockNodeNameBox } from "../../block/styled";

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

  const nodes = useSelector<RootState>((s) => s.projectState.project.nodes) as Node[];
  const edges = useSelector<RootState>((s) => s.projectState.project.edges) as Edge[];
  const splitView = useSelector<RootState>((s) => s.splitView.visible) as boolean;
  const splitNode = useSelector<RootState>((s) => s.splitView.node) as Node;

  const mainConnectNodes = useSelector<RootState>((s) => s.connectView?.mainNodes) as Node[];
  const connectChildren = Helpers.GetConnectChildren(data, nodes, edges);

  const mainConnectNode = mainConnectNodes.find((x) => x.id === data.id);
  const connectNodes = mainConnectNode?.connectNodes;
  if (!mainConnectNode) data.width = Size.Node_Width;

  // Terminals click
  const onConnectorClick = (conn: Connector) => {
    showConnectMenu(false);
    const order = SetTerminalOrder(data, 0, conn.relationType);
    dispatch(changeActiveConnector(data, conn.id, !conn.visible, order));

    if (conn.visible) {
      const edge = edges.find((e) => e.fromConnector.id === conn.id || e.toConnector.id === conn.id);
      if (edge) dispatch(removeEdge(edge.id));
    }
  };

  // ConnectView click
  const onConnectNodeClick = (node: Node) => {
    if (!IsConnectNodeChecked(node, connectNodes)) {
      if (!Helpers.IsMainConnectNode(data.id)) dispatch(Actions.addMainNode(data));
      dispatch(Actions.addConnectNode(data, node));
    } else {
      if (connectNodes.length === 1) {
        showConnectMenu(false);
        dispatch(Actions.removeMainNode(data));
      }
      dispatch(Actions.removeConnectNode(data, node));
    }
  };

  useEffect(() => {
    Helpers.ResizeMainConnectNode(connectNodes?.length, mainConnectNode?.id, data);
    Helpers.SetMainConnectNodeColor(mainConnectNode?.id, data.id, connectNodes);
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
        onMouseOver={() => OnHover(showTerminalBox, showConnectBox)}
        onMouseOut={() => OnMouseOut(showTerminalBox, showConnectBox)}
      >
        <BlockNodeNameBox>{data.label ?? data.name}</BlockNodeNameBox>
        <Symbol base64={data.symbol} text={data.name} />

        <TerminalsComponent
          node={data}
          inputMenuOpen={inTerminalMenu}
          outputMenuOpen={outTerminalMenu}
          terminals={FilterTerminals(data, splitView, splitNode)}
          isParent={false}
          isLocation={IsLocation(data)}
          splitView={splitView}
          onClick={(conn) => onConnectorClick(conn)}
          menuBox={terminalBox}
          showInTerminalMenu={showInTerminalMenu}
          showOutTerminalMenu={showOutTerminalMenu}
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
        terminals={FilterTerminals(data, splitView, splitNode)}
        isParent={false}
        splitView={splitView}
      />
    </>
  );
};

export default memo(BlockFunctionNode);
