import * as Click from "./handlers";
import { memo, FC, useState, useEffect } from "react";
import { NodeProps, useUpdateNodeInternals } from "react-flow-renderer";
import { AspectColorType, Connector, Node } from "../../../../../models";
import { NodeBox } from "../../../styled";
import { TerminalsContainerComponent, HandleComponent } from "../../terminals";
import { SetNodeSize } from "./helpers";
import { FilterTerminals } from "../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store/hooks";
import { edgeSelector, electroSelector, nodeSelector, secondaryNodeSelector } from "../../../../../redux/store";
import { Size } from "../../../../../compLibrary";
import { BlockLogoComponent } from "../../logo";
import { GetAspectColor, GetSelectedBlockNode, IsFunction, IsProduct } from "../../../../../helpers";

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
  const [terminals, setTerminals]: [Connector[], any] = useState([]);
  const [width, setWidth] = useState(Size.Node_Width);
  const [length, setLength] = useState(Size.Node_Length);

  const updateNodeInternals = useUpdateNodeInternals();
  const nodes = useAppSelector(nodeSelector);
  const edges = useAppSelector(edgeSelector);
  const secondaryNode = useAppSelector(secondaryNodeSelector) as Node;
  const electro = useAppSelector(electroSelector);
  const type = IsFunction(data) ? "BlockFunctionNode-" : "BlockProductNode-";
  const node = nodes?.find((x) => x.id === data.id);

  useEffect(() => {
    setTerminals(FilterTerminals(node?.connectors, secondaryNode));
  }, [secondaryNode, node?.connectors]);

  useEffect(() => {
    const size = SetNodeSize(terminals, electro);
    setWidth(size.width);
    setLength(size.length);
  }, [electro, terminals]);

  useEffect(() => {
    updateNodeInternals(node?.id);
  });

  if (!node) return null;

  node.width = width;
  node.length = length;

  return (
    <NodeBox
      id={type + node.id}
      product={IsProduct(node)}
      width={node.width}
      length={node.length}
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      isSelected={node === GetSelectedBlockNode()}
      onMouseOver={() => Click.OnHover(showTerminalBox)}
      onMouseOut={() => Click.OnMouseOut(showTerminalBox)}
    >
      <BlockLogoComponent node={node} parent={false} />

      <TerminalsContainerComponent
        node={node}
        inputMenuOpen={inTerminalMenu}
        outputMenuOpen={outTerminalMenu}
        terminals={terminals}
        parent={false}
        electro={electro}
        onClick={(conn) => Click.OnTerminal(conn, node, dispatch, edges)}
        showMenuBox={terminalBox}
        showInTerminalMenu={showInTerminalMenu}
        showOutTerminalMenu={showOutTerminalMenu}
      />
      <HandleComponent
        nodes={nodes}
        length={node.length}
        width={node.width}
        terminals={terminals}
        parent={false}
        electro={electro}
      />
    </NodeBox>
  );
};

export default memo(BlockNode);
