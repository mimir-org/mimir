import * as Click from "./handlers";
import { ResizeConnectNode, SetConnectNodeColor, GetConnectChildren } from "../../block/connectView/helpers";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Node, Edge } from "../../../../models";
import { Size } from "../../../../compLibrary";
import { IsFunction } from "../../helpers";
import { NodeBox } from "../../styled";
import { TerminalsComponent, HandleComponent } from "../../block/terminals";
import { ConnectViewComponent } from "../../block/connectView";
import { IsChildConnectNode, IsConnectNodeChecked } from "./helpers";
import { FilterTerminals, FindAllEdges } from "../../block/helpers";
import { Symbol } from "../../../../compLibrary/symbol";
import { BlockNodeNameBox } from "../../block/styled";

/**
 * Component for a Function or Product Node in BlockView.
 * @param data the data for the node.
 * @returns a Function or Product Node of the Flow node type with Mimir styling and functionality.
 */
const BlockNode: FC<NodeProps> = ({ data }) => {
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
  const type = IsFunction(data) ? "BlockFunctionNode-" : "BlockProductNode-";

  const mainConnectNodes = useSelector<RootState>((s) => s.connectView?.mainNodes) as Node[];
  const connectChildren = GetConnectChildren(data, nodes, edges);
  const mainConnectNode = mainConnectNodes.find((x) => x.id === data.id);
  const connectNodes = mainConnectNode?.connectNodes;
  if (!mainConnectNode) data.width = Size.Node_Width;

  useEffect(() => {
    ResizeConnectNode(connectNodes?.length, mainConnectNode?.id, data);
    SetConnectNodeColor(mainConnectNode?.id, connectNodes, data);
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
        id={type + data.id}
        function={IsFunction(data)}
        onMouseOver={() => Click.OnHover(showTerminalBox, showConnectBox)}
        onMouseOut={() => Click.OnMouseOut(showTerminalBox, showConnectBox)}
      >
        <BlockNodeNameBox>{data.label ?? data.name}</BlockNodeNameBox>
        {data.id !== mainConnectNode?.id && <Symbol base64={data.symbol} text={data.name} />}
        {data.id === mainConnectNode?.id && <div className="line" />}

        <TerminalsComponent
          node={data}
          inputMenuOpen={inTerminalMenu}
          outputMenuOpen={outTerminalMenu}
          terminals={FilterTerminals(data, splitView, splitNode)}
          isParent={false}
          isLocation={false}
          splitView={splitView}
          onClick={(conn) => Click.OnTerminal(conn, data, dispatch, edges)}
          menuBox={terminalBox}
          mainConnectNode={data.id === mainConnectNode?.id}
          showInTerminalMenu={showInTerminalMenu}
          showOutTerminalMenu={showOutTerminalMenu}
        />
        {!IsChildConnectNode(mainConnectNodes, data.id) && (
          <ConnectViewComponent
            node={data}
            visible={connectMenu}
            children={connectChildren}
            connectNodes={connectNodes}
            onClick={(n) => Click.OnConnect(n, data, dispatch, connectNodes, showConnectMenu)}
            isChecked={IsConnectNodeChecked}
            connectBox={connectBox}
            showConnectMenu={showConnectMenu}
            dispatch={dispatch}
            onBlur={() => Click.OnBlur(showConnectMenu, connectMenu)}
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

export default memo(BlockNode);
