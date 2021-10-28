import * as Click from "./handlers";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { Node } from "../../../../../models";
import { Size } from "../../../../../compLibrary";
import { IsFunction, IsProduct } from "../../../helpers";
import { NodeBox } from "../../../styled";
import { TerminalsContainerComponent, HandleComponent } from "../../terminals";
import { SetNodeWidth, SetNodeLength } from "./helpers";
import { FilterTerminals } from "../../helpers";
import { Symbol } from "../../../../../compLibrary/symbol";
import { BlockNodeNameBox } from "../../styled";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { edgeSelector, electroSelector, nodeSelector, secondaryNodeSelector } from "../../../../../redux/store";

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
  const updateNodeInternals = useUpdateNodeInternals();

  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector) as Node;
  const electro = useAppSelector(electroSelector);

  const type = IsFunction(data) ? "BlockFunctionNode-" : "BlockProductNode-";
  const node = nodes?.find((x) => x.id === data.id);
  const terminals = FilterTerminals(data, secondaryNode);

  data.width = Size.Node_Width;
  data.length = Size.Node_Height;

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
        width={data.width}
        length={data.length}
        onMouseOver={() => Click.OnHover(showTerminalBox)}
        onMouseOut={() => Click.OnMouseOut(showTerminalBox)}
      >
        <BlockNodeNameBox>{data.label ?? data.name}</BlockNodeNameBox>
        <Symbol base64={data.symbol} text={data.name} />

        <TerminalsContainerComponent
          node={data}
          inputMenuOpen={inTerminalMenu}
          outputMenuOpen={outTerminalMenu}
          terminals={terminals}
          parent={false}
          electro={electro}
          onClick={(conn) => Click.OnTerminal(conn, data, dispatch, edges)}
          menuBox={terminalBox}
          showInTerminalMenu={showInTerminalMenu}
          showOutTerminalMenu={showOutTerminalMenu}
        />
        <HandleComponent
          node={node}
          nodes={nodes}
          length={data.length}
          width={data.width}
          terminals={terminals}
          parent={false}
          electro={electro}
        />
      </NodeBox>
    </>
  );
};

export default memo(BlockNode);
