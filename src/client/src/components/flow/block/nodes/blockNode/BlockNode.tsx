import * as Click from "./handlers";
import { ResizeConnectNode, SetConnectNodeColor, GetConnectChildren } from "../../connectView/helpers";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { Node } from "../../../../../models";
import { Size } from "../../../../../compLibrary";
import { IsFunction, IsProduct } from "../../../helpers";
import { NodeBox } from "../../../styled";
import { TerminalsContainerComponent, HandleComponent } from "../../terminals";
import { ConnectViewComponent } from "../../connectView";
import { IsChildConnectNode, IsConnectNodeChecked, SetNodeWidth, SetNodeLength } from "./helpers";
import { FilterTerminals, FindAllEdges } from "../../helpers";
import { Symbol } from "../../../../../compLibrary/symbol";
import { BlockNodeNameBox } from "../../styled";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { edgeSelector, electroSelector, connectSelector, nodeSelector, secondaryNodeSelector } from "../../../../../redux/store";

/**
 * Component for a Function or Product Node in BlockView.
 * @param data the data for the node.
 * @returns a Function or Product Node of the Flow node type with Mimir styling and functionality.
 */
const BlockNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [inTerminalMenu, showInTerminalMenu] = useState(false);
  const [outTerminalMenu, showOutTerminalMenu] = useState(false);
  const [terminalBox, showTerminalBox] = useState(false);
  const [connectBox, showConnectBox] = useState(false);
  const [connectMenu, showConnectMenu] = useState(false);
  const updateNodeInternals = useUpdateNodeInternals();

  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector) as Node;
  const electro = useAppSelector(electroSelector);
  const mainConnectNodes = useAppSelector(connectSelector);

  const type = IsFunction(data) ? "BlockFunctionNode-" : "BlockProductNode-";
  const node = nodes?.find((x) => x.id === data.id);
  const terminals = FilterTerminals(data, secondaryNode);
  const connectChildren = GetConnectChildren(data, nodes, edges);
  const mainConnectNode = mainConnectNodes.find((x) => x.id === data.id);
  const connectNodes = mainConnectNode?.connectNodes;

  if (!mainConnectNode) {
    data.width = Size.Node_Width;
    data.length = Size.Node_Length;
  }

  useEffect(() => {
    SetConnectNodeColor(mainConnectNode?.id, connectNodes, data);
    ResizeConnectNode(connectNodes?.length, mainConnectNode, data);
  }, [mainConnectNode, data, connectNodes, mainConnectNodes]);

  // Force z-index to display edges in ConnectView
  useEffect(() => {
    if (mainConnectNode) {
      const allEdges = FindAllEdges();
      allEdges.style.zIndex = "3";
    }
  }, [mainConnectNode]);

  useEffect(() => {
    updateNodeInternals(node?.id);
    updateNodeInternals(secondaryNode?.id);
  }, [node, secondaryNode, updateNodeInternals]);

  electro ? SetNodeWidth(terminals, data) : SetNodeLength(terminals, data);

  return (
    <>
      <NodeBox
        id={type + data.id}
        product={IsProduct(data)}
        width={mainConnectNode ? mainConnectNode.width : data.width}
        length={mainConnectNode ? mainConnectNode.length : data.length}
        onMouseOver={() => Click.OnHover(showTerminalBox, showConnectBox)}
        onMouseOut={() => Click.OnMouseOut(showTerminalBox, showConnectBox)}
      >
        <BlockNodeNameBox>{data.label ?? data.name}</BlockNodeNameBox>
        {!mainConnectNode && <Symbol base64={data.symbol} text={data.name} />}
        {mainConnectNode && <div className="line" />}

        <TerminalsContainerComponent
          node={data}
          inputMenuOpen={inTerminalMenu}
          outputMenuOpen={outTerminalMenu}
          terminals={terminals}
          parent={false}
          electro={electro}
          onClick={(conn) => Click.OnTerminal(conn, data, dispatch, edges)}
          menuBox={terminalBox}
          mainConnectNode={data.id === mainConnectNode?.id}
          showInTerminalMenu={showInTerminalMenu}
          showOutTerminalMenu={showOutTerminalMenu}
        />
        <HandleComponent
          node={node}
          nodes={nodes}
          length={mainConnectNode ? mainConnectNode.length : data.length}
          width={mainConnectNode ? mainConnectNode.width : data.width}
          terminals={terminals}
          parent={false}
          electro={electro}
          connectNode={mainConnectNode?.id === data.id}
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
    </>
  );
};

export default memo(BlockNode);
